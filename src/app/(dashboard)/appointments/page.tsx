import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Appointments',
}

export default function AppointmentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
        Appointments
      </h1>
      <p className="lead">
        Schedule, manage, and track your upcoming virtual consultations and
        clinic visits.
      </p>
    </div>
  )
}
