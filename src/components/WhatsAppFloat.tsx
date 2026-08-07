import { MessageCircle } from 'lucide-react'
import { siteConfig, whatsappUrl } from '@/config/site'

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(siteConfig.whatsapp.e164, siteConfig.whatsapp.message)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.65)] transition hover:scale-105 hover:bg-whatsapp-hover md:bottom-8 md:right-8"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="size-7" />
    </a>
  )
}
