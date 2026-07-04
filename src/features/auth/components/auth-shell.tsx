"use client"

import * as React from "react"
import Link from "next/link"
import { motion, type Variants } from "motion/react"
import { LoginForm } from "../login/login-form"
import { RegisterForm } from "../register/register-form"
import { GoogleSignInButton } from "../oauth/google-signin-button"
import { AuthDivider } from "./auth-divider"

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
}

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
}

export function AuthShell() {
  return (
    <div className="min-h-screen w-full bg-muted flex flex-col items-center justify-center p-4 md:p-8 selection:bg-primary/20 selection:text-foreground">
      {/* Top Wordmark Linking Back to Home */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 md:mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl md:text-2xl font-heading font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          <span className="size-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm">
            P
          </span>
          <span>Pulse Care</span>
        </Link>
      </motion.div>

      {/* Main Two-Column Outer Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full bg-card border border-border rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border"
      >
        {/* Left Column: Login Module */}
        <motion.div
          variants={columnVariants}
          className="flex flex-col justify-center p-8 md:p-12 lg:p-14 bg-card"
        >
          <div className="space-y-2 mb-6">
            <h3 className="h3 text-foreground font-bold">Welcome back</h3>
            <p className="lead text-sm md:text-base">
              Sign in to access your AI symptom assessments, virtual consultations, and health monitoring.
            </p>
          </div>

          <div className="space-y-1">
            <GoogleSignInButton label="Sign in with Google" />
            <AuthDivider label="or continue with email" />
            <LoginForm />
          </div>
        </motion.div>

        {/* Right Column: Register Module */}
        <motion.div
          variants={columnVariants}
          className="flex flex-col justify-center p-8 md:p-12 lg:p-14 bg-card/50 dark:bg-card/30"
        >
          <div className="space-y-2 mb-6">
            <h3 className="h3 text-foreground font-bold">Create an account</h3>
            <p className="lead text-sm md:text-base">
              Join Pulse Care today for intelligent triage paired with real clinical care.
            </p>
          </div>

          <div className="space-y-1">
            <GoogleSignInButton label="Sign up with Google" />
            <AuthDivider label="or register with email" />
            <RegisterForm />
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Legal Subtext */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-6 text-center text-xs text-muted-foreground"
      >
        <p>
          Protected by Pulse Care clinical security. By signing in, you agree to our terms and privacy rules.
        </p>
      </motion.div>
    </div>
  )
}
