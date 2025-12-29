import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase } from "lucide-react"

const jobs = [
  {
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
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
    location: "Austin, TX",
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
    location: "San Francisco, CA",
    type: "Full-time",
  },
]

export default function CareersPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-4">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Build the future of payments with us. We're looking for talented people who are passionate about solving
              hard problems.
            </p>
          </div>

          {/* Culture */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold mb-8">Our Culture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Remote First</h3>
                <p className="text-muted-foreground">Work from anywhere. We have team members across the globe.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Learning & Growth</h3>
                <p className="text-muted-foreground">
                  Continuous learning budget and mentorship from industry experts.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Impact</h3>
                <p className="text-muted-foreground">
                  Your work directly impacts millions of merchants and customers worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <div key={index} className="border border-border rounded-lg p-6 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
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
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
