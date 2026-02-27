"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    priceSup: "$",
    priceSub: "/mo",
    desc: "Perfect for freelancers and small teams just getting started.",
    features: [
      { text: "Up to 5 employees" },
      { text: "Local bank transfers" },
      { text: "Basic invoicing" },
      { text: "1 virtual card" },
      { text: "Global payroll", disabled: true },
      { text: "Expense cards", disabled: true },
      { text: "Priority support", disabled: true },
    ],
    cta: "Get started free",
    href: "/auth/signup",
    filled: false,
    popular: false,
  },
  {
    name: "Growth",
    price: "49",
    priceSup: "$",
    priceSub: "/mo",
    desc: "For growing teams that need global reach and full automation.",
    features: [
      { text: "Up to 100 employees" },
      { text: "Global transfers (60+ countries)" },
      { text: "Smart invoicing + auto-reminders" },
      { text: "10 virtual + 2 physical cards" },
      { text: "Automated payroll scheduling" },
      { text: "Analytics dashboard" },
      { text: "Priority support" },
    ],
    cta: "Start 14-day trial",
    href: "/auth/signup",
    filled: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSup: "",
    priceSub: "",
    desc: "Tailored for large organizations with complex compliance needs.",
    features: [
      { text: "Unlimited employees" },
      { text: "Multi-entity payroll" },
      { text: "Custom integrations (ERP/HRIS)" },
      { text: "Unlimited cards" },
      { text: "Dedicated account manager" },
      { text: "SLA-backed uptime" },
      { text: "Custom compliance & reporting" },
    ],
    cta: "Talk to sales",
    href: "/contact",
    filled: false,
    popular: false,
  },
];

export function Pricing() {
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

    ref.current?.querySelectorAll("[data-plan]").forEach((el, i) => {
      (el as HTMLElement).dataset.delay = String(i * 120);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      style={{
        padding: "100px 48px",
        background: "#0d1218",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
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
        Pricing
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
        Simple, honest pricing.
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
        No setup fees. No lock-in contracts. Start free and scale as you grow.
      </p>

      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          alignItems: "start",
        }}
      >
        {PLANS.map(
          ({
            name,
            price,
            priceSup,
            priceSub,
            desc,
            features,
            cta,
            href,
            filled,
            popular,
          }) => (
            <div
              key={name}
              data-plan
              style={{
                background: popular
                  ? "linear-gradient(135deg, rgba(0,229,160,0.05) 0%, #161e28 60%)"
                  : "#161e28",
                border: popular
                  ? "1px solid rgba(0,229,160,0.4)"
                  : "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: 36,
                position: "relative",
                overflow: "hidden",
                opacity: 0,
                transform: "translateY(24px)",
                transition: "opacity 0.6s, transform 0.6s",
              }}
            >
              {popular && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 24,
                    background: "#00e5a0",
                    color: "#080c10",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    padding: "4px 12px",
                    borderRadius: "0 0 8px 8px",
                  }}
                >
                  Most Popular
                </div>
              )}

              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "#8a98a8",
                  marginBottom: 20,
                }}
              >
                {name}
              </div>

              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 48,
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  marginBottom: 4,
                }}
              >
                <sup style={{ fontSize: 22, verticalAlign: "super" }}>
                  {priceSup}
                </sup>
                {price}
                <sub
                  style={{
                    fontSize: 14,
                    verticalAlign: "baseline",
                    color: "#8a98a8",
                  }}
                >
                  {priceSub}
                </sub>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#8a98a8",
                  marginBottom: 28,
                  lineHeight: 1.5,
                }}
              >
                {desc}
              </div>

              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                  marginBottom: 24,
                }}
              />

              <ul style={{ listStyle: "none", marginBottom: 32, padding: 0 }}>
                {features.map(({ text, disabled }) => (
                  <li
                    key={text}
                    style={{
                      fontSize: 13,
                      color: disabled ? "rgba(138,152,168,0.4)" : "#8a98a8",
                      padding: "7px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: disabled ? "#4a5568" : "#00e5a0",
                        flexShrink: 0,
                      }}
                    >
                      {disabled ? "—" : "✓"}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              <Link href={href}>
                <button
                  style={{
                    width: "100%",
                    padding: 13,
                    borderRadius: 8,
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    ...(filled
                      ? {
                          background: "#00e5a0",
                          border: "none",
                          color: "#080c10",
                          boxShadow: "0 0 24px rgba(0,229,160,0.2)",
                        }
                      : {
                          background: "none",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "#e8edf2",
                        }),
                  }}
                  onMouseEnter={(e) => {
                    if (filled) {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 40px rgba(0,229,160,0.35)";
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(-1px)";
                    } else {
                      (e.currentTarget as HTMLElement).style.background =
                        "#1c2636";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (filled) {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 24px rgba(0,229,160,0.2)";
                      (e.currentTarget as HTMLElement).style.transform = "";
                    } else {
                      (e.currentTarget as HTMLElement).style.background =
                        "none";
                    }
                  }}
                >
                  {cta}
                </button>
              </Link>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
