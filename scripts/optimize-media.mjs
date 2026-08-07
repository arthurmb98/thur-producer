#!/usr/bin/env node
/**
 * Optimizes content media into public/media for web playback.
 * Requires ffmpeg on PATH. Skips files already present and up-to-date.
 *
 * Large audio (>80MB) is converted with a 3-minute preview clip for local UX,
 * plus a note in the console. Smaller files get a full MP3 encode.
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const LARGE_AUDIO_BYTES = 80 * 1024 * 1024
const PREVIEW_SECONDS = 180

const FOLDERS = {
  tracks: { publicSub: 'tracks', type: 'audio' },
  sets: { publicSub: 'sets', type: 'audio' },
  fotos: { publicSub: 'fotos', type: 'image' },
  'profile-image': { publicSub: 'profile', type: 'image' },
  'background-images': { publicSub: 'backgrounds', type: 'image' },
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function hasFfmpeg() {
  const r = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' })
  return r.status === 0
}

function runFfmpeg(args) {
  const r = spawnSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], {
    encoding: 'utf8',
  })
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout || 'ffmpeg failed')
    return false
  }
  return true
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && !d.name.startsWith('.'))
    .map((d) => path.join(dir, d.name))
}

function optimizeAudio(src, dest) {
  const ext = path.extname(src).toLowerCase()
  if (ext === '.mp3') {
    fs.copyFileSync(src, dest)
    return true
  }
  const size = fs.statSync(src).size
  const isLarge = size > LARGE_AUDIO_BYTES
  const args = ['-i', src]
  if (isLarge) {
    args.push('-t', String(PREVIEW_SECONDS))
    console.log(`  preview ${PREVIEW_SECONDS}s (source ${(size / 1e6).toFixed(0)}MB)`)
  }
  args.push('-vn', '-codec:a', 'libmp3lame', '-b:a', '192k', dest)
  return runFfmpeg(args)
}

function optimizeImage(src, dest) {
  // Prefer ffmpeg scale for consistency without sharp dependency
  return runFfmpeg([
    '-i',
    src,
    '-vf',
    'scale=min(1920\\,iw):-2',
    '-q:v',
    '4',
    dest,
  ])
}

function main() {
  if (!hasFfmpeg()) {
    console.error('ffmpeg not found on PATH. Install ffmpeg to optimize media.')
    process.exit(1)
  }

  for (const [folder, meta] of Object.entries(FOLDERS)) {
    const srcDir = path.join(root, 'content', folder)
    const outDir = path.join(root, 'public', 'media', meta.publicSub)
    ensureDir(outDir)

    for (const src of listFiles(srcDir)) {
      const ext = path.extname(src).toLowerCase()
      const base = slugify(path.parse(src).name)

      let dest
      if (meta.type === 'audio') {
        if (!['.mp3', '.wav', '.flac', '.m4a', '.aac', '.ogg', '.aiff', '.aif'].includes(ext))
          continue
        dest = path.join(outDir, `${base}.mp3`)
      } else {
        if (!['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tif', '.tiff'].includes(ext))
          continue
        dest = path.join(outDir, `${base}.jpg`)
      }

      if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs) {
        console.log(`skip ${path.relative(root, dest)}`)
        continue
      }

      console.log(`optimize ${path.relative(root, src)} → ${path.relative(root, dest)}`)
      const ok =
        meta.type === 'audio' ? optimizeAudio(src, dest) : optimizeImage(src, dest)

      if (!ok) console.error(`failed: ${src}`)
    }
  }

  console.log('Done. Run npm run media:scan to refresh the manifest.')
}

main()
