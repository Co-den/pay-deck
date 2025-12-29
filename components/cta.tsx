import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-32 border-t border-border bg-green-500 text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to get started?</h2>
          <p className="text-lg opacity-90 mb-8 text-balance">
            Join thousands of merchants already using PayDeck to process payments securely and reliably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="gap-2">
              Start Your Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">No credit card required. Free setup.</p>
        </div>
      </div>
    </section>
  )
}
