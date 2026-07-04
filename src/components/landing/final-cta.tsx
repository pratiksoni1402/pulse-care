'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="bg-background py-16 md:py-24 lg:py-32"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 id="cta-heading">
            Ready to experience{' '}
            <span className="text-primary">smarter</span> healthcare?
          </h2>
          <p className="lead mt-4">
            Join thousands of patients and clinicians who are already using Pulse Care to make healthcare more intelligent, accessible, and human.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="rounded-lg px-8" asChild>
              <Link href="/signup">
                Get started for free
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#features">Learn more</Link>
            </Button>
          </div>
          <p className="small mt-6 text-muted-foreground">
            No credit card required · Free for individual patients · HIPAA compliant
          </p>
        </motion.div>
      </div>
    </section>
  )
}
