#!/usr/bin/env node
/**
 * Writes modular T / THUR SVG marks and rasterizes transparent PNGs.
 * Wordmark: HUR starts just past the stem (into top-bar overhang only),
 * vertically centered with the stem. No background fill.
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

/** Stem ends at x≈122; gap = 2× stroke width (36). Centered on stem mid. */
function hurText(fill) {
  return `<text x="153" y="186" fill="${fill}" font-family="Arial Black, Helvetica, sans-serif" font-size="88" font-weight="700" letter-spacing="1">HUR</text>`
}

function iconSvg(fill, withGradient) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 270" width="400" height="540">
  ${withGradient ? `<defs>${GRADIENT}</defs>` : ''}
  ${capsuleT(fill)}
</svg>`
}

function wordmarkSvg(fill, withGradient, textFill) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 270" width="840" height="540">
  ${withGradient ? `<defs>${GRADIENT}</defs>` : ''}
  ${capsuleT(fill)}
  ${hurText(textFill)}
</svg>`
}

const all = {
  't-gradient': iconSvg('url(#g)', true),
  'thur-gradient': wordmarkSvg('url(#g)', true, '#f5f5f7'),
}

for (const [name, svg] of Object.entries(all)) {
  const svgPath = path.join(outDir, `${name}.svg`)
  fs.writeFileSync(svgPath, svg, 'utf8')
  console.log('wrote', path.relative(root, svgPath))
}

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
    fitTo: { mode: 'width', value: file.startsWith('thur') ? 840 : 400 },
    background: 'rgba(0,0,0,0)',
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
