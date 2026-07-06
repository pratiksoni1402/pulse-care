import PatientProfile from '@/features/patient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Patient',
}

export default function PatientPage() {
  return (
    <>
      <PatientProfile />
    </>
  )
}
