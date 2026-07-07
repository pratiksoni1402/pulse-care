import PatientProfile from '@/features/patient/page'
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
