"use client";

import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    text: (
      <>
        We used to spend{" "}
        <strong style={{ color: "#e8edf2", fontWeight: 600 }}>
          3 days every month
        </strong>{" "}
        on payroll. With PayPort it's done in 20 minutes. The automation is
        genuinely insane.
      </>
    ),
    name: "Amaka Okonkwo",
    role: "CFO · TechBuild Lagos",
    initials: "AO",
    bg: "#3b82f6",
  },
  {
    text: (
      <>
        Our team is spread across 8 countries. PayPort handles{" "}
        <strong style={{ color: "#e8edf2", fontWeight: 600 }}>
          every currency, every time zone
        </strong>{" "}
        without breaking a sweat. It's our financial backbone.
      </>
    ),
    name: "Kofi Mensah",
    role: "COO · Remotica Africa",
    initials: "KM",
    bg: "#8b5cf6",
  },
  {
    text: (
      <>
        Switched from a legacy payroll system and the difference is night and
        day.{" "}
        <strong style={{ color: "#e8edf2", fontWeight: 600 }}>
          Instant bank transfers, clean UI
        </strong>
        , and actual human support when needed.
      </>
    ),
    name: "Sade Nwosu",
    role: "Head of HR · GreenBridge Co.",
    initials: "SN",
    bg: "#f59e0b",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setTimeout(
              () => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              },
              parseInt(el.dataset.delay || "0"),
            );
          }
        });
      },
      { threshold: 0.1 },
    );

    ref.current?.querySelectorAll("[data-testi]").forEach((el, i) => {
      (el as HTMLElement).dataset.delay = String(i * 120);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: "100px 48px" }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color: "#00e5a0",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 20,
            height: 1,
            background: "#00e5a0",
          }}
        />
        Testimonials
      </div>
      <h2
        style={{
          fontSize: "clamp(32px, 4vw, 52px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 64,
        }}
      >
        Loved by finance
        <br />
        teams everywhere.
      </h2>

      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {TESTIMONIALS.map(({ text, name, role, initials, bg }) => (
          <div
            key={name}
            data-testi
            style={{
              background: "#161e28",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: 32,
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s, transform 0.6s, border-color 0.3s",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 3,
                marginBottom: 16,
                color: "#00e5a0",
                fontSize: 13,
              }}
            >
              ★★★★★
            </div>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "#8a98a8",
                marginBottom: 24,
                fontWeight: 400,
              }}
            >
              {text}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {initials}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{name}</div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "#4a5568",
                    marginTop: 2,
                  }}
                >
                  {role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
