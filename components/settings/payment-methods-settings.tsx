"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Building2, ToggleLeft as Toggle } from "lucide-react"

export function PaymentMethodsSettings() {
  const paymentMethods = [
    {
      name: "Credit & Debit Cards",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
      enabled: true,
    },
    {
      name: "Digital Wallets",
      description: "Apple Pay, Google Pay, PayPal",
      icon: Smartphone,
      enabled: true,
    },
    {
      name: "Bank Transfers",
      description: "Direct bank transfer, ACH",
      icon: Building2,
      enabled: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Payment Methods</h2>
        <p className="text-muted-foreground">Enable or disable payment methods for your customers.</p>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon
          return (
            <Card key={method.name} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={method.enabled ? "default" : "secondary"}>
                    {method.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                  <Button variant="ghost" size="icon" className="bg-transparent">
                    <Toggle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6 border-primary/20 bg-primary/5">
        <h3 className="font-semibold mb-3">Add More Payment Methods</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Contact our sales team to enable additional payment methods.
        </p>
        <Button variant="outline" className="bg-transparent">
          Contact Sales
        </Button>
      </Card>
    </div>
  )
}
