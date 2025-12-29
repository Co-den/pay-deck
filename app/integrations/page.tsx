import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Integrations - PayDeck",
  description: "Pre-built integrations and plugins for PayDeck payment gateway",
}

export default function IntegrationsPage() {
  const integrations = [
    {
      name: "Shopify",
      category: "E-commerce",
      description: "Accept PayDeck payments on your Shopify store",
      image: "Shopify",
      status: "Available",
      link: "#",
    },
    {
      name: "WooCommerce",
      category: "E-commerce",
      description: "WordPress/WooCommerce payment plugin for PayDeck",
      image: "WooCommerce",
      status: "Available",
      link: "#",
    },
    {
      name: "Stripe Connect",
      category: "Payments",
      description: "Connect your Stripe account with PayDeck for unified reporting",
      image: "Stripe",
      status: "Available",
      link: "#",
    },
    {
      name: "Zapier",
      category: "Automation",
      description: "Automate workflows with PayDeck payment events",
      image: "Zapier",
      status: "Available",
      link: "#",
    },
    {
      name: "QuickBooks Online",
      category: "Accounting",
      description: "Automatically sync PayDeck transactions with QuickBooks",
      image: "QuickBooks",
      status: "Coming Soon",
      link: "#",
    },
    {
      name: "Salesforce",
      category: "CRM",
      description: "Integrate payment data with Salesforce customer records",
      image: "Salesforce",
      status: "Coming Soon",
      link: "#",
    },
    {
      name: "Slack",
      category: "Communication",
      description: "Get real-time payment notifications in Slack",
      image: "Slack",
      status: "Available",
      link: "#",
    },
    {
      name: "Google Sheets",
      category: "Data",
      description: "Export and analyze PayDeck data in Google Sheets",
      image: "Google Sheets",
      status: "Available",
      link: "#",
    },
  ]

  const categories = ["All", "E-commerce", "Payments", "Automation", "Accounting", "CRM", "Communication", "Data"]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container py-12 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Integrations</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect PayDeck with your favorite tools and platforms to streamline your payment workflow
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
              {categories.map((cat, idx) => (
                <Badge
                  key={idx}
                  variant={idx === 0 ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration, idx) => (
                <Link key={idx} href={integration.link} className="group">
                  <div className="h-full p-6 rounded-lg border border-border bg-card hover:border-primary transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {integration.image.slice(0, 1)}
                      </div>
                      <Badge variant={integration.status === "Available" ? "default" : "secondary"}>
                        {integration.status}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {integration.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">{integration.category}</p>
                    <p className="text-sm text-muted-foreground mb-6">{integration.description}</p>

                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      {integration.status === "Available" ? "Install" : "Notify Me"}
                    </Button>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-lg bg-accent/5 border border-accent/20 text-center">
              <h2 className="text-2xl font-bold mb-2">Build Your Own Integration</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our comprehensive REST API and webhooks make it easy to build custom integrations tailored to your
                needs.
              </p>
              <Button asChild>
                <Link href="/api-reference">View API Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
