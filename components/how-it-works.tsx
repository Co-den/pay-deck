"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Create your account",
    desc: "Sign up in 60 seconds. Verify your business with our instant KYB — no paperwork, no branch visits.",
  },
  {
    num: "02",
    title: "Add your team",
    desc: "Import employees via CSV or connect your HR tool. Set roles, salary structures, and payment schedules in minutes.",
  },
  {
    num: "03",
    title: "Fund your wallet",
    desc: "Top up via bank transfer, card, or crypto. Multi-currency support with real exchange rates — no hidden margins.",
  },
  {
    num: "04",
    title: "Pay with one click",
    desc: "Approve payroll, send invoices, and settle expenses — all in a single dashboard. Receipts auto-generated.",
  },
];

export function HowItWorks() {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = parseInt(el.dataset.delay || "0");
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
          }
        });
      },
      { threshold: 0.1 },
    );

    const steps = stepsRef.current?.querySelectorAll("[data-step]");
    steps?.forEach((el, i) => {
      (el as HTMLElement).dataset.delay = String(i * 100);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: "100px 48px", position: "relative" }}>
      {/* Section tag */}
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
        How it works
      </div>
      <h2
        style={{
          fontSize: "clamp(32px, 4vw, 52px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 16,
        }}
      >
        Up and running
        <br />
        in minutes.
      </h2>
      <p
        style={{
          fontSize: 16,
          color: "#8a98a8",
          lineHeight: 1.65,
          maxWidth: 480,
          marginBottom: 64,
          fontWeight: 400,
        }}
      >
        No lengthy onboarding. No compliance headaches. Just connect, configure,
        and pay.
      </p>

      <div
        ref={stepsRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          position: "relative",
        }}
      >
        {/* Connector line */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), rgba(255,255,255,0.12), transparent)",
            pointerEvents: "none",
          }}
        />

        {STEPS.map(({ num, title, desc }, i) => (
          <div
            key={num}
            data-step
            style={{
              padding: "0 24px 48px",
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s, transform 0.6s",
            }}
            onMouseEnter={(e) => {
              const wrap = (e.currentTarget as HTMLElement).querySelector(
                "[data-numwrap]",
              ) as HTMLElement;
              if (wrap) {
                wrap.style.borderColor = "#00e5a0";
                wrap.style.boxShadow = "0 0 24px rgba(0,229,160,0.25)";
              }
            }}
            onMouseLeave={(e) => {
              const wrap = (e.currentTarget as HTMLElement).querySelector(
                "[data-numwrap]",
              ) as HTMLElement;
              if (wrap) {
                wrap.style.borderColor = "rgba(255,255,255,0.12)";
                wrap.style.boxShadow = "none";
              }
            }}
          >
            <div
              data-numwrap
              style={{
                width: 64,
                height: 64,
                background: "#161e28",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                position: "relative",
                zIndex: 1,
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#00e5a0",
                }}
              >
                {num}
              </span>
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 10,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </div>
            <p
              style={{
                fontSize: 14,
                color: "#8a98a8",
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 960px) {
          [data-steps-grid] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
