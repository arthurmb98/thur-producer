import { Section } from '@/components/sections/Section'
import { siteConfig } from '@/config/site'

export function Services() {
  return (
    <Section
      id="servicos"
      eyebrow="Para quem fecha com Thur"
      eyebrowClassName="text-violet"
      title="Booking, produção e collabs"
      description="Um profissional completo para quem precisa de presença na pista e qualidade no estúdio."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {siteConfig.services.map((service, index) => (
          <div key={service.title} className="relative pl-5">
            <span
              className="absolute left-0 top-1 h-full w-1 rounded-full bg-gradient-to-b from-primary to-violet"
              aria-hidden
            />
            <p className="font-display text-sm font-semibold text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-foreground">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {service.text}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
