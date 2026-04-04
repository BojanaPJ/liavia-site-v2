```md
# LiaVia — Landing Page

High-performance animated landing page for [LiaVia.ai](https://liavia.ai) built with Next.js 15 App Router.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger |
| 3D / Particles | Three.js |
| Font | Geist (next/font — zero layout shift) |
| Deployment | Vercel |

## Features

- **GSAP ScrollTrigger animations** — scroll-scrubbed image expansion, text fade-outs, section reveals
- **Three.js particle system** — interactive dot cloud with mouse-hover repulsion and scroll-driven explosion across the full viewport
- **Fixed global canvas** — particle layer runs as a single fixed overlay across all sections, zero re-mount cost
- **Next.js Image** — all images use `next/image` with `priority` and `sizes` for automatic WebP + lazy loading
- **next/font** — Geist loaded at build time, served as a local font, no FOUT
- **Tailwind v4 CSS variables** — custom gold + linen design token ramp, no runtime style injection
- **Component architecture** — each page section is an isolated `"use client"` component; layout and static sections are React Server Components
- **Single scroll listener** — GSAP's ScrollTrigger manages all scroll state; no competing listeners

## Project Structure

```
app/
├── layout.tsx              # Root layout — GlobalDotCanvas, fonts, metadata
├── page.tsx                # Page composition — imports all sections
├── globals.css             # Tailwind v4 @theme tokens (gold + linen ramps)
└── components/
    ├── GlobalDotCanvas.tsx # Fixed Three.js particle canvas (scroll-driven)
    ├── HeroSection.tsx
    ├── WhatWeDo.tsx        # CopenhagenSection — dot blob + text
    ├── GrowingTogether.tsx # Scroll-expanding image section
    ├── GroupNumbers.tsx    # Horizontal card slider
    ├── HowItWorks.tsx      # Diagnostics + App sub-sections
    ├── SecuritySafety.tsx  # 6-pillar security grid
    └── Footer.tsx          # Contact banner + Privacy/Cookie modals
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Performance Notes

- Three.js canvas uses `pointerEvents: none` — never blocks page interactions
- `ResizeObserver` regenerates particles on viewport resize; no stale coordinates
- All GSAP contexts are cleaned up on unmount via `ctx.revert()`
- `requestAnimationFrame` loop is cancelled on component unmount
- Images use `fill` + `object-cover` with explicit `sizes` to avoid oversized requests
- Tailwind v4 purges unused classes at build time — no runtime CSS overhead

## Dependencies

```bash
npm install gsap three
```

No other runtime animation dependencies.

## Fonts

Geist is loaded via `next/font/google` in `layout.tsx` and injected as a CSS variable (`--font-geist-sans`). Body and UI inherit it globally. Display headings use Georgia serif via Tailwind utility.

## Design Tokens

All brand colors are defined as CSS variables inside `@theme` in `globals.css`:

```css
--color-gold-500: #ad781c;   /* brand primary */
--color-linen-200: #eae6dc;  /* section background */
--color-linen-900: #1e1d18;  /* headings + footer */
```

Use them as standard Tailwind classes: `bg-gold-500`, `text-linen-900`, `border-gold-200`.

## Deployment

Deploy instantly on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
npm run build   # type-check + production bundle
npm run start   # preview production build locally
```
```
