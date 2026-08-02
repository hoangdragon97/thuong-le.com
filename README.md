# Thuong Le — Journalism Portfolio

Static portfolio prepared for GitHub and Vercel deployment.

## Responsive system

- Tested for viewport widths: 320, 390, 768, 1366, 1920, 2560 and 3840 pixels.
- One-column phone cards, two-column tablet layouts, three-column desktop article grids and four-column large-screen grids.
- Fluid typography uses bounded `clamp()` values, so long headings stay inside the viewport.
- The content canvas expands on large displays and stops at 2200px to remain readable on 2K, 4K and ultrawide screens.
- Local WebP images include responsive 480px, 960px and 1600px variants where applicable.
- Images below the fold use native lazy loading and asynchronous decoding.
- Motion respects `prefers-reduced-motion`.
- CSS and JavaScript are revalidated by Vercel to prevent stale responsive layouts.

## Deploy

Upload the complete source to the repository root and push to the production branch connected to Vercel.

Lighthouse results depend on network conditions and third-party article thumbnail services. The local layout, media loading, accessibility controls and cache settings are optimized for strong mobile performance.
