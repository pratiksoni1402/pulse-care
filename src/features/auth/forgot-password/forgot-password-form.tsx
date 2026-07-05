'use client'

import * as React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon, CheckCircle2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from './forgot-password-schema'

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: ForgotPasswordInput) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          redirectTo: '/auth/reset-password',
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        toast.error(body?.message || 'Failed to send reset link')
        return
      }

      setIsSubmitted(true)
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Inline confirmation state after successful submission
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center space-y-4 py-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2Icon className="size-6" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-heading text-lg font-semibold text-foreground">
            Check your inbox
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            We&apos;ve sent a password reset link to{' '}
            <span className="font-medium text-foreground">
              {form.getValues('email')}
            </span>
            . It may take a minute to arrive.
          </p>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="username"
                  required
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2 font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner className="size-4 mr-2 animate-spin" />
              Sending link...
            </>
          ) : (
            <>
              <MailIcon className="size-4 mr-2" />
              Send Reset Link
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
