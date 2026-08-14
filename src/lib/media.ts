export type MediaKind = 'track' | 'set' | 'photo' | 'profile' | 'background'

export type MediaItem = {
  id: string
  kind: MediaKind
  title: string
  filename: string
  format: string
  /** Public URL after optimize (or original if already web-ready). */
  src: string
  originalPath: string
  bytes: number
  /** Optional precomputed waveform peaks JSON (SoundCloud-style). */
  waveformSrc?: string
}

export type MediaManifest = {
  generatedAt: string
  tracks: MediaItem[]
  sets: MediaItem[]
  photos: MediaItem[]
  profile: MediaItem[]
  backgrounds: MediaItem[]
}

export function titleFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, '')
  return base
    .replace(/[_]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}
