import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Trust } from "@/components/trust"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Trust />
      <Pricing />
      <CTA />
      <Footer />
    </>
  )
}
