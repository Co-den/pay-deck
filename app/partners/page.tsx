import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Partner Directory - PayDeck",
  description: "Find certified PayDeck service partners and agencies",
};

export default function PartnerDirectoryPage() {
  const partners = [
    {
      name: "Digital Bridge Solutions",
      category: "Integration Partner",
      specialty: "E-commerce",
      location: "San Francisco, CA",
      description: "Specialized in Shopify and WooCommerce integrations",
      verified: true,
      rating: 4.9,
      projects: 156,
    },
    {
      name: "PayTech Consulting",
      category: "Solution Provider",
      specialty: "Enterprise",
      location: "London, UK",
      description: "Enterprise payment solutions and custom implementations",
      verified: true,
      rating: 4.8,
      projects: 89,
    },
    {
      name: "Global Dev Agency",
      category: "Integration Partner",
      specialty: "SaaS",
      location: "Toronto, Canada",
      description: "Custom API integrations for SaaS platforms",
      verified: true,
      rating: 4.7,
      projects: 234,
    },
    {
      name: "FinTech Accelerator",
      category: "Solution Provider",
      specialty: "Startups",
      location: "Singapore",
      description: "Helping startups implement payment solutions",
      verified: true,
      rating: 4.9,
      projects: 112,
    },
    {
      name: "Mobile First Dev",
      category: "Integration Partner",
      specialty: "Mobile Apps",
      location: "Austin, TX",
      description: "Mobile app payment integration specialists",
      verified: true,
      rating: 4.6,
      projects: 178,
    },
    {
      name: "Enterprise Systems Inc",
      category: "Solution Provider",
      specialty: "Enterprise",
      location: "Sydney, Australia",
      description: "Large-scale enterprise implementations",
      verified: true,
      rating: 4.8,
      projects: 67,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container-centered py-12 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Partner Directory
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find certified PayDeck partners and agencies to help with your
              implementation
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex gap-2 mb-8">
              <input
                type="text"
                placeholder="Search partners..."
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              />
              <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground">
                <option>All Categories</option>
                <option>Integration Partner</option>
                <option>Solution Provider</option>
              </select>
              <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground">
                <option>All Locations</option>
                <option>North America</option>
                <option>Europe</option>
                <option>Asia Pacific</option>
              </select>
            </div>

            <div className="grid gap-6">
              {partners.map((partner, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-lg border border-border bg-card hover:border-primary transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">
                          {partner.name}
                        </h3>
                        {partner.verified && (
                          <Badge className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {partner.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{partner.location}</span>
                        <span>Rating: {partner.rating}/5</span>
                        <span>{partner.projects} projects</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{partner.category}</Badge>
                      <p className="text-sm font-medium mt-2 text-primary">
                        {partner.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button size="sm" asChild>
                      <Link href="#">View Profile</Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-lg bg-accent/5 border border-accent/20 text-center">
              <h2 className="text-2xl font-bold mb-2">
                Become a PayDeck Partner
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join our partner program and help merchants implement PayDeck
                solutions while growing your business.
              </p>
              <Button asChild>
                <Link href="/contact">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
