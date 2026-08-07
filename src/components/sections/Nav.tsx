import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { ThurLogo } from '@/components/brand/ThurLogo'
import { cn } from '@/lib/utils'
import { siteConfig, whatsappUrl } from '@/config/site'

const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#tracks', label: 'Tracks' },
  { href: '#sets', label: 'Sets' },
  { href: '#contato', label: 'Contato' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-border/50 bg-background/80 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        <a href="#top" className="shrink-0" aria-label="THUR">
          <ThurLogo variant="icon" tone="gradient" className="h-8 w-auto sm:h-9" />
        </a>
        <nav className="hidden items-center gap-5 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={whatsappUrl(siteConfig.whatsapp.e164, siteConfig.whatsapp.message)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-3 py-2 text-xs font-medium text-white transition hover:bg-whatsapp-hover sm:text-sm"
        >
          <MessageCircle className="size-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </header>
  )
}
