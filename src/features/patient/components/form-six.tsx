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
  ImmunizationsInsertSchema,
  ReproductiveHealthInsertSchema,
  MentalHealthInfoInsertSchema,
} from './schema'

// ── Immunizations ───────────────────────────────────────────
const immunizationsFormSchema = ImmunizationsInsertSchema.omit({
  id: true,
  patientId: true,
  createdAt: true,
})

type ImmunizationsFormType = z.infer<typeof immunizationsFormSchema>

// ── Reproductive Health ─────────────────────────────────────
const reproductiveHealthFormSchema = ReproductiveHealthInsertSchema.omit({
  id: true,
  patientId: true,
  createdAt: true,
  updatedAt: true,
})

type ReproductiveHealthFormType = z.infer<typeof reproductiveHealthFormSchema>

// ── Mental Health Info ──────────────────────────────────────
const mentalHealthFormSchema = MentalHealthInfoInsertSchema.omit({
  id: true,
  patientId: true,
  createdAt: true,
  updatedAt: true,
})

type MentalHealthFormType = z.infer<typeof mentalHealthFormSchema>

export default function ImmunizationsReproductiveAndMentalHealth() {
  // ── Immunizations form ────────────────────────────────────
  const immunizationsForm = useForm<ImmunizationsFormType>({
    resolver: zodResolver(immunizationsFormSchema),
    defaultValues: {
      vaccineName: '',
      administeredDate: undefined,
      nextDueDate: undefined,
      doseNumber: undefined,
      healthcareProvider: '',
      facilityName: '',
      lotNumber: '',
      isBooster: false,
      notes: '',
    },
  })

  // ── Reproductive Health form ──────────────────────────────
  const reproductiveHealthForm = useForm<ReproductiveHealthFormType>({
    resolver: zodResolver(reproductiveHealthFormSchema),
    defaultValues: {
      pregnancyStatus: 'not_applicable',
      expectedDeliveryDate: undefined,
      lastMenstrualPeriod: undefined,
      menstrualCycleLength: undefined,
      menstrualNotes: '',
    },
  })

  // ── Mental Health Info form ───────────────────────────────
  const mentalHealthForm = useForm<MentalHealthFormType>({
    resolver: zodResolver(mentalHealthFormSchema),
    defaultValues: {
      diagnosis: '',
      receivingTherapy: false,
      therapistName: '',
      counselingFrequency: '',
      medications: '',
      notes: '',
    },
  })

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* ── Immunizations Section ────────────────────────────── */}
      <section aria-labelledby="immunizations-heading">
        <div className="mb-5">
          <h3
            id="immunizations-heading"
            className="text-lg font-semibold text-foreground"
          >
            Immunizations
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record the patient&apos;s vaccination history.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="vaccineName"
              control={immunizationsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vaccine Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. COVID-19, Flu"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="doseNumber"
              control={immunizationsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dose Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      placeholder="e.g. 1"
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

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="administeredDate"
              control={immunizationsForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Administered Date</FormLabel>
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
              name="nextDueDate"
              control={immunizationsForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Next Due Date</FormLabel>
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

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="healthcareProvider"
              control={immunizationsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Healthcare Provider</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. Dr. Smith"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="facilityName"
              control={immunizationsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facility Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. City Clinic"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="lotNumber"
              control={immunizationsForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lot Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. AB1234"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="isBooster"
              control={immunizationsForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border border-input-border bg-input/30 p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Booster Dose</FormLabel>
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
          </div>

          <FormField
            name="notes"
            control={immunizationsForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Additional details about the immunization..."
                    rows={2}
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

      {/* ── Reproductive Health Section ──────────────────────── */}
      <section aria-labelledby="reproductive-health-heading">
        <div className="mb-5">
          <h3
            id="reproductive-health-heading"
            className="text-lg font-semibold text-foreground"
          >
            Reproductive Health
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record reproductive health and pregnancy-related information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="pregnancyStatus"
              control={reproductiveHealthForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pregnancy Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="not_applicable">Not Applicable</SelectItem>
                      <SelectItem value="not_pregnant">Not Pregnant</SelectItem>
                      <SelectItem value="pregnant">Pregnant</SelectItem>
                      <SelectItem value="postpartum">Postpartum</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="expectedDeliveryDate"
              control={reproductiveHealthForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expected Delivery Date</FormLabel>
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

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="lastMenstrualPeriod"
              control={reproductiveHealthForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Last Menstrual Period</FormLabel>
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
              name="menstrualCycleLength"
              control={reproductiveHealthForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cycle Length (Days)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      type="number"
                      placeholder="e.g. 28"
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
            name="menstrualNotes"
            control={reproductiveHealthForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Additional notes..."
                    rows={2}
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

      {/* ── Mental Health Info Section ───────────────────────── */}
      <section aria-labelledby="mental-health-heading">
        <div className="mb-5">
          <h3
            id="mental-health-heading"
            className="text-lg font-semibold text-foreground"
          >
            Mental Health Info
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record mental health conditions, therapies, and medications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="diagnosis"
              control={mentalHealthForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. Depression, Anxiety"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="receivingTherapy"
              control={mentalHealthForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border border-input-border bg-input/30 p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Receiving Therapy</FormLabel>
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
          </div>

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="therapistName"
              control={mentalHealthForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Therapist Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. Dr. Jung"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="counselingFrequency"
              control={mentalHealthForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Counseling Frequency</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. Weekly, Bi-weekly"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="medications"
            control={mentalHealthForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medications</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Psychiatric medications..."
                    rows={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="notes"
            control={mentalHealthForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Additional details..."
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
