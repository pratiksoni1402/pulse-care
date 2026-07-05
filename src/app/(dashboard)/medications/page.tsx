import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medications',
}

export default function MedicationsPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
        Medications
      </h1>
      <p className="lead">
        Track your active prescriptions, dosage schedules, and medication
        history.
      </p>
    </div>
  )
}
