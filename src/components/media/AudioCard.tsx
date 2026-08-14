import { useEffect, useMemo, useState } from 'react'
import type { MediaItem } from '@/lib/media'
import { cn } from '@/lib/utils'
import { Pause, Play } from 'lucide-react'
import { WaveformSeek } from '@/components/media/WaveformSeek'
import {
  formatAudioTime,
  useAudioPlayer,
} from '@/hooks/useAudioPlayer'
import { Button } from '@/components/ui/button'

type AudioCardProps = {
  item: MediaItem
  eyebrow?: string
  className?: string
}

type WaveformJson = {
  peaks: number[]
}

export function AudioCard({ item, eyebrow = 'Track', className }: AudioCardProps) {
  const {
    toggle,
    play,
    isPlaying,
    playingId,
    currentTime,
    duration,
    seekRatio,
  } = useAudioPlayer()
  const playing = isPlaying(item.id)
  const active = playingId === item.id
  const [peaks, setPeaks] = useState<number[] | undefined>()

  useEffect(() => {
    if (!item.waveformSrc) {
      setPeaks(undefined)
      return
    }
    let cancelled = false
    void fetch(item.waveformSrc)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: WaveformJson | null) => {
        if (cancelled || !data?.peaks?.length) return
        setPeaks(data.peaks)
      })
      .catch(() => {
        if (!cancelled) setPeaks(undefined)
      })
    return () => {
      cancelled = true
    }
  }, [item.waveformSrc])

  const progress = useMemo(() => {
    if (!active || !duration || duration <= 0) return 0
    return currentTime / duration
  }, [active, currentTime, duration])

  const displayCurrent = active ? currentTime : 0
  const displayDuration = active && duration > 0 ? duration : 0

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
        <Button
          type="button"
          variant={playing ? 'outline' : 'default'}
          size="sm"
          className="shrink-0"
          onClick={() => toggle(item.id, item.src)}
          aria-pressed={playing}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          {playing ? 'Pausar' : 'Ouvir'}
        </Button>
      </div>

      <div className="mt-4">
        <WaveformSeek
          peaks={peaks}
          progress={progress}
          label={`Posição de ${item.title}`}
          onSeekRatio={(ratio) => {
            if (!active) {
              play(item.id, item.src, ratio)
              return
            }
            seekRatio(ratio)
          }}
        />
        <div className="mt-2 flex justify-between font-mono text-xs tabular-nums text-muted-foreground">
          <span>{formatAudioTime(displayCurrent)}</span>
          <span>{displayDuration > 0 ? formatAudioTime(displayDuration) : '--:--'}</span>
        </div>
      </div>
    </article>
  )
}
