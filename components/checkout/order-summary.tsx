import { Card } from "@/components/ui/card"

export function OrderSummary() {
  const items = [
    { name: "Premium Plan Annual", price: "$999" },
    { name: "Setup Fee", price: "$50" },
  ]

  return (
    <div className="sticky top-8 space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-medium">{item.price}</span>
            </div>
          ))}

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$1,049</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>$84</span>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">$1,133</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
        <p className="text-xs text-green-700 dark:text-green-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Payment is secure and encrypted
        </p>
      </Card>
    </div>
  )
}
