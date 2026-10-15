/** Shared by the contact form (instant feedback) and the server action (the real check). */
export type ContactField = "name" | "email" | "message"
export type ContactErrors = Partial<Record<ContactField, string>>
export type ContactResult =
  | { ok: true; name: string }
  | { ok: false; errors?: ContactErrors; error?: string }

export function validateContact(data: { name: string; email: string; message: string }): ContactErrors {
  const errors: ContactErrors = {}
  if (!data.name) errors.name = "Add your name so I know who's writing."
  else if (data.name.length > 100) errors.name = "That name is a little long, keep it under 100 characters."
  if (!/^\S+@\S+\.\S+$/.test(data.email) || data.email.length > 200)
    errors.email = "Enter an email I can reply to, like you@company.com."
  if (data.message.length < 10) errors.message = "Add a few more words about the project."
  else if (data.message.length > 5000) errors.message = "Keep it under 5,000 characters, we can go deeper on a call."
  return errors
}
