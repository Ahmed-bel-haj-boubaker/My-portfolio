import { profile } from "@/data/profile"
import { BlurFade } from "@/components/magicui/blur-fade"
import { FaqList } from "@/components/faq-list"

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="cv-auto py-24 [--cv-size:900px] md:py-32">
      <BlurFade className="container-page grid grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-12 flex flex-col gap-6 md:col-span-4">
          <h2
            id="faq-title"
            className="text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.04em] md:text-[3.5rem]"
          >
            Quick answers
          </h2>
          <p className="max-w-[32ch] text-muted-foreground">
            The short version, for recruiters, clients and anyone in a hurry.
          </p>
        </div>
        <FaqList items={profile.faq} openFirst className="col-span-12 md:col-span-8" />
      </BlurFade>
    </section>
  )
}
