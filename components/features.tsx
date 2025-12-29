import { CreditCard, Settings, BarChart3, Zap, Shield, Coins } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: CreditCard,
      title: "Multiple Payment Methods",
      description: "Accept credit cards, digital wallets, bank transfers, crypto, and more in one unified gateway",
    },
    {
      icon: Coins,
      title: "Cryptocurrency Payments",
      description: "Accept Bitcoin, Ethereum, USDC, and other cryptocurrencies with instant settlement options",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process transactions in milliseconds with our optimized infrastructure",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with PCI DSS, SOC 2, and GDPR standards",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Comprehensive dashboards with detailed insights into your payment performance",
    },
    {
      icon: Settings,
      title: "Easy Integration",
      description: "Simple API with comprehensive documentation and SDKs for all major platforms",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 border-t border-border">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Powerful Features for Modern Merchants</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Everything you need to build, scale, and optimize your payment operations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border bg-card hover:bg-accent/5 transition-colors"
              >
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
