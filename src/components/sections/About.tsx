import { Section } from '@/components/sections/Section'
import { siteConfig } from '@/config/site'
import { mediaManifest } from '@/data/media-manifest'

export function About() {
  const portrait =
    mediaManifest.profile[0]?.src ??
    siteConfig.profileImage

  return (
    <Section
      id="sobre"
      eyebrow="Sobre"
      title={siteConfig.aboutTitle}
      description="A combinação que diferencia o set: engenharia, instrumento e leitura de pista."
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={portrait}
            alt="Thur no set"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-primary/10" />
        </div>
        <div className="space-y-5">
          {siteConfig.about.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
          <div className="flex flex-wrap gap-3 pt-2">
            {['House', 'Techno', 'Psytrance', 'Tech House'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border/80 bg-elevated/60 px-3 py-1 text-xs uppercase tracking-[0.14em] text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
