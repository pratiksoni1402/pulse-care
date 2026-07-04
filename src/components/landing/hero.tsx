'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const staggerDelay = 0.12

function HeroVisual() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-lg"
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 4,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      {/* Abstract health dashboard card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl ring-1 ring-foreground/5 dark:ring-foreground/10">
        {/* Header row */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">AI Health Summary</p>
              <p className="text-xs text-muted-foreground">Updated just now</p>
            </div>
          </div>
          <div className="flex size-8 items-center justify-center rounded-full bg-chart-2/20">
            <span className="text-xs font-bold text-chart-2">98</span>
          </div>
        </div>

        {/* Metric bars */}
        <div className="space-y-4">
          {[
            { label: 'Symptom Analysis', value: 92, color: 'bg-chart-1' },
            { label: 'Risk Assessment', value: 78, color: 'bg-chart-3' },
            { label: 'Recovery Trend', value: 95, color: 'bg-chart-2' },
          ].map((metric) => (
            <div key={metric.label}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">{metric.label}</span>
                <span className="text-xs text-muted-foreground">{metric.value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className={`h-full rounded-full ${metric.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom insight */}
        <div className="mt-6 rounded-xl border border-border bg-muted/50 p-3">
          <p className="text-xs font-medium text-foreground">
            AI Insight
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            All vital signs are within healthy range. Your recovery is progressing 12% faster than average.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32"
    >
      {/* Soft radial glow — accent at 5–8% opacity */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-3xl md:h-[600px] md:w-[800px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[200px] w-[250px] rounded-full bg-primary/[0.04] blur-3xl md:h-[400px] md:w-[500px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Text content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                className="mb-6 rounded-full bg-accent px-3 py-1 text-accent-foreground"
              >
                <Sparkles className="size-3" />
                <span className="caption">AI-Powered Care</span>
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: staggerDelay }}
              className="max-w-xl"
            >
              Healthcare that{' '}
              <span className="text-primary">understands</span>{' '}
              you
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: staggerDelay * 2 }}
              className="lead mt-4 max-w-lg md:mt-6"
            >
              AI-driven triage, symptom analysis, and real-time health monitoring — paired with real clinicians who care about your wellbeing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: staggerDelay * 3 }}
              className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:mt-8"
            >
              <Button size="lg" className="w-full rounded-lg sm:w-auto" asChild>
                <Link href="/signup">
                  Start for free
                  <ArrowRight className="size-4" data-icon="inline-end" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="#features">See how it works</Link>
              </Button>
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: staggerDelay * 2 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
