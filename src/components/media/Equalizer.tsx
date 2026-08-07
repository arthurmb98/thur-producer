import { cn } from '@/lib/utils'

type EqualizerProps = {
  active?: boolean
  className?: string
  bars?: number
}

export function Equalizer({ active = true, className, bars = 5 }: EqualizerProps) {
  return (
    <div
      className={cn('flex h-5 items-end gap-0.5', className)}
      aria-hidden
    >
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className={cn(
            'w-1 rounded-full bg-gradient-to-t from-primary to-pink',
            active ? 'eq-bar' : 'h-1 opacity-40',
          )}
          style={
            active
              ? {
                  height: '100%',
                  animationDelay: `${i * 0.12}s`,
                  animationDuration: `${0.7 + (i % 3) * 0.15}s`,
                }
              : undefined
          }
        />
      ))}
    </div>
  )
}
