const LOGOS = [
  "ACCENTURE",
  "FLUTTERWAVE",
  "ANDELA",
  "PAYSTACK",
  "INTERSWITCH",
  "KONGA",
];

export function Logos() {
  return (
    <div
      style={{
        padding: "40px 48px 60px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: "#4a5568",
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        Powering payments at
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          flexWrap: "wrap" as const,
        }}
      >
        {LOGOS.map((name) => (
          <span
            key={name}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#4a5568",
              cursor: "default",
              transition: "color 0.3s",
            }}
            
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
