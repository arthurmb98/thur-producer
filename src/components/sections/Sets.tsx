import { Section } from '@/components/sections/Section'
import { AudioCard } from '@/components/media/AudioCard'
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
      {items.length === 0 ? (
        <p className="text-muted-foreground">Nenhum set encontrado em content/sets.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <AudioCard key={item.id} item={item} eyebrow="Set" />
          ))}
        </div>
      )}
    </Section>
  )
}
