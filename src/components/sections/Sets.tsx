import { ExternalLink } from 'lucide-react'
import { Section } from '@/components/sections/Section'
import { AudioCard } from '@/components/media/AudioCard'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { mediaManifest } from '@/data/media-manifest'

export function Sets() {
  const items = mediaManifest.sets

  return (
    <Section
      id="sets"
      eyebrow="Na pista"
      eyebrowClassName="text-violet"
      title="Sets & mixes"
      description="Mixes ao vivo e gravações — house, techno, progressive e collabs."
      wide
    >
      {siteConfig.useInlineAudioPlayers ? (
        items.length === 0 ? (
          <p className="text-muted-foreground">
            Nenhum set encontrado em public/media/sets.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <AudioCard key={item.id} item={item} eyebrow="Set" />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-start gap-4">
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Ouça os sets no Drive — em breve no player do site via storage.
          </p>
          <Button variant="default" size="lg" asChild>
            <a href={siteConfig.drive.sets} target="_blank" rel="noreferrer">
              <ExternalLink className="size-5" />
              Ouvir sets no Drive
            </a>
          </Button>
        </div>
      )}
    </Section>
  )
}
