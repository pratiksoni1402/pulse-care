'use client'

import * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LoginForm } from '../login/login-form'
import { RegisterForm } from '../register/register-form'
import { ForgotPasswordForm } from '../forgot-password/forgot-password-form'
import { GoogleSignInButton } from '../oauth/google-signin-button'
import { AuthDivider } from './auth-divider'
import { AuthToggleLink } from './auth-toggle-link'
import type { AuthMode } from './auth-shell'

interface AuthFormPanelProps {
  mode: AuthMode
  setMode: (mode: AuthMode) => void
}

export function AuthFormPanel({ mode, setMode }: AuthFormPanelProps) {
  const prefersReducedMotion = useReducedMotion()

  // Non-directional fade + slight upward slide per plan Section 5
  const slideY = prefersReducedMotion ? 0 : 8

  return (
    <div className="flex flex-col lg:justify-center justify-start min-h-screen w-full lg:max-w-sm max-w-lg mx-auto px-6 py-10 md:px-8 lg:px-0">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: slideY }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -slideY }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {mode === 'login' && (
            <div className="space-y-1">
              <div className="space-y-2 mb-6">
                <h3 className="font-heading text-xl font-bold tracking-tight md:text-2xl text-foreground">
                  Welcome back
                </h3>
                <p className="lead text-sm">
                  Sign in to your account to continue.
                </p>
              </div>

              <GoogleSignInButton label="Sign in with Google" />
              <AuthDivider label="or continue with email" />
              <LoginForm
                onForgotPasswordClick={() => setMode('forgot-password')}
              />
              <div className="mt-6">
                <AuthToggleLink
                  prompt="Don't have an account?"
                  action="Create Account"
                  onClick={() => setMode('register')}
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-1">
              <div className="space-y-2 mb-6">
                <h3 className="font-heading text-xl font-bold tracking-tight md:text-2xl text-foreground">
                  Create an account
                </h3>
                <p className="lead text-sm">
                  Join Pulse Care for intelligent triage and real clinical care.
                </p>
              </div>

              <GoogleSignInButton label="Sign up with Google" />
              <AuthDivider label="or register with email" />
              <RegisterForm />
              <div className="mt-6">
                <AuthToggleLink
                  prompt="Already have an account?"
                  action="Login"
                  onClick={() => setMode('login')}
                />
              </div>
            </div>
          )}

          {mode === 'forgot-password' && (
            <div className="space-y-1">
              <div className="space-y-2 mb-6">
                <h3 className="font-heading text-xl font-bold tracking-tight md:text-2xl text-foreground">
                  Reset your password
                </h3>
                <p className="lead text-sm">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <ForgotPasswordForm />
              <div className="mt-6 space-y-2">
                <AuthToggleLink
                  action="Back to Login"
                  onClick={() => setMode('login')}
                />
                <AuthToggleLink
                  prompt="Create Account?"
                  action="Register Here"
                  onClick={() => setMode('register')}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
