"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CheckCircle, Clock } from "lucide-react";

const incidents = [
  {
    date: "2024-12-28",
    title: "Scheduled Maintenance",
    status: "resolved",
    duration: "30 minutes",
    description:
      "Database optimization and infrastructure updates completed successfully.",
  },
  {
    date: "2024-12-25",
    title: "High Latency Issues",
    status: "resolved",
    duration: "2 hours",
    description:
      "Network routing issue affecting API response times. Problem identified and resolved.",
  },
  {
    date: "2024-12-20",
    title: "Dashboard Availability",
    status: "resolved",
    duration: "15 minutes",
    description:
      "Brief intermittent access issue to merchant dashboard. Service restored.",
  },
];

const systemStatus = [
  { service: "API Servers", status: "operational", uptime: "99.99%" },
  { service: "Dashboard", status: "operational", uptime: "99.98%" },
  { service: "Payment Processing", status: "operational", uptime: "99.99%" },
  { service: "Webhooks", status: "operational", uptime: "99.97%" },
  { service: "Database", status: "operational", uptime: "99.99%" },
  { service: "Authentication", status: "operational", uptime: "99.99%" },
];

export default function StatusPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container-centered py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              PayPort Status
            </h1>
            <p className="text-lg text-muted-foreground">
              System performance and incident history
            </p>
          </div>

          {/* Overall Status */}
          <div className="bg-linear-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg p-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-purple-500" />
              <h2 className="text-2xl font-bold">All Systems Operational</h2>
            </div>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleString()} • 30-day uptime:
              99.98%
            </p>
          </div>

          {/* System Status Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">System Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {systemStatus.map((component) => (
                <div
                  key={component.service}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{component.service}</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span className="text-sm text-muted-foreground">
                        Operational
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Uptime: {component.uptime}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Incident History */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Incident History</h3>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {incident.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {incident.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {incident.status === "resolved" && (
                        <>
                          <div className="w-3 h-3 rounded-full bg-purple-500" />
                          <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                            Resolved
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    {incident.description}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration: {incident.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
