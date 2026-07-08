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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'

import {
  SurgicalHistoryInsertSchema,
  HospitalizationsInsertSchema,
} from './schema'

// ── Surgical History ────────────────────────────────────────
const surgicalFormSchema = SurgicalHistoryInsertSchema.omit({
  id: true,
  patientId: true,
})

type SurgicalFormType = z.infer<typeof surgicalFormSchema>

// ── Hospitalizations ────────────────────────────────────────
const hospitalizationFormSchema = HospitalizationsInsertSchema.omit({
  id: true,
  patientId: true,
})

type HospitalizationFormType = z.infer<typeof hospitalizationFormSchema>

export default function SurgicalHistoryAndHospitalizations() {
  // ── Surgical History form ─────────────────────────────────
  const surgicalForm = useForm<SurgicalFormType>({
    resolver: zodResolver(surgicalFormSchema),
    defaultValues: {
      surgeryName: '',
      surgeryDate: undefined,
      hospitalName: '',
      surgeonName: '',
      notes: '',
    },
  })

  // ── Hospitalizations form ─────────────────────────────────
  const hospitalizationForm = useForm<HospitalizationFormType>({
    resolver: zodResolver(hospitalizationFormSchema),
    defaultValues: {
      hospitalName: '',
      admissionDate: undefined,
      dischargeDate: undefined,
      reason: '',
      notes: '',
    },
  })

  return (
    <div className="grid grid-cols-1 gap-8">
      {/* ── Surgical History Section ───────────────────────── */}
      <section aria-labelledby="surgical-history-heading">
        <div className="mb-5">
          <h3
            id="surgical-history-heading"
            className="text-lg font-semibold text-foreground"
          >
            Surgical History
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record any past surgical procedures the patient has undergone.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Surgery Name */}
          <FormField
            name="surgeryName"
            control={surgicalForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surgery Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="e.g. Appendectomy, Knee Replacement"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Surgery Date & Hospital Name */}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="surgeryDate"
              control={surgicalForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Surgery Date</FormLabel>
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
              name="hospitalName"
              control={surgicalForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder="e.g. City General Hospital"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Surgeon Name */}
          <FormField
            name="surgeonName"
            control={surgicalForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surgeon Name</FormLabel>
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

          {/* Notes */}
          <FormField
            name="notes"
            control={surgicalForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Any additional details about the surgery, recovery, or complications..."
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

      {/* ── Hospitalizations Section ───────────────────────── */}
      <section aria-labelledby="hospitalizations-heading">
        <div className="mb-5">
          <h3
            id="hospitalizations-heading"
            className="text-lg font-semibold text-foreground"
          >
            Hospitalizations
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Record any past hospital admissions including the reason and duration
            of stay.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {/* Hospital Name */}
          <FormField
            name="hospitalName"
            control={hospitalizationForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hospital Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="e.g. City General Hospital"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Admission Date & Discharge Date */}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              name="admissionDate"
              control={hospitalizationForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Admission Date</FormLabel>
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
              name="dischargeDate"
              control={hospitalizationForm.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Discharge Date</FormLabel>
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
          </div>

          {/* Reason */}
          <FormField
            name="reason"
            control={hospitalizationForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Hospitalization</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="e.g. Pneumonia, Cardiac Monitoring"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Notes */}
          <FormField
            name="notes"
            control={hospitalizationForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Any additional details about the hospitalization, treatment received, or outcomes..."
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
