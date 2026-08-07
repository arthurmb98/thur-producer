# THUR — Produtor Musical & DJ

Landing comercial imersiva para booking, produções e collabs. Stack espelhada do [koletivo-hub](https://koletivo-hub.vercel.app): Vite + React 19 + Tailwind CSS v4.

## Desenvolvimento

```bash
npm install
npm run media:scan
npm run dev
```

Abra http://localhost:5173

## Mídia

Arquivos web ficam em `public/media/{tracks,sets,fotos,profile,backgrounds}` (áudio em **MP3**). O script `scan-media` lê essas pastas e gera `src/data/media-manifest.ts`.
