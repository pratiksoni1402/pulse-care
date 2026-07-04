import {
  Navbar,
  Hero,
  TrustBar,
  Features,
  AICapability,
  Testimonials,
  Security,
  FinalCTA,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <AICapability />
        <Testimonials />
        <Security />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
