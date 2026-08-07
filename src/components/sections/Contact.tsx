import { Mail, MessageCircle } from 'lucide-react'
import { InstagramIcon } from '@/components/icons'
import { Section } from '@/components/sections/Section'
import { Button } from '@/components/ui/button'
import {
  instagramUrl,
  mailtoUrl,
  siteConfig,
  whatsappUrl,
} from '@/config/site'

export function Contact() {
  return (
    <Section
      id="contato"
      eyebrow="Vamos conversar"
      eyebrowClassName="text-violet"
      title="Parcerias, bookings e collabs"
      description="Pronto para fechar festa, produção ou projeto? Chama no WhatsApp — resposta direta com Thur."
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <Button variant="whatsapp" size="lg" asChild>
          <a
            href={whatsappUrl(
              siteConfig.whatsapp.e164,
              siteConfig.whatsapp.message,
            )}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="size-5" />
            WhatsApp {siteConfig.whatsapp.display}
          </a>
        </Button>
        <Button variant="instagram" size="lg" asChild>
          <a
            href={instagramUrl(siteConfig.instagram)}
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon className="size-5" />
            @{siteConfig.instagram}
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <a href={mailtoUrl(siteConfig.email)}>
            <Mail className="size-5" />
            {siteConfig.email}
          </a>
        </Button>
      </div>
    </Section>
  )
}
