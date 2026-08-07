import { AmbientBackground } from '@/components/AmbientBackground'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { Gallery } from '@/components/sections/Gallery'
import { Hero } from '@/components/sections/Hero'
import { Koletivo } from '@/components/sections/Koletivo'
import { Nav } from '@/components/sections/Nav'
import { Services } from '@/components/sections/Services'
import { Sets } from '@/components/sections/Sets'
import { Tracks } from '@/components/sections/Tracks'
import { AudioPlayerProvider } from '@/hooks/useAudioPlayer'

export function HomePage() {
  return (
    <AudioPlayerProvider>
      <div id="top" className="relative">
        <AmbientBackground />
        <Nav />
        <Hero />
        <Services />
        <About />
        <Tracks />
        <Sets />
        <Gallery />
        <Koletivo />
        <Contact />
        <Footer />
        <WhatsAppFloat />
      </div>
    </AudioPlayerProvider>
  )
}
