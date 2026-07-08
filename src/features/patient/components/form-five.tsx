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
import { Switch } from '@/components/ui/switch'
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
  MedicationsInsertSchema,
  FamilyMedicalHistoryInsertSchema,
  LifestyleInfoInsertSchema,
} from './schema'

// ── Medications ─────────────────────────────────────────────
const medicationsFormSchema = MedicationsInsertSchema.omit({
  id: true,
  patientId: true,
  createdAt: true,
})

type MedicationsFormType = z.infer<typeof medicationsFormSchema>

// ── Family Medical History ──────────────────────────────────
const familyHistoryFormSchema = FamilyMedicalHistoryInsertSchema.omit({
  id: true,
  patientId: true,
  createdAt: true,
})

type FamilyHistoryFormType = z.infer<typeof familyHistoryFormSchema>

// ── Lifestyle Info ──────────────────────────────────────────
const lifestyleFormSchema = LifestyleInfoInsertSchema.omit({
  id: true,
  patientId: true,
  createdAt: true,
  updatedAt: true,
})

type LifestyleFormType = z.infer<typeof lifestyleFormSchema>

export default function OngoingMedicationsFamilyAndLifestyle() {
  // ── Medications form ──────────────────────────────────────
  const medicationsForm = useForm<MedicationsFormType>({
    resolver: zodResolver(medicationsFormSchema),
    defaultValues: {
      medicineName: '',
      dosage: '',
      frequency: '',
      prescribingDoctor: '',
      startDate: undefined,
      isOngoing: true,
      endDate: undefined,
      purpose: '',
      notes: '',
    },
  })

  // ── Family Medical History form ───────────────────────────
  const familyHistoryForm = useForm<FamilyHistoryFormType>({
    resolver: zodResolver(familyHistoryFormSchema),
    defaultValues: {
      relation: 'father',
      conditionName: '',
      ageAtDiagnosis: undefined,
      notes: '',
    },
  })

  // ── Lifestyle Info form ───────────────────────────────────
  const lifestyleForm = useForm<LifestyleFormType>({
    resolver: zodResolver(lifestyleFormSchema),
    defaultValues: {
      smokingStatus: 'never',
      smokingFrequency: '',
      alcoholConsumption: 'never',
      exerciseFrequency: undefined,
      dietType: undefined,
      dietaryRestrictions: '',
      averageSleepHours: undefined,
      sleepNotes: '',
    },
  })

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* ── Medications Section ──────────────────────────────── */}
      <section aria-labelledby="medications-heading">
        <div className="mb-5">
          <h3
            id="medications-heading"
            className="text-lg font-semibold text-foreground"
          >
            Medications
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record current and past medications for the patient.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <FormField
            name="medicineName"
            control={medicationsForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medicine Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="e.g. Lisinopril, Metformin"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="dosage"
              control={medicationsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosage</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. 10mg, 500mg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="frequency"
              control={medicationsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. Once daily, Twice daily"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="prescribingDoctor"
              control={medicationsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prescribing Doctor</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. Dr. House"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="purpose"
              control={medicationsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. Blood Pressure, Diabetes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="startDate"
              control={medicationsForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
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
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) =>
                          field.onChange(
                            date ? format(date, 'yyyy-MM-dd') : undefined
                          )
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
              name="endDate"
              control={medicationsForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
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
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) =>
                          field.onChange(
                            date ? format(date, 'yyyy-MM-dd') : undefined
                          )
                        }
                        disabled={(date) => date < new Date('1900-01-01')}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="isOngoing"
            control={medicationsForm.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-md border border-input-border bg-input/30 p-4">
                <div className="space-y-0.5">
                  <FormLabel>Ongoing Medication</FormLabel>
                  <p className="text-[0.8rem] text-muted-foreground">
                    Is the patient currently taking this medication?
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="notes"
            control={medicationsForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Additional details about the medication..."
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────── */}
      <hr className="border-border" />

      {/* ── Family Medical History Section ────────────────────── */}
      <section aria-labelledby="family-history-heading">
        <div className="mb-5">
          <h3
            id="family-history-heading"
            className="text-lg font-semibold text-foreground"
          >
            Family Medical History
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record medical conditions of the patient&apos;s family members.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="relation"
              control={familyHistoryForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relation</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select relation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="brother">Brother</SelectItem>
                      <SelectItem value="sister">Sister</SelectItem>
                      <SelectItem value="son">Son</SelectItem>
                      <SelectItem value="daughter">Daughter</SelectItem>
                      <SelectItem value="grandfather">Grandfather</SelectItem>
                      <SelectItem value="grandmother">Grandmother</SelectItem>
                      <SelectItem value="uncle">Uncle</SelectItem>
                      <SelectItem value="aunt">Aunt</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="ageAtDiagnosis"
              control={familyHistoryForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age at Diagnosis</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      placeholder="e.g. 50"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="conditionName"
            control={familyHistoryForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="e.g. Heart Disease, Diabetes"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="notes"
            control={familyHistoryForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Additional details about the family medical history..."
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────── */}
      <hr className="border-border" />

      {/* ── Lifestyle Info Section ───────────────────────────── */}
      <section aria-labelledby="lifestyle-heading">
        <div className="mb-5">
          <h3
            id="lifestyle-heading"
            className="text-lg font-semibold text-foreground"
          >
            Lifestyle Info
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record the patient&apos;s lifestyle habits including smoking, alcohol, exercise, and diet.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Smoking Status & Frequency */}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="smokingStatus"
              control={lifestyleForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Smoking Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select smoking status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="former">Former</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="smokingFrequency"
              control={lifestyleForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Smoking Frequency</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. 1 pack a day"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Alcohol & Exercise */}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="alcoholConsumption"
              control={lifestyleForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alcohol Consumption</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="exerciseFrequency"
              control={lifestyleForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Frequency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="1_2_times_week">1-2 times a week</SelectItem>
                      <SelectItem value="3_5_times_week">3-5 times a week</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Diet Type & Restrictions */}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="dietType"
              control={lifestyleForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diet Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select diet type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="non_vegetarian">Non-Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="eggetarian">Eggetarian</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="dietaryRestrictions"
              control={lifestyleForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dietary Restrictions</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. Gluten-free, Lactose intolerant"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Sleep */}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="averageSleepHours"
              control={lifestyleForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Sleep Hours</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      placeholder="e.g. 7"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="sleepNotes"
              control={lifestyleForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sleep Notes</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. Insomnia, Sleep Apnea"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
