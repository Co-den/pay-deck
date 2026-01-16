import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Users,
  Target,
  Heart,
  Shield,
  Globe,
  Code,
  TrendingUp,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-4">
              About PayPort
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're building the future of payment processing in Africa. Founded
              in 2024, PayPort is on a mission to make payment acceptance easy,
              secure, and accessible for merchants across Nigeria and beyond.
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-purple-600 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower merchants with simple, secure, and innovative payment
                solutions that help them grow their business globally.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-purple-600 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Our Values</h3>
              <p className="text-muted-foreground">
                We believe in transparency, security, innovation, and customer
                success. We're committed to doing the right thing always.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-purple-600 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">Our Team</h3>
              <p className="text-muted-foreground">
                Our team brings together experts in payments, technology,
                security, and customer service from leading fintech companies.
              </p>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-border rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Choose PayPort?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    Industry Experience
                  </h3>
                  <p className="text-muted-foreground">
                    Our team has processed billions in payments and helped
                    thousands of merchants succeed.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Security First</h3>
                  <p className="text-muted-foreground">
                    PCI DSS Level 1 certified with bank-level encryption and
                    24/7 fraud monitoring.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Global Reach</h3>
                  <p className="text-muted-foreground">
                    Accept payments from customers in 190+ countries with
                    support for local payment methods.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center">
                    <Code className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Developer Friendly</h3>
                  <p className="text-muted-foreground">
                    Easy-to-use APIs, comprehensive documentation, and
                    responsive developer support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              PayPort by the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    ₦50B+
                  </div>
                </div>
                <p className="text-muted-foreground font-medium">
                  Transaction Volume
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    10K+
                  </div>
                </div>
                <p className="text-muted-foreground font-medium">
                  Active Merchants
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    190+
                  </div>
                </div>
                <p className="text-muted-foreground font-medium">
                  Countries Supported
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    99.9%
                  </div>
                </div>
                <p className="text-muted-foreground font-medium">Uptime SLA</p>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PayPort was founded with a simple vision: to make payment
              processing accessible and affordable for every business in Africa.
              We saw merchants struggling with complex integrations, high fees,
              and unreliable service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we're proud to serve thousands of businesses across
              Nigeria, from small startups to large enterprises, helping them
              accept payments seamlessly and grow their revenue. Our journey has
              just begun, and we're excited about the future we're building
              together.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center p-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Join Our Journey
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Whether you're a merchant looking to accept payments or a talented
              individual wanting to join our team, we'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup">
              <button className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium shadow-lg hover:shadow-xl">
                Get Started
              </button>
              </Link>
              <Link href="/careers">
              <button className="px-6 py-3 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors font-medium">
                View Careers
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
