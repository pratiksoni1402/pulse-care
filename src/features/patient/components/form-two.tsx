'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'

import {
  PatientVitalsInsertSchema,
  MedicalConditionsInsertSchema,
} from './schema'

// ── Patient Vitals ──────────────────────────────────────────
const vitalsFormSchema = PatientVitalsInsertSchema.omit({
  id: true,
  patientId: true,
  bmi: true,
  recordedAt: true,
  updatedAt: true,
})

type VitalsFormType = z.infer<typeof vitalsFormSchema>

// ── Medical Conditions ──────────────────────────────────────
const conditionsFormSchema = MedicalConditionsInsertSchema.omit({
  id: true,
  patientId: true,
  createdAt: true,
  updatedAt: true,
})

type ConditionsFormType = z.infer<typeof conditionsFormSchema>

export default function PatientVitalsAndConditions() {
  // ── Vitals form ───────────────────────────────────────────
  const vitalsForm = useForm<VitalsFormType>({
    resolver: zodResolver(vitalsFormSchema),
    defaultValues: {
      heightCm: '',
      weightKg: '',
      systolicBp: 0,
      diastolicBp: 0,
      restingHeartRate: 0,
      bodyTemperatureC: '',
    },
  })

  // ── Conditions form ───────────────────────────────────────
  const conditionsForm = useForm<ConditionsFormType>({
    resolver: zodResolver(conditionsFormSchema),
    defaultValues: {
      conditionName: '',
      status: 'active',
      notes: '',
    },
  })

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* ── Patient Vitals Section ─────────────────────────── */}
      <section aria-labelledby="vitals-heading">
        <div className="mb-5">
          <h3
            id="vitals-heading"
            className="text-lg font-semibold text-foreground"
          >
            Patient Vitals
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Enter the patient&apos;s current vital signs and body measurements.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="heightCm"
              control={vitalsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      step="0.01"
                      placeholder="170.50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="weightKg"
              control={vitalsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      step="0.01"
                      placeholder="70.00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Blood Pressure */}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="systolicBp"
              control={vitalsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Systolic BP (mmHg)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      placeholder="120"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : ''
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="diastolicBp"
              control={vitalsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diastolic BP (mmHg)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      placeholder="80"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : ''
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Heart Rate & Temperature */}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="restingHeartRate"
              control={vitalsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resting Heart Rate (bpm)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      placeholder="72"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : ''
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="bodyTemperatureC"
              control={vitalsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body Temperature (°C)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      step="0.1"
                      placeholder="36.6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────── */}
      <hr className="border-border" />

      {/* ── Medical Conditions Section ─────────────────────── */}
      <section aria-labelledby="conditions-heading">
        <div className="mb-5">
          <h3
            id="conditions-heading"
            className="text-lg font-semibold text-foreground"
          >
            Medical Conditions
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record any existing or past medical conditions the patient has been
            diagnosed with.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <FormField
            name="conditionName"
            control={conditionsForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="e.g. Type 2 Diabetes, Hypertension"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="diagnosedDate"
              control={conditionsForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Diagnosed Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(date ?? undefined)
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="status"
              control={conditionsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? 'active'}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="managed">Managed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="notes"
            control={conditionsForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Additional notes about the condition, treatment plan, or observations..."
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>
    </div>
  )
}
