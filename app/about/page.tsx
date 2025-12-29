import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Users, Target, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-4">About PayDeck</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              We're building the future of payment processing. Founded in 2020, PayDeck is on a mission to make payment
              acceptance easy, secure, and accessible for merchants worldwide.
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="space-y-4">
              <Target className="w-12 h-12 text-green-500" />
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower merchants with simple, secure, and innovative payment solutions that help them grow their
                business globally.
              </p>
            </div>
            <div className="space-y-4">
              <Heart className="w-12 h-12 text-green-500" />
              <h3 className="text-2xl font-bold">Our Values</h3>
              <p className="text-muted-foreground">
                We believe in transparency, security, innovation, and customer success. We're committed to doing the
                right thing always.
              </p>
            </div>
            <div className="space-y-4">
              <Users className="w-12 h-12 text-green-500" />
              <h3 className="text-2xl font-bold">Our Team</h3>
              <p className="text-muted-foreground">
                Our team brings together experts in payments, technology, security, and customer service from companies
                like Stripe, Square, and PayPal.
              </p>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-card border border-border rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold mb-8">Why Choose PayDeck?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Industry Experience</h3>
                <p className="text-muted-foreground">
                  Our team has processed billions in payments and helped thousands of merchants succeed.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Security First</h3>
                <p className="text-muted-foreground">
                  PCI DSS Level 1 certified with bank-level encryption and 24/7 fraud monitoring.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Global Reach</h3>
                <p className="text-muted-foreground">
                  Accept payments from customers in 190+ countries with support for local payment methods.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Developer Friendly</h3>
                <p className="text-muted-foreground">
                  Easy-to-use APIs, comprehensive documentation, and responsive developer support.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">$50B+</div>
              <p className="text-muted-foreground">Transaction Volume</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">10K+</div>
              <p className="text-muted-foreground">Merchants</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">190+</div>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">99.9%</div>
              <p className="text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
