import { patients } from '@/db/schema/patients'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import z from 'zod'

export const PatientDetailInsertSchema = createInsertSchema(patients)
export const PatientDetailSelectSchema = createSelectSchema(patients)
export type PatientInsertType = z.infer<typeof PatientDetailInsertSchema>
