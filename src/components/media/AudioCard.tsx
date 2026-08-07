import type { MediaItem } from '@/lib/media'
import { cn } from '@/lib/utils'
import { Pause, Play } from 'lucide-react'
import { Equalizer } from '@/components/media/Equalizer'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { Button } from '@/components/ui/button'

type AudioCardProps = {
  item: MediaItem
  eyebrow?: string
  className?: string
}

export function AudioCard({ item, eyebrow = 'Track', className }: AudioCardProps) {
  const { toggle, isPlaying } = useAudioPlayer()
  const playing = isPlaying(item.id)

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/60 bg-elevated/50 p-5 backdrop-blur-sm transition hover:border-primary/40 hover:bg-elevated/80',
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-violet/50 opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-foreground">
            {item.title}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            .{item.format}
          </p>
        </div>
        <Equalizer active={playing} className="shrink-0" />
      </div>
      <div className="mt-5">
        <Button
          type="button"
          variant={playing ? 'outline' : 'default'}
          size="sm"
          onClick={() => toggle(item.id, item.src)}
          aria-pressed={playing}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          {playing ? 'Pausar' : 'Ouvir'}
        </Button>
      </div>
    </article>
  )
}
