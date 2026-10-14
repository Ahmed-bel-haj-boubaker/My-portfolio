import { ArrowUpRight } from "lucide-react"

import { profile } from "@/data/profile"
import { visibleSocials } from "@/lib/site"
import { socialIcons } from "@/components/icons"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ContactForm } from "@/components/sections/contact-form"
import { ContactHeading } from "@/components/sections/contact-heading"
import { CopyEmail } from "@/components/sections/copy-email"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="cv-auto py-24 [--cv-size:1100px] md:py-40">
      <div className="container-page">
        <ContactHeading id="contact-title">Let&apos;s work together.</ContactHeading>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-16 md:mt-24">
          <BlurFade className="col-span-12 flex flex-col gap-10 lg:col-span-6">
            <p className="max-w-[44ch] text-lg leading-relaxed text-muted-foreground">
              Have a product to build, an app to ship, or a process that should run itself? Send a
              few lines about it.
            </p>
            <CopyEmail />
            <ul className="flex flex-col">
              {visibleSocials
                .filter((social) => social.icon !== "email")
                .map((social) => {
                  const Icon = socialIcons[social.icon]
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between border-b border-border py-4 transition-colors hover:border-border-strong"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden />
                          {social.label}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 text-muted-foreground transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                        />
                      </a>
                    </li>
                  )
                })}
              <li className="flex items-center justify-between py-4 text-sm text-muted-foreground">
                <span>{profile.location}</span>
                <span>{profile.workPreference}</span>
              </li>
            </ul>
          </BlurFade>

          <BlurFade delay={0.1} className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Card className="gap-6 rounded-2xl ring-border [--card-spacing:--spacing(6)] md:[--card-spacing:--spacing(8)]">
              <CardHeader>
                <CardTitle className="text-lg">
                  <h3>Or write here</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
