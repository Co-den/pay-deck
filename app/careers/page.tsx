import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase } from "lucide-react";

const jobs = [
  {
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Lagos, Nigeria",
    type: "Full-time",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Abuja, Nigeria",
    type: "Full-time",
  },
  {
    title: "Sales Engineer",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Customer Success Manager",
    department: "Support",
    location: "Port Harcourt, Nigeria",
    type: "Full-time",
  },
  {
    title: "Security Engineer",
    department: "Security",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Data Analyst",
    department: "Analytics",
    location: "Lagos, Nigeria",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-4">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build the future of payments with us. We're looking for talented
              people who are passionate about solving hard problems.
            </p>
          </div>

          {/* Culture */}
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-border rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Culture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Remote First</h3>
                <p className="text-muted-foreground">
                  Work from anywhere. We have team members across the globe.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Learning & Growth</h3>
                <p className="text-muted-foreground">
                  Continuous learning budget and mentorship from industry
                  experts.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Impact</h3>
                <p className="text-muted-foreground">
                  Your work directly impacts millions of merchants and customers
                  worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Open Positions
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {jobs.map((job, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-6 hover:border-purple-600 transition-colors bg-card"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="px-2 py-1 bg-purple-500/10 text-purple-600 rounded text-xs font-medium">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center p-8 rounded-lg bg-purple-500/5 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-3">Don't See Your Role?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume
              and tell us how you can contribute to PayDeck.
            </p>
            <Button
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
            >
              Send Your Resume
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
