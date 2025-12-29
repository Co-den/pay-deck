import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-gradient-to-t from-accent/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Fast & Secure Payment Processing</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Accept payments with
            <span className="block text-primary">confidence and speed</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-balance">
            PayDeck makes it effortless to accept payments from anywhere in the world. Secure, reliable, and built for
            modern merchants.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary justify-center">
                <Lock className="w-4 h-4" />
                Bank-level Security
              </div>
              <p className="text-sm text-muted-foreground">PCI DSS compliant with end-to-end encryption</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-primary text-center">{"<"} 1 Second</div>
              <p className="text-sm text-muted-foreground">Processing time for transactions</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold text-primary text-center">25+ Methods</div>
              <p className="text-sm text-muted-foreground">Payment methods globally supported</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
