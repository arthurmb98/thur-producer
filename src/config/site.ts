export const siteConfig = {
  brand: 'THUR',
  role: 'Produtor Musical & DJ',
  headline: 'Som que move a pista. Produção que fecha o set.',
  tagline:
    'House, techno e psychedelic trance — versátil na cabine, preciso no estúdio.',
  aboutTitle: 'Engenheiro. Instrumentista. Produtor.',
  about: [
    'Thur é engenheiro de computação com ouvido de músico: guitarrista desde os 13 anos e produtor desde os 22. Essa combinação rara — rigor técnico e sensibilidade de quem já viveu o instrumento — define cada beat, cada transição e cada leitura de pista.',
    'Hoje o foco é a cena eletrônica, com trânsito livre entre house, techno e psychedelic trance. Versátil na pista, ele entrega energia sob medida para o evento: do sunset ao peak time, do groove quente ao trance hipnótico.',
    'Ideal para festas, releases autorais, collabs e projetos que pedem alguém que entende tanto de frequência quanto de sentimento.',
  ],
  services: [
    {
      title: 'DJ para festas e eventos',
      text: 'Sets sob medida para o público e o horário — house, techno ou psy. Energia controlada, transição limpa, pista aquecida.',
    },
    {
      title: 'Produção de tracks',
      text: 'Autorais com identidade: do sketch ao master. House, progressive e experimentações que cabem no seu catálogo.',
    },
    {
      title: 'Colaborações',
      text: 'Parcerias com produtores, selos e artistas. Co-produção, remix e direção criativa com olhar de engenheiro e ouvido de pista.',
    },
    {
      title: 'Direção sonora',
      text: 'Curadoria e identidade musical para marcas, eventos e projetos que precisam de um universo sonoro coerente.',
    },
  ],
  koletivo: {
    title: 'Parte do ecossistema Koletivo',
    text: 'A Koletivo Hub é uma fábrica de software: transforma a identidade de um negócio em site, app ou sistema — com design contemporâneo, tech de ponta e um investimento bem abaixo do mercado. Este site é um dos projetos da casa.',
    detail:
      'O app Koletivo nasceu primeiro, para reunir produção, equipe e público em eventos de música eletrônica. Hoje ele é um caso de uso: o Hub é o estúdio que constrói os produtos digitais — e o THUR faz parte disso.',
    cta: 'Conhecer a Koletivo Hub',
  },
  whatsapp: {
    display: '(98) 98195-4545',
    e164: '5598981954545',
    message:
      'Oi Thur! Passei pelo seu site e curti bastante. Gostaria de conversar sobre o seu trabalho.',
  },
  instagram: 'mb_arthur',
  email: 'arthur.mb98@hotmail.com',
  koletivoHubUrl: 'https://koletivo-hub.vercel.app',
  /**
   * Temporary: audio is hosted on Drive to avoid Vercel Fast Data Transfer.
   * When moving to object storage, set `useInlineAudioPlayers` to true and
   * point manifest `src` to the storage CDN URLs.
   */
  useInlineAudioPlayers: true,
  drive: {
    tracks:
      'https://drive.google.com/drive/folders/111dTe6HkhEHT3QkOeec8We5GP4Js9NJB?usp=drive_link',
    sets:
      'https://drive.google.com/drive/folders/1uno7KtdYjUTI3_RBwe5nMXQcxQ0DpbXS?usp=drive_link',
  },
  heroImage: '/hero/sunset2.png',
  profileImage: '/media/profile/IMG_Thur_reserva.jpg',
  logo: '/brand/thur-gradient.png',
  icon: '/brand/t-gradient.png',
} as const

export function whatsappUrl(e164: string, message?: string) {
  const base = `https://wa.me/${e164}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function instagramUrl(handle: string) {
  return `https://instagram.com/${handle}`
}

export function mailtoUrl(email: string) {
  return `mailto:${email}`
}
