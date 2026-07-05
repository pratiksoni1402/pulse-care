import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Patient',
}

export default function PatientPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
        Patient
      </h1>
      <p className="lead">
        View and manage your health profile, medical history, and clinical
        records.
      </p>
    </div>
  )
}
