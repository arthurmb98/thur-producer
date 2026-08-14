import { MessageCircle, Headphones } from 'lucide-react'
import { Equalizer } from '@/components/media/Equalizer'
import { Button } from '@/components/ui/button'
import { siteConfig, whatsappUrl } from '@/config/site'

export function Hero() {
  return (
    <section className="relative isolate min-h-dvh overflow-hidden">
      <img
        src={siteConfig.heroImage}
        alt=""
        className="absolute inset-0 size-full object-cover object-center animate-fade-in"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-violet/25" />

      <div className="relative mx-auto flex min-h-dvh max-w-5xl flex-col justify-end px-5 pb-14 pt-28 sm:px-8">
        <div className="flex items-end gap-4 animate-fade-up [animation-delay:60ms]">
          <img
            src={siteConfig.logo}
            alt={siteConfig.brand}
            className="h-14 w-auto object-contain sm:h-20"
          />
          <Equalizer active className="mb-2 hidden h-8 sm:flex" bars={7} />
        </div>

        <p className="mt-6 animate-fade-up text-sm font-medium uppercase tracking-[0.22em] text-primary [animation-delay:120ms]">
          {siteConfig.role}
        </p>

        <h1 className="mt-3 max-w-3xl animate-fade-up font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl [animation-delay:160ms]">
          {siteConfig.brand}
        </h1>

        <p className="mt-4 max-w-xl animate-fade-up text-lg text-foreground/90 sm:text-xl [animation-delay:220ms]">
          {siteConfig.headline}
        </p>
        <p className="mt-3 max-w-lg animate-fade-up text-base text-muted-foreground [animation-delay:280ms]">
          {siteConfig.tagline}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:340ms]">
          <Button variant="whatsapp" size="lg" asChild>
            <a
              href={whatsappUrl(
                siteConfig.whatsapp.e164,
                siteConfig.whatsapp.message,
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-5" />
              Falar no WhatsApp
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href={
                siteConfig.useInlineAudioPlayers
                  ? '#tracks'
                  : siteConfig.drive.tracks
              }
              {...(siteConfig.useInlineAudioPlayers
                ? {}
                : { target: '_blank', rel: 'noreferrer' })}
            >
              <Headphones className="size-5" />
              Ouvir tracks
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
