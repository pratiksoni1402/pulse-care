import {
  patients,
  patientVitals,
  medicalConditions,
  surgicalHistory,
  hospitalizations,
  ongoingTreatments,
  disabilities,
  allergies,
  medications,
  familyMedicalHistory,
  lifestyleInfo,
  immunizations,
  reproductiveHealth,
  mentalHealthInfo,
} from '@/db/schema/patients'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import z from 'zod'

// Patients
export const PatientDetailInsertSchema = createInsertSchema(patients)
export const PatientDetailSelectSchema = createSelectSchema(patients)
export type PatientInsertType = z.infer<typeof PatientDetailInsertSchema>
export type PatientSelectType = z.infer<typeof PatientDetailSelectSchema>

// Patient Vitals
export const PatientVitalsInsertSchema = createInsertSchema(patientVitals)
export const PatientVitalsSelectSchema = createSelectSchema(patientVitals)
export type PatientVitalsInsertType = z.infer<typeof PatientVitalsInsertSchema>
export type PatientVitalsSelectType = z.infer<typeof PatientVitalsSelectSchema>

// Medical Conditions
export const MedicalConditionsInsertSchema =
  createInsertSchema(medicalConditions)
export const MedicalConditionsSelectSchema =
  createSelectSchema(medicalConditions)
export type MedicalConditionsInsertType = z.infer<
  typeof MedicalConditionsInsertSchema
>
export type MedicalConditionsSelectType = z.infer<
  typeof MedicalConditionsSelectSchema
>

// Surgical History
export const SurgicalHistoryInsertSchema = createInsertSchema(surgicalHistory)
export const SurgicalHistorySelectSchema = createSelectSchema(surgicalHistory)
export type SurgicalHistoryInsertType = z.infer<
  typeof SurgicalHistoryInsertSchema
>
export type SurgicalHistorySelectType = z.infer<
  typeof SurgicalHistorySelectSchema
>

// Hospitalizations
export const HospitalizationsInsertSchema = createInsertSchema(hospitalizations)
export const HospitalizationsSelectSchema = createSelectSchema(hospitalizations)
export type HospitalizationsInsertType = z.infer<
  typeof HospitalizationsInsertSchema
>
export type HospitalizationsSelectType = z.infer<
  typeof HospitalizationsSelectSchema
>

// Ongoing Treatments
export const OngoingTreatmentsInsertSchema =
  createInsertSchema(ongoingTreatments)
export const OngoingTreatmentsSelectSchema =
  createSelectSchema(ongoingTreatments)
export type OngoingTreatmentsInsertType = z.infer<
  typeof OngoingTreatmentsInsertSchema
>
export type OngoingTreatmentsSelectType = z.infer<
  typeof OngoingTreatmentsSelectSchema
>

// Disabilities
export const DisabilitiesInsertSchema = createInsertSchema(disabilities)
export const DisabilitiesSelectSchema = createSelectSchema(disabilities)
export type DisabilitiesInsertType = z.infer<typeof DisabilitiesInsertSchema>
export type DisabilitiesSelectType = z.infer<typeof DisabilitiesSelectSchema>

// Allergies
export const AllergiesInsertSchema = createInsertSchema(allergies)
export const AllergiesSelectSchema = createSelectSchema(allergies)
export type AllergiesInsertType = z.infer<typeof AllergiesInsertSchema>
export type AllergiesSelectType = z.infer<typeof AllergiesSelectSchema>

// Medications
export const MedicationsInsertSchema = createInsertSchema(medications)
export const MedicationsSelectSchema = createSelectSchema(medications)
export type MedicationsInsertType = z.infer<typeof MedicationsInsertSchema>
export type MedicationsSelectType = z.infer<typeof MedicationsSelectSchema>

// Family Medical History
export const FamilyMedicalHistoryInsertSchema =
  createInsertSchema(familyMedicalHistory)
export const FamilyMedicalHistorySelectSchema =
  createSelectSchema(familyMedicalHistory)
export type FamilyMedicalHistoryInsertType = z.infer<
  typeof FamilyMedicalHistoryInsertSchema
>
export type FamilyMedicalHistorySelectType = z.infer<
  typeof FamilyMedicalHistorySelectSchema
>

// Lifestyle Info
export const LifestyleInfoInsertSchema = createInsertSchema(lifestyleInfo)
export const LifestyleInfoSelectSchema = createSelectSchema(lifestyleInfo)
export type LifestyleInfoInsertType = z.infer<typeof LifestyleInfoInsertSchema>
export type LifestyleInfoSelectType = z.infer<typeof LifestyleInfoSelectSchema>

// Immunizations
export const ImmunizationsInsertSchema = createInsertSchema(immunizations)
export const ImmunizationsSelectSchema = createSelectSchema(immunizations)
export type ImmunizationsInsertType = z.infer<typeof ImmunizationsInsertSchema>
export type ImmunizationsSelectType = z.infer<typeof ImmunizationsSelectSchema>

// Reproductive Health
export const ReproductiveHealthInsertSchema =
  createInsertSchema(reproductiveHealth)
export const ReproductiveHealthSelectSchema =
  createSelectSchema(reproductiveHealth)
export type ReproductiveHealthInsertType = z.infer<
  typeof ReproductiveHealthInsertSchema
>
export type ReproductiveHealthSelectType = z.infer<
  typeof ReproductiveHealthSelectSchema
>

// Mental Health Info
export const MentalHealthInfoInsertSchema = createInsertSchema(mentalHealthInfo)
export const MentalHealthInfoSelectSchema = createSelectSchema(mentalHealthInfo)
export type MentalHealthInfoInsertType = z.infer<
  typeof MentalHealthInfoInsertSchema
>
export type MentalHealthInfoSelectType = z.infer<
  typeof MentalHealthInfoSelectSchema
>
