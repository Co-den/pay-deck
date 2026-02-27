"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TRANSACTIONS = [
  { name: "Chidi Okeke", type: "Salary · Engineering", amount: "-$3,400", dir: "out", initials: "CO", color: "#3b82f6", status: "done" },
  { name: "Fatima Al-Rashid", type: "Invoice #INV-2041", amount: "+$8,200", dir: "in", initials: "FR", color: "#8b5cf6", status: "done" },
  { name: "Marcus Chen", type: "Expense Reimbursement", amount: "-$340", dir: "out", initials: "MC", color: "#f59e0b", status: "done" },
  { name: "Amara Diallo", type: "Salary · Design", amount: "-$2,800", dir: "out", initials: "AD", color: "#ec4899", status: "pending" },
  { name: "Joel Ferreira", type: "Global Transfer · BRL", amount: "-$1,200", dir: "out", initials: "JF", color: "#10b981", status: "done" },
];

const BAR_HEIGHTS = [35, 45, 30, 55, 48, 60, 52, 70, 65, 80, 75, 90];

export function Hero() {
  const [total, setTotal] = useState(284391);
  const [visibleTxns, setVisibleTxns] = useState(TRANSACTIONS.slice(0, 3));
  const [newRow, setNewRow] = useState(false);
  const txnIdxRef = useRef(3);

  useEffect(() => {
    const totalTimer = setInterval(() => {
      setTotal(t => t + Math.floor(Math.random() * 800 + 200));
    }, 3200);
    const txnTimer = setInterval(() => {
      const idx = txnIdxRef.current % TRANSACTIONS.length;
      setNewRow(true);
      setVisibleTxns(prev => [TRANSACTIONS[idx], ...prev.slice(0, 3)]);
      txnIdxRef.current++;
      setTimeout(() => setNewRow(false), 2000);
    }, 2800);
    return () => { clearInterval(totalTimer); clearInterval(txnTimer); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes txnIn  { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(0.8);} }

        .hero-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .hero-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .hero-dashboard { display: none !important; }
        }
      `}</style>

      <section style={{
        minHeight: "100vh",
        paddingTop: 88,
        paddingBottom: 80,
        paddingLeft: "clamp(20px, 4vw, 48px)",
        paddingRight: "clamp(20px, 4vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(0,229,160,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }} />
        {/* Orbs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)", top: "50%", right: -80, transform: "translateY(-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,212,245,0.05) 0%, transparent 70%)", top: "20%", left: -60, pointerEvents: "none" }} />

        <div className="hero-grid-layout" style={{ position: "relative", zIndex: 2 }}>

          {/* LEFT — text content, fully constrained */}
          <div style={{ minWidth: 0, width: "100%" }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,229,160,0.12)", border: "1px solid rgba(0,229,160,0.2)",
              borderRadius: 999, padding: "6px 14px 6px 8px", marginBottom: 28,
              animation: "fadeUp 0.7s 0.1s both",
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e5a0", animation: "pulseDot 2s infinite", flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", color: "#00e5a0", whiteSpace: "nowrap" }}>
                Now processing $1B+ monthly
              </span>
            </div>

            {/* H1 — clamp stops it overflowing on small screens */}
            <h1 style={{
              fontSize: "clamp(36px, 9vw, 76px)",
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: "-0.03em", marginBottom: 20,
              animation: "fadeUp 0.7s 0.2s both",
              wordBreak: "break-word",
            }}>
              Pay Everyone.<br />
              <span style={{ background: "linear-gradient(135deg, #00e5a0, #2dd4f5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Everything.
              </span><br />
              Instantly.
            </h1>

            {/* Sub */}
            <p style={{
              fontSize: "clamp(14px, 3.5vw, 17px)", lineHeight: 1.7, color: "#8a98a8",
              fontWeight: 400, marginBottom: 36,
              animation: "fadeUp 0.7s 0.3s both",
              maxWidth: "100%",
            }}>
              Paydeck is the all-in-one payments platform for modern businesses — payroll, invoices, global transfers, and expense management in one unified dashboard.
            </p>

            {/* CTAs — stack on very small screens */}
            <div style={{
              display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
              animation: "fadeUp 0.7s 0.4s both",
            }}>
              <Link href="/auth/signup" style={{ flexShrink: 0 }}>
                <button
                  style={{ background: "#00e5a0", color: "#080c10", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, padding: "13px 28px", borderRadius: 8, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 0 32px rgba(0,229,160,0.2)", transition: "transform 0.2s, box-shadow 0.2s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px rgba(0,229,160,0.35)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(0,229,160,0.2)"; }}>
                  Start for free →
                </button>
              </Link>
              <button
                style={{ background: "#161e28", color: "#e8edf2", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, padding: "13px 24px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.2s", flexShrink: 0, whiteSpace: "nowrap" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#1c2636"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#161e28"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                Watch demo
              </button>
            </div>

            {/* Trust */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 28, flexWrap: "wrap", animation: "fadeUp 0.7s 0.5s both" }}>
              <div style={{ display: "flex" }}>
                {[
                  { initials: "AK", bg: "#3b82f6" }, { initials: "RJ", bg: "#8b5cf6" },
                  { initials: "NW", bg: "#f59e0b" }, { initials: "EM", bg: "#ec4899" },
                  { initials: "+", bg: "#10b981" },
                ].map((av, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #080c10", marginLeft: i === 0 ? 0 : -8, background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: "#fff", flexShrink: 0 }}>
                    {av.initials}
                  </div>
                ))}
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8a98a8" }}>
                Trusted by <strong style={{ color: "#00e5a0", fontWeight: 500 }}>40,000+</strong> businesses worldwide
              </span>
            </div>
          </div>

          {/* RIGHT — Dashboard (hidden on mobile via CSS) */}
          <div className="hero-dashboard" style={{ animation: "fadeUp 0.9s 0.3s both", minWidth: 0 }}>
            <div style={{ background: "#161e28", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
              {/* Window chrome */}
              <div style={{ background: "#0d1218", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#4a5568", letterSpacing: "0.06em", flex: 1, textAlign: "center" }}>
                  paydeck.io/dashboard
                </span>
              </div>
              <div style={{ padding: 20 }}>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {[
                    { label: "Total Paid", value: "$" + total.toLocaleString(), color: "#00e5a0", change: "↑ 12.4%", changeColor: "#00e5a0" },
                    { label: "Employees", value: "148", color: "#e8edf2", change: "↑ 3 new", changeColor: "#2dd4f5" },
                    { label: "Pending", value: "$12,840", color: "#f59e0b", change: "6 invoices", changeColor: "#4a5568" },
                  ].map(({ label, value, color, change, changeColor }) => (
                    <div key={label} style={{ background: "#121820", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px" }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#4a5568", marginBottom: 5 }}>{label}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 600, color, lineHeight: 1 }}>{value}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, marginTop: 3, color: changeColor }}>{change}</div>
                    </div>
                  ))}
                </div>
                {/* Chart */}
                <div style={{ background: "#121820", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px", marginBottom: 14, height: 76, overflow: "hidden" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#4a5568", marginBottom: 6 }}>Payroll history — last 12 months</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 38 }}>
                    {BAR_HEIGHTS.map((h, i) => (
                      <div key={i} style={{ flex: 1, borderRadius: "2px 2px 0 0", height: `${h}%`, background: i === 11 ? "rgba(0,229,160,0.4)" : "rgba(0,229,160,0.12)", borderTop: `1px solid ${i === 11 ? "#00e5a0" : "rgba(0,229,160,0.3)"}` }} />
                    ))}
                  </div>
                </div>
                {/* Txns */}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#4a5568", marginBottom: 8 }}>Live transactions</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {visibleTxns.map((txn, i) => (
                    <div key={`${txn.name}-${i}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 8px", borderRadius: 7, background: "#121820", border: `1px solid ${i === 0 && newRow ? "rgba(0,229,160,0.3)" : "rgba(255,255,255,0.07)"}`, transition: "border-color 0.5s", animation: i === 0 ? "txnIn 0.4s ease both" : "none" }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${txn.color}20`, color: txn.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700, flexShrink: 0 }}>{txn.initials}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500, color: "#e8edf2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{txn.name}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: "#4a5568" }}>{txn.type}</div>
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, color: txn.dir === "in" ? "#00e5a0" : "#ff4d6a", flexShrink: 0 }}>{txn.amount}</div>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: txn.status === "done" ? "#00e5a0" : "#f59e0b", flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}