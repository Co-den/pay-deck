import { CheckCircle2 } from "lucide-react"

export function Trust() {
  return (
    <section id="security" className="py-20 md:py-32 bg-primary/5 border-t border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Trusted by Industry Leaders</h2>
          <p className="text-lg text-muted-foreground text-balance">
            PayDeck is trusted by thousands of merchants worldwide with billions in annual transaction volume
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-lg mb-4">Security Certifications</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">PCI DSS Level 1 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">SOC 2 Type II Audit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-lg mb-4">Trusted By</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">10,000+ Active Merchants</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">$2B+ in Annual Volume</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">99.99% Uptime SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 justify-center items-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">99.99%</div>
            <div className="text-sm text-muted-foreground">Uptime SLA</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{"<"}100ms</div>
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">195+</div>
            <div className="text-sm text-muted-foreground">Countries Supported</div>
          </div>
        </div>
      </div>
    </section>
  )
}
