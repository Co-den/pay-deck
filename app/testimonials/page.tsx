import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Star } from "lucide-react"

export const metadata = {
  title: "Testimonials - PayDeck",
  description: "See what merchants and businesses say about PayDeck",
}

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechFlow Inc",
      role: "Founder & CEO",
      content:
        "PayDeck has transformed how we handle payments. The seamless integration and excellent support have saved us countless hours. Highly recommend!",
      rating: 5,
      image: "SC",
    },
    {
      name: "James Rodriguez",
      company: "Fashion Forward",
      role: "E-commerce Manager",
      content:
        "The crypto payment feature was exactly what we needed to reach international customers. PayDeck made it incredibly easy to implement.",
      rating: 5,
      image: "JR",
    },
    {
      name: "Emma Thompson",
      company: "Global Logistics Ltd",
      role: "Operations Director",
      content:
        "Outstanding platform. The real-time analytics dashboard gives us complete visibility into our payment operations. Best decision we made.",
      rating: 5,
      image: "ET",
    },
    {
      name: "Marcus Okonkwo",
      company: "Digital Solutions Africa",
      role: "CTO",
      content:
        "PayDeck's API documentation is exceptional. Our team was able to integrate it in a fraction of the time compared to other providers.",
      rating: 5,
      image: "MO",
    },
    {
      name: "Lisa Wang",
      company: "Enterprise Goods Co",
      role: "CFO",
      content:
        "The security features and compliance certifications give us complete peace of mind. PayDeck is enterprise-ready from day one.",
      rating: 5,
      image: "LW",
    },
    {
      name: "David Okafor",
      company: "StartUp Innovations",
      role: "Product Manager",
      content:
        "From onboarding to implementation, the PayDeck team was incredibly supportive. We were live in less than a week. Excellent service.",
      rating: 5,
      image: "DO",
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container py-12 md:py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Wall of Love</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from merchants and businesses who trust PayDeck with their payment processing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>

                <p className="text-muted-foreground mb-6">{testimonial.content}</p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-8 rounded-lg bg-primary/5 border border-primary/20">
            <h2 className="text-2xl font-bold mb-3">Share Your Experience</h2>
            <p className="text-muted-foreground mb-6">Love PayDeck? Share your story and join our wall of love.</p>
            <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
              Submit Testimonial
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
