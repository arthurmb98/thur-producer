import { Section } from '@/components/sections/Section'
import { AudioCard } from '@/components/media/AudioCard'
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
      {items.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma track encontrada em content/tracks.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <AudioCard key={item.id} item={item} eyebrow="Autoral" />
          ))}
        </div>
      )}
    </Section>
  )
}
