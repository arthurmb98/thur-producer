import { cn } from '@/lib/utils'

export type LogoVariant = 'icon' | 'wordmark'
export type LogoTone = 'black' | 'blue' | 'violet' | 'gradient' | 'white'

type ThurLogoProps = {
  variant?: LogoVariant
  tone?: LogoTone
  className?: string
  title?: string
}

const TONES: Record<Exclude<LogoTone, 'gradient'>, string> = {
  black: '#0a0a0c',
  blue: '#058ef2',
  violet: '#9f2db3',
  white: '#f5f5f7',
}

function CapsuleT({ fill }: { fill: string }) {
  // Modular capsule T matching Koletivo K stroke language:
  // top bar = 2 parallel horizontals; stem = 2 parallel verticals centered.
  return (
    <g fill={fill}>
      <rect x="12" y="18" width="176" height="18" rx="9" />
      <rect x="12" y="44" width="176" height="18" rx="9" />
      <rect x="78" y="70" width="18" height="168" rx="9" />
      <rect x="104" y="70" width="18" height="168" rx="9" />
    </g>
  )
}

function GradientDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f2309b" />
        <stop offset="45%" stopColor="#9f2db3" />
        <stop offset="100%" stopColor="#058ef2" />
      </linearGradient>
    </defs>
  )
}

export function ThurLogo({
  variant = 'icon',
  tone = 'gradient',
  className,
  title = 'THUR',
}: ThurLogoProps) {
  const gradientId = `thur-grad-${variant}-${tone}`
  const fill = tone === 'gradient' ? `url(#${gradientId})` : TONES[tone]
  const textFill = tone === 'black' ? '#0a0a0c' : '#f5f5f7'

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 200 270"
        className={cn('h-auto w-auto', className)}
        role="img"
        aria-label={title}
      >
        {tone === 'gradient' ? <GradientDefs id={gradientId} /> : null}
        <CapsuleT fill={fill} />
      </svg>
    )
  }

  // Stem right edge ≈ 122; top-bar overhang goes to 188.
  // Stem right edge = 122; gap = 2× stroke width (36).
  return (
    <svg
      viewBox="0 0 420 270"
      className={cn('h-auto w-auto', className)}
      role="img"
      aria-label={title}
    >
      {tone === 'gradient' ? <GradientDefs id={gradientId} /> : null}
      <CapsuleT fill={fill} />
      <text
        x="153"
        y="186"
        fill={textFill}
        fontFamily="Syne, ui-sans-serif, system-ui, sans-serif"
        fontSize="88"
        fontWeight="700"
        letterSpacing="1"
      >
        HUR
      </text>
    </svg>
  )
}
