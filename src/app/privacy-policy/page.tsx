import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Pulse Care protects, stores, and handles your medical and clinical data with enterprise-grade security.",
}

export default function PrivacyPolicy() {
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
        <h1 className="h2 font-bold text-foreground">Privacy Policy</h1>
        <p className="lead">
          Your privacy and medical data security are fundamental to Pulse Care. This policy describes how we collect, use, and protect your information.
        </p>
        <div className="border-t border-border pt-6 space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
          <h2 className="h4 font-semibold text-foreground">1. Data Collection & Clinical Privacy</h2>
          <p>
            We collect information necessary to provide AI triage assessments, virtual consultations, and remote health monitoring. All personal health information (PHI) is encrypted in transit and at rest using clinical-grade security standards.
          </p>
          <h2 className="h4 font-semibold text-foreground">2. AI Assessment Processing</h2>
          <p>
            Our artificial intelligence triage systems process symptom data to assist clinical decision-making. Your medical assessments are reviewed by licensed clinicians where applicable and are never sold to third-party data brokers or advertisers.
          </p>
          <h2 className="h4 font-semibold text-foreground">3. Your Rights & Control</h2>
          <p>
            You retain full ownership and control over your health records. You may request full export or permanent deletion of your clinical history and personal data at any time through your account settings or by contacting privacy@pulsecare.com.
          </p>
        </div>
      </div>
    </div>
  )
}