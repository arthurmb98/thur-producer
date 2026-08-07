#!/usr/bin/env node
/**
 * Writes modular T / THUR SVG marks and rasterizes PNG via npx @resvg/resvg-js.
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'brand')
fs.mkdirSync(outDir, { recursive: true })

const GRADIENT = `
  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#f2309b"/>
    <stop offset="45%" stop-color="#9f2db3"/>
    <stop offset="100%" stop-color="#058ef2"/>
  </linearGradient>`

function capsuleT(fill) {
  return `
  <rect x="12" y="18" width="176" height="18" rx="9" fill="${fill}"/>
  <rect x="12" y="44" width="176" height="18" rx="9" fill="${fill}"/>
  <rect x="78" y="70" width="18" height="168" rx="9" fill="${fill}"/>
  <rect x="104" y="70" width="18" height="168" rx="9" fill="${fill}"/>`
}

function iconSvg(fill, withGradient) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 270" width="400" height="540">
  <rect width="200" height="270" fill="#000000"/>
  ${withGradient ? `<defs>${GRADIENT}</defs>` : ''}
  ${capsuleT(fill)}
</svg>`
}

function wordmarkSvg(fill, withGradient, textFill) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" width="960" height="540">
  <rect width="480" height="270" fill="#000000"/>
  ${withGradient ? `<defs>${GRADIENT}</defs>` : ''}
  ${capsuleT(fill)}
  <text x="198" y="182" fill="${textFill}" font-family="Arial Black, Helvetica, sans-serif" font-size="92" font-weight="700" letter-spacing="4">HUR</text>
</svg>`
}

const icons = {
  't-black': iconSvg('#0a0a0c', false),
  't-blue': iconSvg('#058ef2', false),
  't-violet': iconSvg('#9f2db3', false),
  't-gradient': iconSvg('url(#g)', true),
}

const wordmarks = {
  'thur-black': wordmarkSvg('#0a0a0c', false, '#0a0a0c'),
  'thur-blue': wordmarkSvg('#058ef2', false, '#f5f5f7'),
  'thur-violet': wordmarkSvg('#9f2db3', false, '#f5f5f7'),
  'thur-gradient': wordmarkSvg('url(#g)', true, '#f5f5f7'),
}

// Black logos need light bg to be visible — use white canvas for black variants
icons['t-black'] = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 270" width="400" height="540">
  <rect width="200" height="270" fill="#ffffff"/>
  ${capsuleT('#0a0a0c')}
</svg>`

wordmarks['thur-black'] = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270" width="960" height="540">
  <rect width="480" height="270" fill="#ffffff"/>
  ${capsuleT('#0a0a0c')}
  <text x="198" y="182" fill="#0a0a0c" font-family="Arial Black, Helvetica, sans-serif" font-size="92" font-weight="700" letter-spacing="4">HUR</text>
</svg>`

const all = { ...icons, ...wordmarks }

for (const [name, svg] of Object.entries(all)) {
  const svgPath = path.join(outDir, `${name}.svg`)
  fs.writeFileSync(svgPath, svg, 'utf8')
  console.log('wrote', path.relative(root, svgPath))
}

// Rasterize with local @resvg/resvg-js
const r = spawnSync(
  process.execPath,
  [
    '--input-type=module',
    '-e',
    `
import fs from 'node:fs'
import path from 'node:path'
import { Resvg } from '@resvg/resvg-js'
const dir = ${JSON.stringify(outDir)}
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
  const svg = fs.readFileSync(path.join(dir, file))
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: file.startsWith('thur') ? 960 : 400 },
  })
  const out = path.join(dir, file.replace(/\\.svg$/, '.png'))
  fs.writeFileSync(out, resvg.render().asPng())
  console.log('png', out)
}
`,
  ],
  { cwd: root, encoding: 'utf8', stdio: 'inherit' },
)
if (r.status !== 0) {
  console.warn('PNG rasterize failed — SVG marks are available in public/brand')
  process.exitCode = 0
}
