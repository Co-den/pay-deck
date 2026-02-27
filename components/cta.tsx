import Link from "next/link";

export function CTA() {
  return (
    <section
      style={{
        padding: "100px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orb */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <h2
        style={{
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 20,
          position: "relative",
          zIndex: 1,
        }}
      >
        Ready to simplify
        <br />
        your payments?
      </h2>
      <p
        style={{
          fontSize: 17,
          color: "#8a98a8",
          marginBottom: 40,
          position: "relative",
          zIndex: 1,
        }}
      >
        Join 40,000+ businesses already running on Paydeck.
      </p>

      <Link href="/auth/signup">
        <button
          style={{
            background: "#00e5a0",
            color: "#080c10",
            fontFamily: "'Syne', sans-serif",
            fontSize: 15,
            fontWeight: 700,
            padding: "14px 32px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 0 32px rgba(0,229,160,0.2)",
            transition: "transform 0.2s, box-shadow 0.2s",
            position: "relative",
            zIndex: 1,
          }}
          
        >
          Get started — it's free →
        </button>
      </Link>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#4a5568",
          marginTop: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        No credit card required · Setup in 2 minutes · Cancel anytime
      </div>
    </section>
  );
}
