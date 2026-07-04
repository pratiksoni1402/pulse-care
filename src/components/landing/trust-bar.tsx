'use client'

import { motion } from 'motion/react'

const partners = [
  'Mayo Clinic',
  'Cleveland Clinic',
  'Johns Hopkins',
  'Stanford Health',
  'Mount Sinai',
  'Kaiser Permanente',
]

export function TrustBar() {
  return (
    <section
      id="trust-bar"
      className="border-y border-border bg-muted py-8"
      aria-label="Trusted by leading healthcare institutions"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <p className="caption mb-6 text-center uppercase tracking-widest">
          Trusted by leading healthcare institutions
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12">
          {partners.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {/* Abstract logo placeholder — a styled text mark */}
              <div className="flex size-8 items-center justify-center rounded-lg bg-foreground/5 transition-colors duration-300 group-hover:bg-primary/10">
                <span className="text-xs font-bold uppercase text-muted-foreground transition-colors duration-300 group-hover:text-primary">
                  {name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
