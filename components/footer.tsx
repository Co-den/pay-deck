import Link from "next/link";

const FOOTER_COLS = [
  {
    head: "Product",
    links: [
      "Payroll",
      "Invoicing",
      "Expense Cards",
      "Global Transfers",
      "Analytics",
    ].map((l) => ({ label: l, href: "/" })),
  },
  {
    head: "Company",
    links: ["About", "Careers", "Blog", "Press"].map((l) => ({
      label: l,
      href: l.toLowerCase(),
    })),
  },
  {
    head: "Developers",
    links: ["API Docs", "Status", "Changelog", "SDKs"].map((l) => ({
      label: l,
      href: l.toLowerCase(),
    })),
  },
  {
    head: "Legal",
    links: ["Privacy", "Terms", "Security", "Licenses"].map((l) => ({
      label: l,
      href: l.toLowerCase(),
    })),
  },
];

export function Footer() {
  return (
    <footer
      style={{
        padding: "60px 48px 32px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 64,
          marginBottom: 48,
          paddingBottom: 48,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexWrap: "wrap" as const,
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: 260 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 18,
              fontWeight: 800,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "#00e5a0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                color: "#080c10",
                flexShrink: 0,
              }}
            >
              P
            </div>
            Paydeck
          </div>
          <p style={{ fontSize: 13, color: "#8a98a8", lineHeight: 1.6 }}>
            The all-in-one payments platform for businesses that move fast.
          </p>
        </div>

        {/* Columns */}
        <div style={{ display: "flex", gap: 64, flexWrap: "wrap" as const }}>
          {FOOTER_COLS.map(({ head, links }) => (
            <div key={head}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  color: "#4a5568",
                  marginBottom: 16,
                }}
              >
                {head}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {links.map(({ label, href }) => (
                  <li key={label} style={{ marginBottom: 10 }}>
                    <Link
                      href={href}
                      style={{
                        fontSize: 13,
                        color: "#8a98a8",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap" as const,
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#4a5568",
          }}
        >
          © 2025 Paydeck Technologies Inc. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {["PCI DSS", "SOC 2", "NDPR", "ISO 27001"].map((b) => (
            <span
              key={b}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.06em",
                color: "#4a5568",
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "4px 10px",
                borderRadius: 4,
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
