import { Section } from '@/components/sections/Section'
import { mediaManifest } from '@/data/media-manifest'
import { cn } from '@/lib/utils'

export function Gallery() {
  const items = mediaManifest.photos

  return (
    <Section
      id="galeria"
      eyebrow="Cena"
      eyebrowClassName="text-pink"
      title="Imagens dos eventos"
      description="Bastidores, lifestyle e a atmosfera que cerca o som."
      wide
    >
      {items.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma foto encontrada em content/fotos.</p>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, index) => (
            <figure
              key={item.id}
              className={cn(
                'mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border/50',
                index % 3 === 0 && 'ring-1 ring-primary/20',
              )}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full object-cover transition duration-700 hover:scale-[1.03]"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      )}
    </Section>
  )
}
