import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  BookOpen,
  Zap,
  Shield,
  DollarSign,
  Code,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Guides - PayPort",
  description:
    "Comprehensive guides and tutorials for integrating and using PayPort",
};

export default function GuidesPage() {
  const guides = [
    {
      icon: Zap,
      category: "Getting Started",
      title: "Quick Start Guide",
      description:
        "Get your PayPort account set up and start accepting payments in 30 minutes",
      link: "#",
      readTime: "10 min",
    },
    {
      icon: Code,
      category: "Integration",
      title: "API Integration Guide",
      description:
        "Step-by-step guide to integrating PayPort API into your application",
      link: "#",
      readTime: "15 min",
    },
    {
      icon: DollarSign,
      category: "Payments",
      title: "Handling Multiple Currencies",
      description:
        "Learn how to accept payments in different currencies and handle conversion",
      link: "#",
      readTime: "12 min",
    },
    {
      icon: Shield,
      category: "Security",
      title: "Payment Security Best Practices",
      description:
        "Ensure your payment processing is secure and compliant with industry standards",
      link: "#",
      readTime: "14 min",
    },
    {
      icon: BarChart3,
      category: "Analytics",
      title: "Understanding Your Analytics Dashboard",
      description:
        "Master the dashboard and extract insights from your payment data",
      link: "#",
      readTime: "11 min",
    },
    {
      icon: BookOpen,
      category: "Advanced",
      title: "Building Recurring Payments",
      description:
        "Implementation guide for subscriptions and recurring billing with PayPort",
      link: "#",
      readTime: "18 min",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container-centered py-12 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Guides & Tutorials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guides to help you integrate, configure, and
              optimize PayPort for your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {guides.map((guide, idx) => {
              const Icon = guide.icon;
              return (
                <Link key={idx} href={guide.link} className="group">
                  <div className="h-full p-6 rounded-lg border border-border bg-card hover:border-purple-500 hover:bg-accent/5 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <Icon className="w-8 h-8 text-purple-500" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {guide.readTime}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs font-semibold text-purple-500 uppercase tracking-wide">
                        {guide.category}
                      </p>
                      <h3 className="text-lg font-semibold mt-2 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {guide.description}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent hover:bg-purple-600 group-hover:text-purple-600 transition-colors"
                    >
                      Read Guide
                    </Button>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto mt-16 p-8 rounded-lg bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
            <p className="text-muted-foreground mb-6">
              Browse our complete API documentation, watch video tutorials, or
              contact our support team.
            </p>
            <div className="flex gap-3">
              <Link href="/docs">
                <Button>View API Docs</Button>
              </Link>
              <Link href="/support">
                <Button className="hover:bg-purple-600" variant="outline">Contact Support</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
