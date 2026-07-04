'use client'

import { motion } from 'motion/react'
import {
  MessageCircle,
  Scan,
  TrendingUp,
  Zap,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const capabilities = [
  {
    icon: MessageCircle,
    title: 'Conversational Triage',
    description:
      'Our AI guides you through a natural-language conversation, asking the right follow-ups a clinician would — no medical knowledge required on your end.',
    metric: '3 min',
    metricLabel: 'avg. triage time',
    chartColor: 'bg-chart-1',
  },
  {
    icon: Scan,
    title: 'Intelligent Report Parsing',
    description:
      'Upload any lab result, imaging report, or prescription. The AI extracts key findings, highlights anomalies, and explains what they mean in plain language.',
    metric: '200+',
    metricLabel: 'report types supported',
    chartColor: 'bg-chart-3',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Health Insights',
    description:
      'By analyzing your longitudinal health data, the AI identifies trends and flags potential concerns before they become urgent — helping you stay ahead.',
    metric: '94%',
    metricLabel: 'early detection rate',
    chartColor: 'bg-chart-2',
  },
  {
    icon: Zap,
    title: 'Real-Time Decision Support',
    description:
      'During consultations, AI surfaces relevant patient history, drug interactions, and evidence-based guidelines — giving clinicians superpowers.',
    metric: '2.4×',
    metricLabel: 'faster diagnosis',
    chartColor: 'bg-chart-4',
  },
]

export function AICapability() {
  return (
    <section
      id="ai-capability"
      className="relative overflow-hidden bg-accent py-16 md:py-24 lg:py-32"
      aria-labelledby="ai-heading"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent-foreground/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/60 px-3 py-1 backdrop-blur-sm">
            {/* Pulse/glow indicator — ambient loop reserved for AI section only */}
            <motion.div
              className="size-2 rounded-full bg-primary"
              animate={{
                boxShadow: [
                  '0 0 0 0 oklch(0.45 0.12 195 / 0)',
                  '0 0 0 6px oklch(0.45 0.12 195 / 0.3)',
                  '0 0 0 0 oklch(0.45 0.12 195 / 0)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="caption text-accent-foreground">AI Engine Active</span>
          </div>

          <h2 id="ai-heading" className="text-accent-foreground">
            Intelligence that works{' '}
            <span className="text-primary">alongside</span> your doctor
          </h2>
          <p className="lead mt-4 text-accent-foreground/80">
            Not a replacement for clinical expertise — an amplifier. Every AI recommendation is transparent, traceable, and clinician-reviewed.
          </p>
        </motion.div>

        {/* Capability cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 md:mt-16">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-accent sm:size-12">
                    <Icon className="size-5 text-accent-foreground sm:size-6" />
                  </div>
                  {/* Metric badge */}
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground sm:text-2xl">{cap.metric}</p>
                    <p className="text-xs text-muted-foreground">{cap.metricLabel}</p>
                  </div>
                </div>
                <h5 className="mt-4 mb-2">{cap.title}</h5>
                <p className="text-sm text-foreground">{cap.description}</p>
                {/* Chart accent bar */}
                <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className={`h-full rounded-full ${cap.chartColor}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button size="lg" className="rounded-lg" asChild>
            <Link href="/signup">
              Experience AI-powered care
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
