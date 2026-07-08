'use client'
import { FormProvider, useForm } from 'react-hook-form'
import PersonalVitalDetail from './form-one'
import PatientVitalsAndConditions from './form-two'
import SurgicalHistoryAndHospitalizations from './form-three'
import OngoingTreatmentsDisabilitiesAndAllergies from './form-four'
import OngoingMedicationsFamilyAndLifestyle from './form-five'
import ImmunizationsReproductiveAndMentalHealth from './form-six'

export default function PatientDetailForm() {
  const methods = useForm()
  const onSubmit = () => {}
  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-3/5 border border-border bg-form-surface p-6 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 relative overflow-hidden"
          aria-label="Patient details"
        >
          <PersonalVitalDetail />
          <hr className="border-border my-6" />
          <PatientVitalsAndConditions />
          <hr className="border-border my-6" />
          <SurgicalHistoryAndHospitalizations />
          <hr className="border-border my-6" />
          <OngoingTreatmentsDisabilitiesAndAllergies />
          <hr className="border-border my-6" />
          <OngoingMedicationsFamilyAndLifestyle />
          <hr className="border-border my-6" />
          <ImmunizationsReproductiveAndMentalHealth />
        </form>
      </FormProvider>
    </div>
  )
}
