#!/usr/bin/env node
/**
 * Generates SoundCloud-style waveform peaks for each MP3 in
 * public/media/tracks and public/media/sets.
 *
 * Output: public/media/waveforms/{slug}.json
 * Requires ffmpeg on PATH.
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const PEAK_COUNT = 200
const SAMPLE_RATE = 8000
const FOLDERS = ['tracks', 'sets']

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function hasFfmpeg() {
  return spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' }).status === 0
}

function listMp3(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.toLowerCase().endsWith('.mp3'))
    .map((d) => path.join(dir, d.name))
}

function extractPeaks(src) {
  const r = spawnSync(
    'ffmpeg',
    [
      '-hide_banner',
      '-loglevel',
      'error',
      '-i',
      src,
      '-ac',
      '1',
      '-ar',
      String(SAMPLE_RATE),
      '-f',
      'f32le',
      'pipe:1',
    ],
    { encoding: 'buffer', maxBuffer: 512 * 1024 * 1024 },
  )
  if (r.status !== 0) {
    console.error(r.stderr?.toString() || `ffmpeg failed for ${src}`)
    return null
  }

  const buf = r.stdout
  const sampleCount = Math.floor(buf.length / 4)
  if (sampleCount < PEAK_COUNT) return null

  const samples = new Float32Array(buf.buffer, buf.byteOffset, sampleCount)
  const block = Math.floor(sampleCount / PEAK_COUNT)
  const peaks = new Array(PEAK_COUNT)
  let max = 0

  for (let i = 0; i < PEAK_COUNT; i++) {
    const start = i * block
    const end = i === PEAK_COUNT - 1 ? sampleCount : start + block
    let peak = 0
    for (let j = start; j < end; j++) {
      const v = Math.abs(samples[j])
      if (v > peak) peak = v
    }
    peaks[i] = peak
    if (peak > max) max = peak
  }

  if (max <= 0) return peaks.map(() => 0.05)
  return peaks.map((p) => Math.max(0.04, Number((p / max).toFixed(4))))
}

function main() {
  if (!hasFfmpeg()) {
    console.error('ffmpeg not found on PATH')
    process.exit(1)
  }

  const outDir = path.join(root, 'public', 'media', 'waveforms')
  fs.mkdirSync(outDir, { recursive: true })

  for (const folder of FOLDERS) {
    const dir = path.join(root, 'public', 'media', folder)
    for (const src of listMp3(dir)) {
      const slug = slugify(path.parse(src).name)
      const out = path.join(outDir, `${slug}.json`)
      console.log(`waveform ${path.relative(root, src)}`)
      const peaks = extractPeaks(src)
      if (!peaks) {
        console.error(`  failed: ${src}`)
        continue
      }
      fs.writeFileSync(
        out,
        JSON.stringify({ peaks, version: 1 }, null, 0),
        'utf8',
      )
      console.log(`  → ${path.relative(root, out)} (${peaks.length} peaks)`)
    }
  }

  console.log('Done.')
}

main()
