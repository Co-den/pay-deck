"use client"

import { useState } from "react"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { CheckoutProgress } from "@/components/checkout/checkout-progress"
import { SecurityBadges } from "@/components/checkout/security-badges"

export default function Checkout() {
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <div className="container py-8">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {/* Main checkout area */}
          <div className="flex-1">
            <CheckoutProgress currentStep={step} />

            <div className="mt-8 bg-card rounded-xl border border-border p-8">
              <CheckoutForm onStepChange={setStep} currentStep={step} />
            </div>

            <SecurityBadges />
          </div>

          {/* Order summary sidebar */}
          <div className="md:w-96">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  )
}
