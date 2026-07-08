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
  OngoingTreatmentsInsertSchema,
  DisabilitiesInsertSchema,
  AllergiesInsertSchema,
} from './schema'

// ── Ongoing Treatments ──────────────────────────────────────
const ongoingTreatmentsFormSchema = OngoingTreatmentsInsertSchema.omit({
  id: true,
  patientId: true,
})

type OngoingTreatmentsFormType = z.infer<typeof ongoingTreatmentsFormSchema>

// ── Disabilities ───────────────────────────────────────────
const disabilitiesFormSchema = DisabilitiesInsertSchema.omit({
  id: true,
  patientId: true,
})

type DisabilitiesFormType = z.infer<typeof disabilitiesFormSchema>

// ── Allergies ──────────────────────────────────────────────
const allergiesFormSchema = AllergiesInsertSchema.omit({
  id: true,
  patientId: true,
  createdAt: true,
})

type AllergiesFormType = z.infer<typeof allergiesFormSchema>

export default function OngoingTreatmentsDisabilitiesAndAllergies() {
  // ── Ongoing Treatments form ───────────────────────────────
  const ongoingTreatmentsForm = useForm<OngoingTreatmentsFormType>({
    resolver: zodResolver(ongoingTreatmentsFormSchema),
    defaultValues: {
      treatmentName: '',
      startDate: undefined,
      expectedEndDate: undefined,
      physician: '',
      notes: '',
    },
  })

  // ── Disabilities form ─────────────────────────────────────
  const disabilitiesForm = useForm<DisabilitiesFormType>({
    resolver: zodResolver(disabilitiesFormSchema),
    defaultValues: {
      disabilityName: '',
      severity: undefined,
      notes: '',
    },
  })

  // ── Allergies form ────────────────────────────────────────
  const allergiesForm = useForm<AllergiesFormType>({
    resolver: zodResolver(allergiesFormSchema),
    defaultValues: {
      type: 'drug',
      allergen: '',
      severity: 'mild',
      reaction: '',
      diagnosedAt: undefined,
      notes: '',
    },
  })

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* ── Ongoing Treatments Section ───────────────────────── */}
      <section aria-labelledby="ongoing-treatments-heading">
        <div className="mb-5">
          <h3
            id="ongoing-treatments-heading"
            className="text-lg font-semibold text-foreground"
          >
            Ongoing Treatments
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record current medical treatments the patient is receiving.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <FormField
            name="treatmentName"
            control={ongoingTreatmentsForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Treatment Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="e.g. Physical Therapy, Chemotherapy"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="startDate"
              control={ongoingTreatmentsForm.control}
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
              name="expectedEndDate"
              control={ongoingTreatmentsForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expected End Date</FormLabel>
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
            name="physician"
            control={ongoingTreatmentsForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physician</FormLabel>
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
            name="notes"
            control={ongoingTreatmentsForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Additional details about the treatment..."
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

      {/* ── Disabilities Section ───────────────────────────── */}
      <section aria-labelledby="disabilities-heading">
        <div className="mb-5">
          <h3
            id="disabilities-heading"
            className="text-lg font-semibold text-foreground"
          >
            Disabilities
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record any physical or mental disabilities of the patient.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <FormField
            name="disabilityName"
            control={disabilitiesForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disability Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="e.g. Visual Impairment, Hearing Loss"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="severity"
            control={disabilitiesForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Severity</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? ''}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="notes"
            control={disabilitiesForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Additional details about the disability and accommodations needed..."
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

      {/* ── Allergies Section ──────────────────────────────── */}
      <section aria-labelledby="allergies-heading">
        <div className="mb-5">
          <h3
            id="allergies-heading"
            className="text-lg font-semibold text-foreground"
          >
            Allergies
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record any allergies to medications, food, or environmental factors.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="type"
              control={allergiesForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergy Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="drug">Drug</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="allergen"
              control={allergiesForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergen</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. Penicillin, Peanuts, Pollen"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="severity"
              control={allergiesForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Severity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mild">Mild</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                      <SelectItem value="anaphylactic">Anaphylactic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="diagnosedAt"
              control={allergiesForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Diagnosed At</FormLabel>
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
          </div>

          <FormField
            name="reaction"
            control={allergiesForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reaction</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Describe the allergic reaction..."
                    rows={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="notes"
            control={allergiesForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Any additional notes..."
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
