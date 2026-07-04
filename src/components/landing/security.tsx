'use client'

import { motion } from 'motion/react'
import { ShieldCheck, Lock, FileCheck, Server, Eye, Award } from 'lucide-react'

const badges = [
  { icon: ShieldCheck, label: 'HIPAA Compliant' },
  { icon: Lock, label: 'SOC 2 Type II' },
  { icon: FileCheck, label: 'GDPR Ready' },
  { icon: Server, label: '256-bit Encryption' },
  { icon: Eye, label: 'Zero-Knowledge Architecture' },
  { icon: Award, label: 'ISO 27001' },
]

export function Security() {
  return (
    <section
      id="security"
      className="bg-secondary py-16 md:py-24 lg:py-32"
      aria-labelledby="security-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="caption mb-3 uppercase tracking-widest text-primary">
              Security & Compliance
            </p>
            <h2 id="security-heading" className="text-secondary-foreground">
              Your health data deserves{' '}
              <span className="text-primary">uncompromising</span> security
            </h2>
            <p className="lead mt-4 text-secondary-foreground/80">
              Enterprise-grade infrastructure, end-to-end encryption, and continuous compliance audits — because trust isn&apos;t optional in healthcare.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'All data encrypted at rest and in transit with AES-256',
                'Regular penetration testing by independent security firms',
                'Role-based access control with full audit logging',
                'Data residency options for regulatory compliance',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-sm text-secondary-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Compliance badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {badges.map((badge, i) => {
                const Icon = badge.icon
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/50 p-3 text-center backdrop-blur-sm sm:gap-3 sm:p-5"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl border border-border">
                      <Icon className="size-5 text-foreground" />
                    </div>
                    <p className="text-xs font-medium text-foreground">
                      {badge.label}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
