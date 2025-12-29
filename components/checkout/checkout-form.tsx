"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Wallet, Building2, Apple, ArrowLeft } from "lucide-react"

interface CheckoutFormProps {
  onStepChange: (step: number) => void
  currentStep: number
}

export function CheckoutForm({ onStepChange, currentStep }: CheckoutFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cvv, setCvv] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatCardNumber = (value: string) => {
    const formatted = value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
    return formatted
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value.slice(0, 19)))
  }

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (selectedPaymentMethod === "card") {
        if (cardNumber.replace(/\s/g, "").length !== 16) {
          newErrors.cardNumber = "Card number must be 16 digits"
        }
        if (expiryMonth === "" || expiryYear === "") {
          newErrors.expiry = "Expiry date is required"
        }
        if (cvv.length !== 3 && cvv.length !== 4) {
          newErrors.cvv = "CVV must be 3 or 4 digits"
        }
      }
    } else if (step === 2) {
      // Billing address validation would go here
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      onStepChange(currentStep + 1)
    }
  }

  return (
    <div className="space-y-8">
      {/* Step 1: Payment Method */}
      {currentStep >= 1 && (
        <div className={currentStep === 1 ? "" : "opacity-50 pointer-events-none"}>
          <h2 className="text-lg font-semibold mb-6">Select Payment Method</h2>

          <div className="grid gap-4">
            {/* Credit/Debit Card */}
            <div
              onClick={() => setSelectedPaymentMethod("card")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPaymentMethod === "card"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Credit or Debit Card</p>
                  <p className="text-xs text-muted-foreground">Visa, Mastercard, American Express</p>
                </div>
              </div>
            </div>

            {/* Digital Wallets */}
            <div
              onClick={() => setSelectedPaymentMethod("wallet")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPaymentMethod === "wallet"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Digital Wallets</p>
                  <p className="text-xs text-muted-foreground">Apple Pay, Google Pay, PayPal</p>
                </div>
              </div>
            </div>

            {/* Bank Transfer */}
            <div
              onClick={() => setSelectedPaymentMethod("bank")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedPaymentMethod === "bank"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5" />
                <div>
                  <p className="font-semibold">Bank Transfer</p>
                  <p className="text-xs text-muted-foreground">Direct bank transfer, ACH</p>
                </div>
              </div>
            </div>
          </div>

          {selectedPaymentMethod === "card" && (
            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="card-number" className="mb-2 block">
                  Card Number
                </Label>
                <Input
                  id="card-number"
                  placeholder="4532 1234 5678 9010"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className={errors.cardNumber ? "border-destructive" : ""}
                  disabled={currentStep !== 1}
                />
                {errors.cardNumber && <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="month" className="mb-2 block text-sm">
                    Month
                  </Label>
                  <select
                    id="month"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm disabled:opacity-50"
                    disabled={currentStep !== 1}
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="year" className="mb-2 block text-sm">
                    Year
                  </Label>
                  <select
                    id="year"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm disabled:opacity-50"
                    disabled={currentStep !== 1}
                  >
                    <option value="">YY</option>
                    {Array.from({ length: 20 }, (_, i) => {
                      const year = new Date().getFullYear() + i
                      return (
                        <option key={year} value={String(year).slice(-2)}>
                          {String(year).slice(-2)}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div>
                  <Label htmlFor="cvv" className="mb-2 block text-sm">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={handleCVVChange}
                    maxLength={4}
                    className={`text-center ${errors.cvv ? "border-destructive" : ""}`}
                    disabled={currentStep !== 1}
                  />
                </div>
              </div>
              {errors.cvv && <p className="text-xs text-destructive">{errors.cvv}</p>}
            </div>
          )}

          {selectedPaymentMethod === "wallet" && (
            <div className="mt-6 space-y-3">
              <Button variant="outline" className="w-full justify-center gap-2 disabled:opacity-50 bg-transparent">
                <Apple className="w-4 h-4" />
                Apple Pay
              </Button>
              <Button variant="outline" className="w-full justify-center gap-2 disabled:opacity-50 bg-transparent">
                <Wallet className="w-4 h-4" />
                Google Pay
              </Button>
              <Button variant="outline" className="w-full justify-center gap-2 disabled:opacity-50 bg-transparent">
                <Wallet className="w-4 h-4" />
                PayPal
              </Button>
            </div>
          )}

          {selectedPaymentMethod === "bank" && (
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground">
                You'll be redirected to your bank to complete the transaction securely.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Billing Address */}
      {currentStep >= 2 && (
        <div className={currentStep === 2 ? "" : "opacity-50 pointer-events-none"}>
          <h2 className="text-lg font-semibold mb-6">Billing Address</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-2 block">
                Full Name
              </Label>
              <Input id="name" placeholder="John Doe" disabled={currentStep !== 2} />
            </div>

            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email Address
              </Label>
              <Input id="email" type="email" placeholder="john@example.com" disabled={currentStep !== 2} />
            </div>

            <div>
              <Label htmlFor="address" className="mb-2 block">
                Address
              </Label>
              <Input id="address" placeholder="123 Main Street" disabled={currentStep !== 2} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="mb-2 block">
                  City
                </Label>
                <Input id="city" placeholder="New York" disabled={currentStep !== 2} />
              </div>
              <div>
                <Label htmlFor="zip" className="mb-2 block">
                  ZIP Code
                </Label>
                <Input id="zip" placeholder="10001" disabled={currentStep !== 2} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Confirm & Pay */}
      {currentStep >= 3 && (
        <div className={currentStep === 3 ? "" : "opacity-50 pointer-events-none"}>
          <h2 className="text-lg font-semibold mb-6">Confirm & Pay</h2>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Card ending in</span>
              <span className="font-medium">4321</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Billing address</span>
              <span className="font-medium">On file</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center gap-3 pt-6 border-t border-border">
        {currentStep > 1 && (
          <Button variant="outline" className="gap-2 bg-transparent" onClick={() => onStepChange(currentStep - 1)}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
        {currentStep < 3 && (
          <Button className="ml-auto" onClick={handleNext}>
            Continue
          </Button>
        )}
        {currentStep === 3 && (
          <Button className="ml-auto bg-green-600 hover:bg-green-700 text-white">Complete Payment</Button>
        )}
      </div>
    </div>
  )
}
