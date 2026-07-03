import type { MetadataRoute } from 'next'

// Save this as app/manifest.ts — Next.js auto-serves it at /manifest.webmanifest
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pulse Care — AI Healthcare. Real Care.',
    short_name: 'Pulse Care',
    description:
      'AI-powered healthcare platform combining intelligent triage, virtual consultations, and real-time health monitoring.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#0A1A3C',
    orientation: 'portrait',
    icons: [
      {
        src: '/assets/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
