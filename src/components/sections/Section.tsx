import { cn } from '@/lib/utils'
import { useReveal } from '@/hooks/useReveal'
import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  eyebrow?: string
  eyebrowClassName?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
  wide?: boolean
}

export function Section({
  id,
  eyebrow,
  eyebrowClassName,
  title,
  description,
  children,
  className,
  wide,
}: SectionProps) {
  const { ref, visible } = useReveal()

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'relative py-16 sm:py-24',
        'reveal',
        visible && 'is-visible',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto px-5 sm:px-8',
          wide ? 'max-w-6xl' : 'max-w-5xl',
        )}
      >
        {eyebrow ? (
          <p
            className={cn(
              'text-xs font-medium uppercase tracking-[0.18em] text-primary',
              eyebrowClassName,
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
