'use client'

import { motion } from 'motion/react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Patient',
    initials: 'SC',
    rating: 5,
    quote:
      'The AI symptom checker identified my condition in minutes — something I had been Googling for weeks. I was connected to a specialist the same day.',
  },
  {
    name: 'Dr. Marcus Rivera',
    role: 'Family Physician',
    initials: 'MR',
    rating: 5,
    quote:
      'As a doctor, the decision-support system is remarkable. It surfaces relevant studies and drug interactions in real time, letting me focus on the patient.',
  },
  {
    name: 'Aisha Patel',
    role: 'Patient',
    initials: 'AP',
    rating: 5,
    quote:
      'I uploaded my bloodwork and got a clear, jargon-free breakdown within seconds. The follow-up recommendations were spot-on. Genuinely impressed.',
  },
  {
    name: 'James Okonkwo',
    role: 'Patient',
    initials: 'JO',
    rating: 4,
    quote:
      'The scheduling AI found me a cardiologist at a time that actually worked. No phone tag, no waiting on hold. Healthcare shouldn\'t have been this hard before.',
  },
  {
    name: 'Dr. Emily Larsson',
    role: 'Pediatrician',
    initials: 'EL',
    rating: 5,
    quote:
      'My patients\' parents love the health monitoring alerts. They feel reassured between visits, and I get the longitudinal data I need to make better decisions.',
  },
  {
    name: 'Tomás García',
    role: 'Patient',
    initials: 'TG',
    rating: 5,
    quote:
      'After my surgery, the AI tracked my recovery milestones and flagged when something needed attention. It felt like having a nurse on call 24/7.',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? 'fill-chart-4 text-chart-4'
              : 'fill-muted text-muted'
          }`}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-muted py-16 md:py-24 lg:py-32"
      aria-labelledby="testimonials-heading"
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
            Testimonials
          </p>
          <h2 id="testimonials-heading">
            Loved by patients and{' '}
            <span className="text-primary">clinicians</span> alike
          </h2>
          <p className="lead mt-4">
            Real stories from people who experience the difference AI-augmented healthcare makes every day.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 md:mt-16 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.blockquote
              key={testimonial.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-6"
            >
              <StarRating rating={testimonial.rating} />
              <p className="mt-4 flex-1 text-sm text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                {/* Avatar */}
                <div className="flex size-10 items-center justify-center rounded-full border border-border bg-muted">
                  <span className="text-xs font-bold text-foreground">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
