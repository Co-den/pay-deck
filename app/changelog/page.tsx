import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Changelog - PayDeck",
  description: "Latest updates and improvements to the PayDeck payment gateway",
}

export default function ChangelogPage() {
  const changelog = [
    {
      version: "3.2.0",
      date: "December 28, 2024",
      type: "feature",
      title: "Cryptocurrency Payment Support",
      description:
        "Added support for Bitcoin, Ethereum, USDC, and other cryptocurrencies. Merchants can now accept crypto payments with instant settlement options.",
      items: [
        "Bitcoin (BTC) payment integration",
        "Ethereum (ETH) support",
        "USDC stablecoin payments",
        "Real-time crypto price conversion",
        "Automatic settlement to preferred fiat currency",
      ],
    },
    {
      version: "3.1.5",
      date: "December 20, 2024",
      type: "improvement",
      title: "Enhanced Dashboard Analytics",
      description:
        "Improved dashboard with new charts, better performance metrics, and customizable widgets for merchants.",
      items: [
        "New revenue trend visualization",
        "Customer lifetime value tracking",
        "Payment method performance breakdown",
        "Dashboard widget customization",
        "Export reports in multiple formats",
      ],
    },
    {
      version: "3.1.0",
      date: "December 10, 2024",
      type: "feature",
      title: "Webhook Management Portal",
      description:
        "Built-in webhook management interface for merchants to configure, test, and monitor real-time events.",
      items: [
        "Visual webhook endpoint management",
        "Test webhook delivery with sample data",
        "Webhook event logs and debugging",
        "Retry policy configuration",
        "Event filtering and routing",
      ],
    },
    {
      version: "3.0.0",
      date: "November 25, 2024",
      type: "feature",
      title: "Complete Platform Redesign",
      description: "Major redesign of PayDeck with improved UX, new API endpoints, and enterprise features.",
      items: [
        "Redesigned merchant dashboard",
        "New v3 REST API",
        "GraphQL support",
        "Advanced reporting suite",
        "Multi-currency accounts",
        "Role-based access control",
      ],
    },
    {
      version: "2.8.2",
      date: "October 15, 2024",
      type: "fix",
      title: "Security Patches",
      description: "Critical security updates and bug fixes for improved platform stability.",
      items: [
        "Fixed API rate limiting issue",
        "Improved token validation",
        "Enhanced fraud detection",
        "Fixed webhook delivery timeout",
      ],
    },
  ]

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "improvement":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "fix":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Changelog</h1>
              <p className="text-lg text-muted-foreground">
                Stay updated with the latest features, improvements, and fixes to PayDeck
              </p>
            </div>

            <div className="space-y-8">
              {changelog.map((entry, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-6 pb-8">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold">v{entry.version}</h2>
                        <Badge className={getTypeStyles(entry.type)}>{entry.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.date}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
                  <p className="text-muted-foreground mb-4">{entry.description}</p>

                  <ul className="space-y-2">
                    {entry.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-sm">
                        <span className="text-primary font-bold mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-muted-foreground text-center">
                Looking for older updates?{" "}
                <Link href="/support" className="text-primary hover:underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
