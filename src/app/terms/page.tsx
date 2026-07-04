import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of Pulse Care AI healthcare triage and virtual clinical services.",
}

export default function TermsAndCondition() {
  return (
    <div className="min-h-screen w-full bg-muted py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-heading font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          <span className="size-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-sm">
            P
          </span>
          <span>Pulse Care</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm space-y-6">
        <h1 className="h2 font-bold text-foreground">Terms of Service</h1>
        <p className="lead">
          By accessing or using Pulse Care, you agree to be bound by these Terms of Service and our clinical care guidelines.
        </p>
        <div className="border-t border-border pt-6 space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
          <h2 className="h4 font-semibold text-foreground">1. Medical Disclaimer & Emergency Services</h2>
          <p>
            Pulse Care combines AI triage with real clinical care. However, our AI symptom checker is an informational tool and does not replace professional medical diagnosis. If you are experiencing a life-threatening medical emergency, immediately call your local emergency services (e.g., 911) or visit the nearest emergency room.
          </p>
          <h2 className="h4 font-semibold text-foreground">2. Virtual Consultations & Clinician Care</h2>
          <p>
            Virtual consultations conducted through Pulse Care connect you with licensed healthcare providers. The clinician is solely responsible for clinical diagnoses, prescriptions, and treatment plans provided during consultations.
          </p>
          <h2 className="h4 font-semibold text-foreground">3. Account Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete health information during triage and onboarding.
          </p>
        </div>
      </div>
    </div>
  )
}