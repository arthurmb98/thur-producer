import { ExternalLink } from 'lucide-react'
import { Section } from '@/components/sections/Section'
import { AudioCard } from '@/components/media/AudioCard'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { mediaManifest } from '@/data/media-manifest'

export function Tracks() {
  const items = mediaManifest.tracks

  return (
    <Section
      id="tracks"
      eyebrow="Autorais"
      eyebrowClassName="text-pink"
      title="Tracks"
      description="Produções próprias — do sketch ao dancefloor."
      wide
    >
      {siteConfig.useInlineAudioPlayers ? (
        items.length === 0 ? (
          <p className="text-muted-foreground">
            Nenhuma track encontrada em public/media/tracks.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <AudioCard key={item.id} item={item} eyebrow="Autoral" />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-start gap-4">
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Ouça as autorais no Drive — em breve no player do site via storage.
          </p>
          <Button variant="default" size="lg" asChild>
            <a
              href={siteConfig.drive.tracks}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="size-5" />
              Ouvir autorais no Drive
            </a>
          </Button>
        </div>
      )}
    </Section>
  )
}
