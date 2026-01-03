import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="cta-section section-centered bg-gradient-to-br from-teal-600 to-teal-800 text-white">
      <div className="cta-content">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Ready to get started?
        </h2>
        <p className="text-lg opacity-90 mb-8 text-balance">
          Join thousands of merchants already using SettleMe to process payments
          securely and reliably.
        </p>
        <div className="cta-buttons">
          <Link href="/auth/signup">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 bg-white text-teal-700 hover:bg-teal-50"
            >
              Start Your Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 bg-transparent"
          >
            Schedule Demo
          </Button>
        </div>
        <p className="text-sm opacity-75 mt-6">
          No credit card required. Free setup.
        </p>
      </div>
    </section>
  );
}
