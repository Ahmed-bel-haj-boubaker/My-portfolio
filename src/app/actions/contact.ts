"use server"

import { headers } from "next/headers"

import { validateContact, type ContactResult } from "@/lib/contact"
import { sendContactEmails } from "@/lib/mail"

/** Small in-memory limiter: 3 messages per IP per 10 minutes is plenty for a human. */
const WINDOW_MS = 10 * 60 * 1000
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 3
}

export async function sendContact(formData: FormData): Promise<ContactResult> {
  // Honeypot: real visitors never see this field, bots fill everything in.
  if (String(formData.get("company") ?? "")) return { ok: true, name: "" }

  const data = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  }
  // Which page the message came from, e.g. "Restaurants case study"
  const topic = String(formData.get("topic") ?? "").trim().slice(0, 80)
  const errors = validateContact(data)
  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  if (rateLimited(ip)) {
    return { ok: false, error: "That's a few messages in a row. Give it a few minutes, or email me directly." }
  }

  try {
    await sendContactEmails({ ...data, topic })
    return { ok: true, name: data.name.split(" ")[0] }
  } catch (error) {
    console.error("[contact] send failed", error)
    return { ok: false, error: "Something went wrong on my side. Please email me directly instead." }
  }
}
