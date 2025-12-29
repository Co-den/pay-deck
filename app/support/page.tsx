"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, MessageSquare, Headphones, FileText, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const faqItems = [
  {
    category: "Getting Started",
    items: [
      {
        q: "How do I create a PayDeck account?",
        a: "Visit PayDeck.io and click 'Get Started'. Fill in your email and password, verify your email address, and complete your merchant profile. You'll have access to your dashboard immediately.",
      },
      {
        q: "How long does it take to get approved?",
        a: "Most accounts are approved within 24 hours. Some may require additional verification and could take up to 48 hours. You'll receive an email notification once your account is approved.",
      },
      {
        q: "What payment methods can I accept?",
        a: "PayDeck supports 25+ payment methods including credit cards, digital wallets (Apple Pay, Google Pay), bank transfers, and local payment methods in 50+ countries.",
      },
    ],
  },
  {
    category: "Payments & Transactions",
    items: [
      {
        q: "How long does it take to receive payments?",
        a: "Standard payouts occur daily to your connected bank account. Funds typically arrive within 1-2 business days depending on your bank.",
      },
      {
        q: "What are your transaction fees?",
        a: "Our standard pricing is 2.9% + $0.30 per transaction. Volume discounts and custom pricing are available for high-volume merchants.",
      },
      {
        q: "Can I refund a payment?",
        a: "Yes, you can refund any transaction from your dashboard. Full refunds are processed immediately, and the funds are returned to the customer's original payment method.",
      },
    ],
  },
  {
    category: "Security & Compliance",
    items: [
      {
        q: "Is PayDeck PCI compliant?",
        a: "Yes, PayDeck is PCI DSS Level 1 compliant. We handle all sensitive payment data encryption and security requirements, so you don't have to.",
      },
      {
        q: "How is my data protected?",
        a: "We use AES-256 encryption for data at rest and TLS 1.2+ for data in transit. All payment data is tokenized and never stored in plain text.",
      },
      {
        q: "What security features are included?",
        a: "PayDeck includes fraud detection, 3D Secure support, PCI compliance, and 24/7 security monitoring. Your account also includes two-factor authentication.",
      },
    ],
  },
  {
    category: "Technical Issues",
    items: [
      {
        q: "How do I integrate PayDeck with my website?",
        a: "We provide REST APIs, pre-built SDKs for popular languages, and hosted checkout pages. Check our documentation for step-by-step integration guides.",
      },
      {
        q: "Do you offer webhooks?",
        a: "Yes, PayDeck provides webhooks for all transaction events. You can configure them in your dashboard settings and receive real-time notifications.",
      },
      {
        q: "What's your API uptime guarantee?",
        a: "We guarantee 99.9% uptime. Our system is monitored 24/7, and we have redundant infrastructure in multiple geographic locations.",
      },
    ],
  },
]

const supportChannels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help within 24 hours",
    detail: "support@paydeck.io",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our team in real-time",
    detail: "Available 9 AM - 6 PM EST",
  },
  {
    icon: Headphones,
    title: "Phone Support",
    description: "Talk to a support specialist",
    detail: "+1 (800) 123-4567",
  },
  {
    icon: FileText,
    title: "Knowledge Base",
    description: "Browse detailed documentation",
    detail: "docs.paydeck.io",
  },
]

export default function SupportPage() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const toggleFAQ = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Support Center</h1>
            <p className="text-lg text-muted-foreground">How can we help you today?</p>
          </div>

          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {supportChannels.map((channel) => {
              const Icon = channel.icon
              return (
                <div
                  key={channel.title}
                  className="border border-border rounded-lg p-6 text-center hover:border-primary transition-colors"
                >
                  <Icon className="w-8 h-8 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{channel.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                  <p className="text-sm font-medium text-green-500">{channel.detail}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Name</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Subject</label>
                    <Input
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Message</label>
                    <Textarea
                      placeholder="Tell us more..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                  {submitted && (
                    <p className="text-sm text-green-600 dark:text-green-400">Message sent successfully!</p>
                  )}
                </form>
              </div>
            </div>

            {/* FAQ */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-semibold text-lg mb-4 text-green-500">{category.category}</h3>
                    <div className="space-y-3 mb-6">
                      {category.items.map((item, index) => {
                        const itemId = `${category.category}-${index}`
                        const isExpanded = expandedItems[itemId]

                        return (
                          <div
                            key={itemId}
                            className="border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
                          >
                            <button
                              onClick={() => toggleFAQ(itemId)}
                              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                            >
                              <span className="font-medium">{item.q}</span>
                              <ChevronDown
                                className={`w-5 h-5 text-muted-foreground transition-transform ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 pt-0 border-t border-border bg-muted/30">
                                <p className="text-muted-foreground">{item.a}</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
