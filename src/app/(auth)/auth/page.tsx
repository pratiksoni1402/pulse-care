import type { Metadata } from 'next'
import { AuthShell } from '@/features/auth'

export const metadata: Metadata = {
  title: 'Sign In or Create Account',
  description: 'Access your Pulse Care account or join today for intelligent healthcare triage and real clinical care.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AuthPage() {
  return <AuthShell />
}
