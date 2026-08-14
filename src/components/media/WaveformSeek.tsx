import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type WaveformSeekProps = {
  peaks?: number[]
  progress: number
  disabled?: boolean
  onSeekRatio: (ratio: number) => void
  className?: string
  label?: string
}

const FALLBACK_PEAKS = Array.from({ length: 64 }, (_, i) => {
  const t = i / 63
  return 0.25 + 0.55 * Math.abs(Math.sin(t * Math.PI * 4)) * (0.4 + 0.6 * t)
})

export function WaveformSeek({
  peaks,
  progress,
  disabled,
  onSeekRatio,
  className,
  label = 'Posição da faixa',
}: WaveformSeekProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef(false)
  const [scrubRatio, setScrubRatio] = useState<number | null>(null)

  const bars = useMemo(() => {
    const source = peaks && peaks.length > 0 ? peaks : FALLBACK_PEAKS
    return source.map((v) => Math.min(1, Math.max(0.04, v)))
  }, [peaks])

  const visualProgress = scrubRatio ?? Math.min(1, Math.max(0, progress))

  const ratioFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    if (rect.width <= 0) return 0
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
  }, [])

  const commitSeek = useCallback(
    (ratio: number) => {
      onSeekRatio(ratio)
    },
    [onSeekRatio],
  )

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!draggingRef.current || disabled) return
      const ratio = ratioFromClientX(event.clientX)
      setScrubRatio(ratio)
    }
    const onUp = (event: PointerEvent) => {
      if (!draggingRef.current) return
      draggingRef.current = false
      const ratio = ratioFromClientX(event.clientX)
      setScrubRatio(null)
      commitSeek(ratio)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [commitSeek, disabled, ratioFromClientX])

  return (
    <div
      ref={trackRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(visualProgress * 100)}
      aria-disabled={disabled || undefined}
      className={cn(
        'relative flex h-12 w-full touch-none select-none items-center gap-px outline-none',
        disabled ? 'cursor-default opacity-60' : 'cursor-pointer',
        'focus-visible:ring-2 focus-visible:ring-primary/40',
        className,
      )}
      onPointerDown={(event) => {
        if (disabled) return
        event.preventDefault()
        draggingRef.current = true
        const ratio = ratioFromClientX(event.clientX)
        setScrubRatio(ratio)
        ;(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId)
      }}
      onKeyDown={(event) => {
        if (disabled) return
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
          event.preventDefault()
          commitSeek(Math.min(1, visualProgress + 0.02))
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
          event.preventDefault()
          commitSeek(Math.max(0, visualProgress - 0.02))
        } else if (event.key === 'Home') {
          event.preventDefault()
          commitSeek(0)
        } else if (event.key === 'End') {
          event.preventDefault()
          commitSeek(1)
        }
      }}
    >
      {bars.map((peak, index) => {
        const barProgress = (index + 0.5) / bars.length
        const active = barProgress <= visualProgress
        return (
          <span
            key={index}
            className={cn(
              'min-w-px flex-1 rounded-full transition-colors duration-75',
              active
                ? 'bg-gradient-to-t from-primary to-violet'
                : 'bg-muted-foreground/35',
            )}
            style={{ height: `${Math.round(peak * 100)}%` }}
          />
        )
      })}
    </div>
  )
}
