"use client"

import { useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { profile } from "@/data/profile"
import { notify } from "@/lib/toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Field = "name" | "email" | "message"
type Errors = Partial<Record<Field, string>>

function validate(data: FormData): Errors {
  const errors: Errors = {}
  const name = String(data.get("name") ?? "").trim()
  const email = String(data.get("email") ?? "").trim()
  const message = String(data.get("message") ?? "").trim()

  if (!name) errors.name = "Add your name so I know who's writing."
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter an email I can reply to, like you@company.com."
  if (message.length < 10) errors.message = "Add a few more words about the project."
  return errors
}

/**
 * No backend: on submit the form opens the visitor's email app with the
 * message pre-filled (mailto), so there's no third-party service to pay for.
 */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors = validate(data)
    setErrors(nextErrors)

    const firstInvalid = (Object.keys(nextErrors) as Field[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    const name = String(data.get("name")).trim()
    const email = String(data.get("email")).trim()
    const message = String(data.get("message")).trim()
    const subject = encodeURIComponent(`Project enquiry from ${name}`)
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`)

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    notify((toast) =>
      toast("Opening your email app…", {
        description: "Your message is ready to send from there.",
      })
    )
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
    <form ref={formRef} noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
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
      <Button type="submit" className="group/button mt-2 h-12 self-start rounded-full px-6">
        Send message
        <ArrowRight
          aria-hidden
          className="transition-transform duration-300 ease-(--ease-out-expo) group-hover/button:translate-x-0.5"
        />
      </Button>
    </form>
  )
}
