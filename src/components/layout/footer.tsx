import { profile } from "@/data/profile"
import { visibleSocials } from "@/lib/site"
import { socialIcons } from "@/components/icons"
import { BackToTop } from "@/components/layout/back-to-top"

async function getYear() {
  "use cache"
  return new Date().getFullYear()
}

export async function Footer() {
  const year = await getYear()

  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="container-page flex flex-col gap-10 pt-16 pb-10 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">{profile.name}</p>
          <p className="text-sm text-muted-foreground">
            © {year}. Built with Next.js.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ul className="flex items-center gap-1">
            {visibleSocials.map((social) => {
              const Icon = socialIcons[social.icon]
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.icon === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                </li>
              )
            })}
          </ul>
          <span aria-hidden className="mx-2 h-6 w-px bg-border" />
          <BackToTop />
        </div>
      </div>

      {/* Oversized decorative wordmark, stretched to the content width */}
      <div aria-hidden className="container-page select-none">
        <svg viewBox="0 0 1000 190" className="-mb-[3%] block w-full text-faint">
          <text
            x="0"
            y="180"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
            className="font-sans text-[230px] font-semibold tracking-[-0.06em]"
          >
            {profile.nameLines[1]}
          </text>
        </svg>
      </div>
    </footer>
  )
}
