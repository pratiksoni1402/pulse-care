'use client'

import { motion } from 'motion/react'
import {
  Stethoscope,
  Brain,
  CalendarCheck,
  FileText,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Symptom Analysis',
    description:
      'Describe your symptoms in plain language. Our AI cross-references millions of clinical data points to surface the most likely conditions.',
    detail: 'Powered by clinically validated models',
  },
  {
    icon: Stethoscope,
    title: 'Virtual Consultations',
    description:
      'Connect with board-certified physicians via secure video in under 10 minutes. No waiting rooms, no commute.',
    detail: 'Available 24/7 across all time zones',
  },
  {
    icon: CalendarCheck,
    title: 'Smart Scheduling',
    description:
      'AI predicts the best appointment times based on your availability, urgency, and provider expertise match.',
    detail: 'Reduces scheduling friction by 80%',
  },
  {
    icon: FileText,
    title: 'Report Analysis',
    description:
      'Upload lab results or imaging reports. AI breaks down complex medical jargon into clear, actionable insights.',
    detail: 'Supports 200+ report types',
  },
  {
    icon: ShieldCheck,
    title: 'Diagnostic Support',
    description:
      'AI-assisted differential diagnosis helps clinicians make faster, more accurate decisions with full transparency.',
    detail: 'Peer-reviewed accuracy benchmarks',
  },
  {
    icon: HeartPulse,
    title: 'Health Monitoring',
    description:
      'Real-time vitals tracking from wearables, with AI-driven alerts when readings fall outside your personal baselines.',
    detail: 'Integrates with 50+ devices',
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="bg-background py-16 md:py-24 lg:py-32"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="caption mb-3 uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 id="features-heading">
            Everything you need,{' '}
            <span className="text-primary">intelligently connected</span>
          </h2>
          <p className="lead mt-4">
            From your first symptom to your recovery plan — Pulse Care brings AI precision and human empathy together in one seamless experience.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 md:mt-16 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-6"
              >
                {/* Icon chip */}
                <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15 sm:mb-4 sm:size-12">
                  <Icon className="size-5 text-primary sm:size-6" />
                </div>

                <h5 className="mb-2">{feature.title}</h5>
                <p className="flex-1 text-sm text-foreground">
                  {feature.description}
                </p>
                <p className="mt-3 text-xs font-medium text-muted-foreground">
                  {feature.detail}
                </p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
