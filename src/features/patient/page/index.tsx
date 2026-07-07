import PatientDetailForm from '../components/patient-detail-form'

export default function PatientProfile() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
          Patient
        </h1>
        <p className="lead">
          View and manage your health profile, medical history, and clinical
          records.
        </p>
      </div>
      <div>
        <PatientDetailForm />
      </div>
    </div>
  )
}
