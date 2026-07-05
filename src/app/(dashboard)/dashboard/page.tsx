import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
        Dashboard
      </h1>
      <p className="lead">
        Welcome back. Here&apos;s an overview of your health insights and
        upcoming activities.
      </p>
    </div>
  )
}
