import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type AudioPlayerContextValue = {
  playingId: string | null
  play: (id: string, src: string) => void
  pause: () => void
  toggle: (id: string, src: string) => void
  isPlaying: (id: string) => boolean
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener('ended', () => setPlayingId(null))
    }
    return audioRef.current
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (audio) audio.pause()
    setPlayingId(null)
  }, [])

  const play = useCallback(
    (id: string, src: string) => {
      const audio = ensureAudio()
      if (playingId === id) {
        void audio.play()
        return
      }
      audio.src = src
      void audio.play().catch(() => setPlayingId(null))
      setPlayingId(id)
    },
    [ensureAudio, playingId],
  )

  const toggle = useCallback(
    (id: string, src: string) => {
      if (playingId === id) pause()
      else play(id, src)
    },
    [pause, play, playingId],
  )

  const isPlaying = useCallback((id: string) => playingId === id, [playingId])

  const value = useMemo(
    () => ({ playingId, play, pause, toggle, isPlaying }),
    [playingId, play, pause, toggle, isPlaying],
  )

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext)
  if (!ctx) throw new Error('useAudioPlayer must be used within AudioPlayerProvider')
  return ctx
}
