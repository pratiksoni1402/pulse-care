'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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

import { PatientDetailInsertSchema } from './schema'

const formSchema = PatientDetailInsertSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

type FormType = z.infer<typeof formSchema>

export default function PersonalVitalDetail() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      emergencyContactName: '',
      emergencyContactRelation: '',
      emergencyContactPhone: '',
      preferredLanguage: 'English',
      bloodGroup: 'unknown',
      maritalStatus: 'prefer_not_to_say',
    },
  })

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* ── Section Heading ────────────────────────────────── */}
      <div className="mb-1">
        <h3 className="text-lg font-semibold text-foreground">
          Personal Details
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Enter the patient&apos;s personal information, contact details, and
          emergency contacts.
        </p>
      </div>

      <FormField
        name="fullName"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder="Full Name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-5">
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? ''}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="dateOfBirth"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
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
                      field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
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

      <div className="grid grid-cols-2 gap-5">
        <FormField
          name="bloodGroup"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? ''}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="maritalStatus"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marital Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ?? ''}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                  <SelectItem value="separated">Separated</SelectItem>
                  <SelectItem value="prefer_not_to_say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        name="phone"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder="+1234567890"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="email"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                type="email"
                placeholder="john@example.com"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="address"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder="123 Main St"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="emergencyContactName"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Contact Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder="Jane Doe"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="emergencyContactRelation"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Contact Relation</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder="Spouse"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="emergencyContactPhone"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Contact Phone</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder="+1234567890"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name="preferredLanguage"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Language</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder="English"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
