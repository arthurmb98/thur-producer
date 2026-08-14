import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type AudioPlayerContextValue = {
  playingId: string | null
  currentTime: number
  duration: number
  play: (id: string, src: string, startRatio?: number) => void
  pause: () => void
  toggle: (id: string, src: string) => void
  seek: (time: number) => void
  seekRatio: (ratio: number) => void
  isPlaying: (id: string) => boolean
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio()
      audio.preload = 'metadata'
      audio.addEventListener('ended', () => {
        setPlayingId(null)
        setCurrentTime(0)
      })
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
      })
      audio.addEventListener('loadedmetadata', () => {
        setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
      })
      audio.addEventListener('durationchange', () => {
        setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
      })
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  useEffect(() => {
    return () => {
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        audio.src = ''
      }
    }
  }, [])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (audio) audio.pause()
    setPlayingId(null)
  }, [])

  const play = useCallback(
    (id: string, src: string, startRatio?: number) => {
      const audio = ensureAudio()
      if (playingId === id) {
        void audio.play().catch(() => setPlayingId(null))
        if (typeof startRatio === 'number' && Number.isFinite(audio.duration) && audio.duration > 0) {
          const next = Math.min(Math.max(startRatio, 0), 1) * audio.duration
          audio.currentTime = next
          setCurrentTime(next)
        }
        return
      }
      audio.src = src
      setCurrentTime(0)
      setDuration(0)
      setPlayingId(id)

      const applyStart = () => {
        if (typeof startRatio === 'number' && Number.isFinite(audio.duration) && audio.duration > 0) {
          const next = Math.min(Math.max(startRatio, 0), 1) * audio.duration
          audio.currentTime = next
          setCurrentTime(next)
        }
      }

      const onMeta = () => {
        applyStart()
        audio.removeEventListener('loadedmetadata', onMeta)
      }
      audio.addEventListener('loadedmetadata', onMeta)
      void audio.play().catch(() => setPlayingId(null))
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

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return
    const next = Math.min(Math.max(time, 0), audio.duration)
    audio.currentTime = next
    setCurrentTime(next)
  }, [])

  const seekRatio = useCallback(
    (ratio: number) => {
      const audio = audioRef.current
      if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return
      seek(ratio * audio.duration)
    },
    [seek],
  )

  const isPlaying = useCallback((id: string) => playingId === id, [playingId])

  const value = useMemo(
    () => ({
      playingId,
      currentTime,
      duration,
      play,
      pause,
      toggle,
      seek,
      seekRatio,
      isPlaying,
    }),
    [
      playingId,
      currentTime,
      duration,
      play,
      pause,
      toggle,
      seek,
      seekRatio,
      isPlaying,
    ],
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

export function formatAudioTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
