import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for new businesses",
      price: "$10",
      period: "/month",
      features: [
        "Up to 1,000 transactions/month",
        "2.9% + $0.30 per transaction",
        "Basic dashboard and analytics",
        "Email support",
        "Single API key",
        "Manual payouts",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Business",
      description: "For growing companies",
      price: "$30",
      period: "/month",
      features: [
        "Up to 100,000 transactions/month",
        "2.4% + $0.25 per transaction",
        "Advanced analytics and reporting",
        "Priority email & chat support",
        "Unlimited API keys",
        "Automatic daily payouts",
        "Webhook support",
        "Custom branding",
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "For large operations",
      price: "Custom",
      period: "pricing",
      features: [
        "Unlimited transactions",
        "Custom pricing",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "Advanced fraud prevention",
        "White-label solution",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 md:py-32 border-t border-border">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Choose the plan that fits your business. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl border transition-all ${
                plan.highlighted
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20 md:scale-105"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 text-primary-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </div>

                <Button className="w-full mb-8" variant={plan.highlighted ? "default" : "outline"}>
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
