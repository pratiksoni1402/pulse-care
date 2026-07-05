import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reports',
}

export default function ReportsPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
        Reports
      </h1>
      <p className="lead">
        Access your lab results, AI triage reports, and clinical documentation.
      </p>
    </div>
  )
}
