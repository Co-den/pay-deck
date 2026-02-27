import { CheckCircle2, Shield, TrendingUp } from "lucide-react";

const certifications = [
  "PCI DSS Level 1 Certified",
  "ISO 27001 Certified",
  "SOC 2 Type II Audit",
  "GDPR Compliant",
  "NDPR Compliant",
];

const trustStats = [
  "10,000+ Active Merchants",
  "$2B+ in Annual Volume",
  "99.99% Uptime SLA",
  "24/7 Support Available",
];

const bigStats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<100ms", label: "Avg Response Time" },
  { value: "195+", label: "Countries Supported" },
];

export function Trust() {
  return (
    <section
      id="security"
      className="py-24 md:py-32 border-t border-[rgba(255,255,255,0.07)] bg-[#0d1218]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-mono tracking-[0.18em] uppercase text-[#00e5a0] mb-4">
            Trust & Security
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#e8edf2] mb-4">
            Trusted by industry leaders
          </h2>
          <p className="text-base font-mono text-[#8a98a8] leading-relaxed">
            PayPort is trusted by thousands of merchants worldwide with billions
            in annual transaction volume
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16">
          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#161e28] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[rgba(0,229,160,0.1)] flex items-center justify-center text-[#00e5a0]">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#e8edf2]">
                Security Certifications
              </h3>
            </div>
            <div className="space-y-3">
              {certifications.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00e5a0] flex-shrink-0" />
                  <span className="text-sm font-mono text-[#8a98a8]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#161e28] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[rgba(45,212,245,0.1)] flex items-center justify-center text-[#2dd4f5]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#e8edf2]">Trusted By</h3>
            </div>
            <div className="space-y-3">
              {trustStats.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#2dd4f5] flex-shrink-0" />
                  <span className="text-sm font-mono text-[#8a98a8]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Big stats */}
        <div className="flex flex-wrap gap-px justify-center bg-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] max-w-2xl mx-auto">
          {bigStats.map(({ value, label }, i) => (
            <div
              key={label}
              className="flex-1 min-w-[120px] text-center px-8 py-6 bg-[#161e28]"
            >
              <div className="text-3xl font-bold font-mono text-[#00e5a0] mb-1">
                {value}
              </div>
              <div className="text-xs font-mono text-[#4a5568]">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
