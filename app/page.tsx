import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Logos } from "@/components/logo"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Pricing } from "@/components/pricing"
import { Trust } from "@/components/trust"
import { HowItWorks } from "@/components/how-it-works";
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Logos />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Trust />
      <Pricing />
      <CTA />
      <Footer />
    </>
  )
}
