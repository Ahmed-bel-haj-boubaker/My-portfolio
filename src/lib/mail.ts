import "server-only"

import nodemailer, { type Transporter } from "nodemailer"

import { profile } from "@/data/profile"

export type ContactMessage = { name: string; email: string; message: string }

let transporter: Transporter | undefined

/** One Gmail SMTP connection, created on first send and reused after that. */
function getTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) throw new Error("GMAIL_USER and GMAIL_APP_PASSWORD must be set")

  transporter ??= nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass: pass.replace(/\s+/g, "") },
  })
  return transporter
}

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

/** Minimal monochrome email shell, matching the site. Inline styles only: email clients ignore <style>. */
function layout(title: string, body: string) {
  return `<!doctype html>
<html><body style="margin:0;background:#f4f4f4;padding:32px 16px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0a0a0a">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:16px">
    <tr><td style="padding:32px 32px 8px">
      <p style="margin:0 0 24px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#737373">${escape(profile.name)}</p>
      <h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;letter-spacing:-.02em">${title}</h1>
    </td></tr>
    <tr><td style="padding:0 32px 32px;font-size:15px;line-height:1.6">${body}</td></tr>
  </table>
</body></html>`
}

const quote = (text: string) =>
  `<div style="margin:16px 0;padding:16px 20px;border-left:3px solid #0a0a0a;background:#fafafa;border-radius:8px;white-space:pre-wrap">${escape(text)}</div>`

/** Delivers the message to me, then sends the visitor a confirmation copy. */
export async function sendContactEmails({ name, email, message }: ContactMessage) {
  const mailer = getTransporter()
  const user = process.env.GMAIL_USER!
  const to = process.env.CONTACT_TO || user
  const from = `"${profile.name}" <${user}>`

  await mailer.sendMail({
    from: `"Portfolio contact" <${user}>`,
    to,
    replyTo: { name, address: email },
    subject: `New message from ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
    html: layout(
      `New message from ${escape(name)}`,
      `<p style="margin:0;color:#525252">Reply to this email to answer <a href="mailto:${escape(email)}" style="color:#0a0a0a">${escape(email)}</a> directly.</p>${quote(message)}`
    ),
  })

  // The visitor's copy is a courtesy: if it fails, the message has still reached me.
  await mailer
    .sendMail({
      from,
      to: { name, address: email },
      replyTo: to,
      subject: "Thanks for reaching out",
      text: `Hi ${name},\n\nThanks for your message, I've got it and will reply within a couple of days.\n\nHere's what you sent:\n\n${message}\n\n${profile.name}`,
      html: layout(
        `Thanks, ${escape(name.split(" ")[0])}.`,
        `<p style="margin:0">Your message landed in my inbox. I read everything myself and usually reply within a couple of days.</p>
<p style="margin:24px 0 0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#737373">What you sent</p>${quote(message)}
<p style="margin:24px 0 0">${escape(profile.name)}</p>`
      ),
    })
    .catch((error: unknown) => console.error("[contact] confirmation email failed", error))
}
