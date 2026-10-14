import { profile, type Education } from "@/data/profile"
import { BlurFade } from "@/components/magicui/blur-fade"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"

function Credentials({ title, items }: { title: string; items: Education[] }) {
  if (items.length === 0) return null
  return (
    <div>
      <h3 className="font-mono text-xs tracking-wide text-muted-foreground">{title}</h3>
      <ul className="mt-4 flex flex-col gap-4">
        {items.map((item, i) => (
          <li key={i} className="flex flex-col gap-0.5 text-sm">
            <span className="font-medium">{item.degree}</span>
            <span className="text-muted-foreground">
              {item.school}, {item.period}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="cv-auto py-24 [--cv-size:1100px] md:py-32">
      <div className="container-page grid grid-cols-12 gap-x-6 gap-y-14">
        <div className="col-span-12 lg:col-span-4">
          <div className="flex flex-col gap-10 lg:sticky lg:top-28">
            <BlurFade>
              <h2
                id="experience-title"
                className="text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.04em] md:text-[4.5rem]"
              >
                Experience
              </h2>
              <p className="mt-6 max-w-[36ch] text-lg text-muted-foreground">
                {profile.yearsOfExperience} years of building and shipping. Most recent first.
              </p>
            </BlurFade>
            <BlurFade delay={0.1} className="hidden flex-col gap-8 lg:flex">
              <Credentials title="Education" items={profile.education} />
              <Credentials title="Certifications" items={profile.certifications} />
            </BlurFade>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <ExperienceTimeline roles={profile.experience} />
        </div>

        {/* On smaller screens credentials follow the timeline */}
        <BlurFade className="col-span-12 flex flex-col gap-8 border-t border-border pt-10 lg:hidden">
          <Credentials title="Education" items={profile.education} />
          <Credentials title="Certifications" items={profile.certifications} />
        </BlurFade>
      </div>
    </section>
  )
}
