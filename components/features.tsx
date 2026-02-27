"use client";

import { useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: "💸", title: "Smart Payroll Engine", large: true,
    desc: "Automate your entire payroll cycle — from calculation to disbursement. Handle taxes, pension deductions, and compliance filings automatically. Supports weekly, bi-weekly, and monthly schedules across 60+ countries.",
    bigNum: "60+", bigLabel: "countries supported", tag: "Live in 2 mins",
  },
  { icon: "🌍", title: "Global Transfers", desc: "Send money across borders in seconds. Real exchange rates, zero hidden fees." },
  { icon: "📄", title: "Smart Invoicing", desc: "Create, send, and track invoices. Auto-reminders for overdue payments." },
  { icon: "💳", title: "Expense Cards", desc: "Issue virtual and physical cards to your team with real-time spending controls." },
  { icon: "📊", title: "Analytics & Reports", desc: "Deep insights into payroll, spend, and cash flow. Export-ready for your accountant." },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, parseInt(el.dataset.delay || "0"));
        }
      });
    }, { threshold: 0.1 });

    ref.current?.querySelectorAll("[data-feat]").forEach((el, i) => {
      (el as HTMLElement).dataset.delay = String(i * 80);
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 16px;
          margin-top: 56px;
        }
        .feat-large { grid-row: span 2; }
        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .feat-large { grid-row: span 1 !important; }
        }
        @media (max-width: 600px) {
          .features-grid { gap: 12px !important; }
        }
      `}</style>

      <section style={{
        padding: "80px clamp(20px, 4vw, 48px)",
        background: "#0d1218",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        {/* Tag */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#00e5a0", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "inline-block", width: 20, height: 1, background: "#00e5a0", flexShrink: 0 }} />
          Features
        </div>
        <h2 style={{ fontSize: "clamp(28px, 7vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Everything payments.<br />One platform.
        </h2>

        <div ref={ref} className="features-grid">
          {FEATURES.map(({ icon, title, desc, large, bigNum, bigLabel, tag }, i) => (
            <div key={title} data-feat className={large ? "feat-large" : ""}
              style={{
                background: "#161e28",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: "clamp(20px, 3vw, 36px)",
                position: "relative", overflow: "hidden",
                opacity: 0, transform: "translateY(24px)",
                transition: "opacity 0.6s, transform 0.6s, border-color 0.3s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                const glow = (e.currentTarget as HTMLElement).querySelector("[data-glow]") as HTMLElement;
                if (glow) glow.style.opacity = "1";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                const glow = (e.currentTarget as HTMLElement).querySelector("[data-glow]") as HTMLElement;
                if (glow) glow.style.opacity = "0";
              }}>
              <div data-glow style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,160,0.25) 0%, transparent 70%)", pointerEvents: "none", opacity: 0, transition: "opacity 0.4s" }} />

              <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,229,160,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, fontSize: 20, flexShrink: 0 }}>{icon}</div>
              <div style={{ fontSize: large ? "clamp(18px, 3vw, 24px)" : 18, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.02em" }}>{title}</div>
              <p style={{ fontSize: 14, color: "#8a98a8", lineHeight: 1.65, fontWeight: 400 }}>{desc}</p>

              {large && bigNum && (
                <>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 600, color: "#00e5a0", lineHeight: 1, margin: "20px 0 8px" }}>{bigNum}</div>
                  <div style={{ fontSize: 13, color: "#8a98a8" }}>{bigLabel}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,229,160,0.12)", border: "1px solid rgba(0,229,160,0.2)", borderRadius: 999, padding: "4px 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#00e5a0", letterSpacing: "0.06em", marginTop: 18 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e5a0", flexShrink: 0 }} />
                    {tag}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}