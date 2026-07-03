import { inter, geistSans, geistMono } from './fonts'
import './globals.css'
import { cn } from '@/lib/utils'
import NextTopLoader from 'nextjs-toploader'

import type { Metadata, Viewport } from 'next'

const SITE_URL = 'https://pulsecare.vercel.app'
const SITE_NAME = 'Pulse Care'
const SITE_DESCRIPTION =
  'Pulse Care is an AI-powered healthcare platform that pairs intelligent triage, virtual consultations, and real-time health monitoring with real clinicians — combining AI healthcare with real care.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Pulse Care — AI Healthcare. Real Care.',
    template: '%s | Pulse Care',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',

  keywords: [
    'Pulse Care',
    'AI healthcare',
    'telehealth',
    'virtual consultation',
    'AI symptom checker',
    'remote patient monitoring',
    'digital health platform',
    'online doctor consultation',
  ],

  authors: [{ name: 'Pulse Care Team', url: SITE_URL }],
  creator: 'Pulse Care',
  publisher: 'Pulse Care',

  // Prevents iOS/Android from auto-linking things like phone numbers
  // it misdetects in health data (dosages, patient IDs, etc.)
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: '/',
    // languages: {
    //   "en-US": "/en-US",
    //   "hi-IN": "/hi-IN",
    // },
  },

  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Pulse Care — AI Healthcare. Real Care.',
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image.png', // 1200x630
        width: 1200,
        height: 630,
        alt: 'Pulse Care — AI Healthcare. Real Care.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Pulse Care — AI Healthcare. Real Care.',
    description: SITE_DESCRIPTION,
    images: ['/twitter-image.png'], // 1200x630
    site: 'https://pulsecare.vercel.app',
    creator: '@pulsecare',
  },

  icons: {
    icon: [
      { url: '/assets/favicons/favicon.ico', sizes: 'any' },
      {
        url: '/assets/favicons/favicon-16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/assets/favicons/favicon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/assets/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/assets/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/assets/icons/apple-icon-180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: ['/favicon.ico'],
  },

  manifest: '/manifest.webmanifest',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  category: 'healthcare',

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },

  referrer: 'strict-origin-when-cross-origin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <NextTopLoader
          color="#193e41"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #ffffff,0 0 5px #ffffff"
        />
      </body>
    </html>
  )
}
