import { Check } from "lucide-react"

interface CheckoutProgressProps {
  currentStep: number
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const steps = [
    { number: 1, title: "Payment Method" },
    { number: 2, title: "Billing Address" },
    { number: 3, title: "Confirm & Pay" },
  ]

  return (
    <div>
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center flex-1">
            <div
              className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold ${
                step.number < currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : step.number === currentStep
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-muted border-muted-foreground text-muted-foreground"
              }`}
            >
              {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
            </div>
            <p
              className={`ml-3 text-sm font-medium ${
                step.number <= currentStep ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.title}
            </p>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 rounded-full ${step.number < currentStep ? "bg-primary" : "bg-muted"}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
