'use client'
import { FormProvider, useForm } from 'react-hook-form'
import PersonalVitalDetail from './form-one'
import { zodResolver } from '@hookform/resolvers/zod'

export default function PatientDetailForm() {
  const methods = useForm()
  const onSubmit = () => {}
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-3/5">
          <PersonalVitalDetail />
        </form>
      </FormProvider>
    </div>
  )
}
