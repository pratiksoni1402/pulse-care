import Link from 'next/link'
import { Activity } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'AI Engine', href: '#ai-capability' },
    { label: 'Security', href: '#security' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'HIPAA Notice', href: '/hipaa' },
  ],
  Support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Status', href: '/status' },
    { label: 'Community', href: '/community' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="footer"
      className="border-t border-border bg-card"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              aria-label="Pulse Care home"
            >
              <Activity className="size-5 text-primary" />
              <span className="font-heading text-base font-bold">Pulse Care</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              AI-powered healthcare that pairs intelligent technology with real clinicians for better outcomes.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h6 className="mb-4 text-sm font-semibold text-foreground">{category}</h6>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="small text-muted-foreground">
            © {currentYear} Pulse Care. All rights reserved.
          </p>
          <p className="small text-muted-foreground">
            Made with care for better healthcare.
          </p>
        </div>
      </div>
    </footer>
  )
}
