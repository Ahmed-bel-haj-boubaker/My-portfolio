"use client"

import { useRef, useState, useTransition } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { sendContact } from "@/app/actions/contact"
import { profile } from "@/data/profile"
import { validateContact, type ContactErrors, type ContactField } from "@/lib/contact"
import { notify } from "@/lib/toast"
import { CONTACT_TOAST_DURATION, ContactToast } from "@/components/contact-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Field = ContactField
type Errors = ContactErrors

function read(data: FormData) {
  return {
    name: String(data.get("name") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    message: String(data.get("message") ?? "").trim(),
  }
}

function toastContact(props: Omit<React.ComponentProps<typeof ContactToast>, "onDismiss">) {
  notify((toast) =>
    toast.custom((id) => <ContactToast {...props} onDismiss={() => toast.dismiss(id)} />, {
      duration: CONTACT_TOAST_DURATION,
    })
  )
}

/** Sends through a server action (Gmail SMTP): the message reaches my inbox, the visitor gets a copy. */
export function ContactForm({ topic }: { topic?: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [pending, startTransition] = useTransition()
  const [sent, setSent] = useState(false)

  function focusFirst(nextErrors: Errors) {
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0]
    if (firstInvalid) formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
    return Boolean(firstInvalid)
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    const data = new FormData(form)
    const nextErrors = validateContact(read(data))
    setErrors(nextErrors)
    if (focusFirst(nextErrors)) return

    startTransition(async () => {
      const result = await sendContact(data).catch(() => null)

      if (result?.ok) {
        form.reset()
        setSent(true)
        setTimeout(() => setSent(false), CONTACT_TOAST_DURATION)
        toastContact({
          variant: "success",
          title: result.name ? `Message sent, thanks ${result.name}!` : "Message sent!",
          description: "It's in my inbox now. A copy is on its way to yours, and I'll reply within a couple of days.",
        })
        return
      }

      if (result?.errors) {
        setErrors(result.errors)
        focusFirst(result.errors)
        return
      }

      toastContact({
        variant: "error",
        title: "Message not sent",
        description: result?.error ?? `Couldn't reach the server. Email me at ${profile.email} instead.`,
      })
    })
  }

  const field = (name: Field) => ({
    name,
    id: `contact-${name}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    onChange: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  })

  const errorText = (name: Field) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="text-sm text-foreground">
        {errors[name]}
      </p>
    ) : null

  const inputClass =
    "h-11 rounded-lg border-border bg-background px-3.5 text-base shadow-none placeholder:text-muted-foreground/70 focus-visible:border-foreground focus-visible:ring-0 aria-invalid:border-foreground dark:bg-background md:text-sm"

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-busy={pending} className="relative flex flex-col gap-5">
      {/* Honeypot: hidden from people and assistive tech, irresistible to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {topic && <input type="hidden" name="topic" value={topic} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input {...field("name")} autoComplete="name" placeholder="Your name…" className={inputClass} />
          {errorText("name")}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            {...field("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="you@company.com"
            className={inputClass}
          />
          {errorText("email")}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          {...field("message")}
          rows={5}
          autoComplete="off"
          placeholder="What are you building, and where can I help…"
          className={`${inputClass} h-auto min-h-36 resize-y py-3`}
        />
        {errorText("message")}
      </div>
      <div aria-live="polite" className="sr-only">
        {Object.values(errors).filter(Boolean).length > 0 && "Please fix the highlighted fields."}
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="group/button mt-2 h-12 self-start rounded-full px-6 disabled:opacity-100"
      >
        {pending ? (
          <>
            Sending…
            <Loader2 aria-hidden className="animate-spin" />
          </>
        ) : sent ? (
          <>
            Sent
            <Check aria-hidden />
          </>
        ) : (
          <>
            Send message
            <ArrowRight
              aria-hidden
              className="transition-transform duration-300 ease-(--ease-out-expo) group-hover/button:translate-x-0.5"
            />
          </>
        )}
      </Button>
    </form>
  )
}
