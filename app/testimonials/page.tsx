import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Star } from "lucide-react";

export const metadata = {
  title: "Testimonials - PayPort",
  description: "See what merchants and businesses say about PayPort",
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechFlow Inc",
      role: "Founder & CEO",
      content:
        "PayPort has transformed how we handle payments. The seamless integration and excellent support have saved us countless hours. Highly recommend!",
      rating: 5,
      image: "SC",
    },
    {
      name: "James Rodriguez",
      company: "Fashion Forward",
      role: "E-commerce Manager",
      content:
        "The crypto payment feature was exactly what we needed to reach international customers. PayPort made it incredibly easy to implement.",
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
        "PayPort's API documentation is exceptional. Our team was able to integrate it in a fraction of the time compared to other providers.",
      rating: 5,
      image: "MO",
    },
    {
      name: "Lisa Wang",
      company: "Enterprise Goods Co",
      role: "CFO",
      content:
        "The security features and compliance certifications give us complete peace of mind. PayPort is enterprise-ready from day one.",
      rating: 5,
      image: "LW",
    },
    {
      name: "David Okafor",
      company: "StartUp Innovations",
      role: "Product Manager",
      content:
        "From onboarding to implementation, the PayPort team was incredibly supportive. We were live in less than a week. Excellent service.",
      rating: 5,
      image: "DO",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12 md:py-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Wall of Love
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from merchants and businesses who trust PayPort with their
              payment processing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border bg-card hover:border-purple-600 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {testimonial.content}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center font-semibold text-sm shadow-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center p-8 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Share Your Experience
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Love PayPort? Share your story and join our wall of love.
            </p>
            <button className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium shadow-lg hover:shadow-xl">
              Submit Testimonial
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
