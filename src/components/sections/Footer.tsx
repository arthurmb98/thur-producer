import { ThurLogo } from '@/components/brand/ThurLogo'
import { InstagramIcon } from '@/components/icons'
import {
  instagramUrl,
  mailtoUrl,
  siteConfig,
  whatsappUrl,
} from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <ThurLogo variant="wordmark" tone="gradient" className="h-10 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {siteConfig.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <a
            className="hover:text-foreground"
            href={whatsappUrl(siteConfig.whatsapp.e164, siteConfig.whatsapp.message)}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a
            className="inline-flex items-center gap-1.5 hover:text-foreground"
            href={instagramUrl(siteConfig.instagram)}
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon className="size-4" />
            @{siteConfig.instagram}
          </a>
          <a className="hover:text-foreground" href={mailtoUrl(siteConfig.email)}>
            Email
          </a>
          <a
            className="hover:text-foreground"
            href={siteConfig.koletivoHubUrl}
            target="_blank"
            rel="noreferrer"
          >
            Koletivo Hub
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-5xl px-5 text-xs text-muted-foreground/70 sm:px-8">
        © {new Date().getFullYear()} {siteConfig.brand}. Todos os direitos reservados.
      </p>
    </footer>
  )
}
