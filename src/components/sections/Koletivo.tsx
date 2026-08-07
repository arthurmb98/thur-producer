import { ExternalLink } from 'lucide-react'
import { Section } from '@/components/sections/Section'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

export function Koletivo() {
  return (
    <Section
      id="koletivo"
      eyebrow="Ecossistema"
      eyebrowClassName="text-primary"
      title={siteConfig.koletivo.title}
      description={siteConfig.koletivo.text}
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/15 via-elevated/40 to-violet/20 p-8 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-violet/25 blur-3xl" />
        <p className="relative max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg">
          Do produtor ao dancefloor — o Koletivo conecta quem organiza, quem
          trabalha no evento e quem vive a experiência. Conheça a landing e o
          universo do app.
        </p>
        <div className="relative mt-8">
          <Button variant="default" size="lg" asChild>
            <a
              href={siteConfig.koletivoHubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="size-5" />
              {siteConfig.koletivo.cta}
            </a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
