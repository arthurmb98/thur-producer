# THUR — Produtor Musical & DJ

Landing comercial imersiva para booking, produções e collabs. Stack espelhada do [koletivo-hub](https://koletivo-hub.vercel.app): Vite + React 19 + Tailwind CSS v4.

## Desenvolvimento

```bash
npm install
npm run media:optimize   # requer ffmpeg
npm run media:scan
npm run dev
```

Abra http://localhost:5173

## Mídia

Coloque originais em `content/{tracks,sets,fotos,profile-image,background-images}`. O script `scan-media` lê **todas** as extensões suportadas e gera `src/data/media-manifest.ts`. `optimize-media` gera versões web em `public/media`.
