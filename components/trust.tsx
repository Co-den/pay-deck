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
      style={{
        padding: "96px 0",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        background: "#080c10",
      }}
    >
      <div style={{ maxWidth: 896, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#00e5a0",
              marginBottom: 16,
            }}
          >
            Trust & Security
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: "#e8edf2",
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Trusted by industry leaders
          </h2>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: "#8a98a8",
              lineHeight: 1.8,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            PayPort is trusted by thousands of merchants worldwide with billions
            in annual transaction volume
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 12,
            marginBottom: 12,
          }}
        >
          {/* Security Certifications */}
          <div
            style={{
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "#0d1218",
              padding: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(0,229,160,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00e5a0",
                  flexShrink: 0,
                }}
              >
                <Shield size={16} />
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#e8edf2",
                  letterSpacing: "-0.3px",
                }}
              >
                Security Certifications
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {certifications.map((item) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <CheckCircle2
                    size={15}
                    style={{ color: "#00e5a0", flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: "#8a98a8",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted By */}
          <div
            style={{
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "#0d1218",
              padding: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(0,229,160,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00e5a0",
                  flexShrink: 0,
                }}
              >
                <TrendingUp size={16} />
              </div>
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#e8edf2",
                  letterSpacing: "-0.3px",
                }}
              >
                Trusted By
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {trustStats.map((item) => (
                <div
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <CheckCircle2
                    size={15}
                    style={{ color: "#00e5a0", flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: "#8a98a8",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Big stats */}
        <div
          style={{
            display: "flex",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.03)",
            gap: 1,
          }}
        >
          {bigStats.map(({ value, label }) => (
            <div
              key={label}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "28px 16px",
                background: "#0d1218",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(22px, 4vw, 30px)",
                  fontWeight: 700,
                  color: "#00e5a0",
                  marginBottom: 6,
                  letterSpacing: "-0.5px",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#4a5568",
                  letterSpacing: "0.05em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}