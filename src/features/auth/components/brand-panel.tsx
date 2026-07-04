import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ShieldCheckIcon, BrainCircuitIcon, HeartPulseIcon } from 'lucide-react'

const benefits = [
  {
    icon: BrainCircuitIcon,
    text: 'AI-powered symptom triage backed by clinical models',
  },
  {
    icon: HeartPulseIcon,
    text: 'Real-time health monitoring paired with real clinicians',
  },
  {
    icon: ShieldCheckIcon,
    text: 'Enterprise-grade security for your medical records',
  },
]

export function BrandPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" h-full w-full lg:flex lg:col-span-8 bg-muted flex-col justify-center p-12 xl:p-20 relative overflow-hidden"
    >
      {/* Subtle accent-tinted glow */}
      <div
        className="pointer-events-none absolute -top-1/4 -left-1/4 size-150 rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: 'var(--primary)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-12%] right-[-10%] size-100 rounded-full opacity-[0.05] blur-[100px]"
        style={{ background: 'var(--primary)' }}
        aria-hidden="true"
      />

      {/* Logo linking back home */}
      <Link href="/" className=" mb-12 flex justify-center">
        <Image
          src="/assets/logo/logos.webp"
          alt="Pulse Care"
          width={500}
          height={500}
          priority
          sizes="100vw"
        />
      </Link>

      {/* Value-proposition copy */}
      <div className="relative max-w-5xl mx-auto space-y-6">
        <p className="lead">
          Sign in to access intelligent symptom triage, virtual consultations
          with licensed clinicians, and real-time health monitoring — all in one
          secure platform.
        </p>

        {/* Benefit bullets with icon chips */}
        <ul className="space-y-4 pt-4">
          {benefits.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed pt-1">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
