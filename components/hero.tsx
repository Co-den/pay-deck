"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const TRANSACTIONS = [
  {
    name: "Chidi Okeke",
    type: "Salary · Engineering",
    amount: "-$3,400",
    dir: "out",
    initials: "CO",
    color: "#3b82f6",
    status: "done",
  },
  {
    name: "Fatima Al-Rashid",
    type: "Invoice #INV-2041",
    amount: "+$8,200",
    dir: "in",
    initials: "FR",
    color: "#8b5cf6",
    status: "done",
  },
  {
    name: "Marcus Chen",
    type: "Expense Reimbursement",
    amount: "-$340",
    dir: "out",
    initials: "MC",
    color: "#f59e0b",
    status: "done",
  },
  {
    name: "Amara Diallo",
    type: "Salary · Design",
    amount: "-$2,800",
    dir: "out",
    initials: "AD",
    color: "#ec4899",
    status: "pending",
  },
  {
    name: "Joel Ferreira",
    type: "Global Transfer · BRL",
    amount: "-$1,200",
    dir: "out",
    initials: "JF",
    color: "#10b981",
    status: "done",
  },
];

const BAR_HEIGHTS = [35, 45, 30, 55, 48, 60, 52, 70, 65, 80, 75, 90];

export function Hero() {
  const [total, setTotal] = useState(284391);
  const [visibleTxns, setVisibleTxns] = useState(TRANSACTIONS.slice(0, 3));
  const [newRowIdx, setNewRowIdx] = useState(-1);
  const txnIdxRef = useRef(3);

  useEffect(() => {
    const totalTimer = setInterval(() => {
      setTotal((t) => t + Math.floor(Math.random() * 800 + 200));
    }, 3200);

    const txnTimer = setInterval(() => {
      const idx = txnIdxRef.current % TRANSACTIONS.length;
      setNewRowIdx(idx);
      setVisibleTxns((prev) => [TRANSACTIONS[idx], ...prev.slice(0, 3)]);
      txnIdxRef.current++;
      setTimeout(() => setNewRowIdx(-1), 2000);
    }, 2800);

    return () => {
      clearInterval(totalTimer);
      clearInterval(txnTimer);
    };
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "120px 48px 80px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(0,229,160,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
      {/* Orbs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)",
          top: "50%",
          right: -100,
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(45,212,245,0.05) 0%, transparent 70%)",
          top: "20%",
          left: -80,
          pointerEvents: "none",
        }}
      />

      {/* LEFT */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,229,160,0.12)",
            border: "1px solid rgba(0,229,160,0.2)",
            borderRadius: 999,
            padding: "6px 14px 6px 8px",
            marginBottom: 32,
            animation: "fadeUp 0.7s 0.1s both",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00e5a0",
              animation: "pulseDot 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "#00e5a0",
            }}
          >
            Now processing $1B+ monthly
          </span>
        </div>

        {/* H1 */}
        <h1
          style={{
            fontSize: "clamp(44px, 5.5vw, 76px)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginBottom: 24,
            animation: "fadeUp 0.7s 0.2s both",
          }}
        >
          Pay Everyone.
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00e5a0, #2dd4f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Everything.
          </span>
          <br />
          Instantly.
        </h1>

        {/* Sub */}
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: "#8a98a8",
            fontWeight: 400,
            maxWidth: 440,
            marginBottom: 40,
            animation: "fadeUp 0.7s 0.3s both",
          }}
        >
          PayPort is the all-in-one payments platform for modern businesses
          payroll, invoices, global transfers, and expense management in one
          unified dashboard.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
            animation: "fadeUp 0.7s 0.4s both",
          }}
        >
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
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 0 32px rgba(0,229,160,0.2)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 48px rgba(0,229,160,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 32px rgba(0,229,160,0.2)";
              }}
            >
              Start for free →
            </button>
          </Link>
          <button
            style={{
              background: "#161e28",
              color: "#e8edf2",
              fontFamily: "'Syne', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              padding: "14px 28px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.12)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#1c2636")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#161e28")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
            Watch demo
          </button>
        </div>

        {/* Trust row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 32,
            animation: "fadeUp 0.7s 0.5s both",
          }}
        >
          <div style={{ display: "flex" }}>
            {[
              { initials: "AK", bg: "#3b82f6" },
              { initials: "RJ", bg: "#8b5cf6" },
              { initials: "NW", bg: "#f59e0b" },
              { initials: "EM", bg: "#ec4899" },
              { initials: "+", bg: "#10b981" },
            ].map((av, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "2px solid #080c10",
                  marginLeft: i === 0 ? 0 : -8,
                  background: av.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {av.initials}
              </div>
            ))}
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "#8a98a8",
            }}
          >
            Trusted by{" "}
            <strong style={{ color: "#00e5a0", fontWeight: 500 }}>
              40,000+
            </strong>{" "}
            businesses worldwide
          </span>
        </div>
      </div>

      {/* RIGHT — Dashboard */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          animation: "fadeUp 0.9s 0.3s both",
        }}
      >
        <div
          style={{
            background: "#161e28",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
          }}
        >
          {/* Window chrome */}
          <div
            style={{
              background: "#0d1218",
              padding: "14px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#4a5568",
                letterSpacing: "0.06em",
                flex: 1,
                textAlign: "center",
              }}
            >
              PayPort.io/dashboard
            </span>
          </div>

          <div style={{ padding: 20 }}>
            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
                marginBottom: 16,
              }}
            >
              {[
                {
                  label: "Total Paid",
                  value: "$" + total.toLocaleString(),
                  color: "#00e5a0",
                  change: "↑ 12.4% this month",
                  changeColor: "#00e5a0",
                },
                {
                  label: "Employees",
                  value: "148",
                  color: "#e8edf2",
                  change: "↑ 3 new",
                  changeColor: "#2dd4f5",
                },
                {
                  label: "Pending",
                  value: "$12,840",
                  color: "#f59e0b",
                  change: "6 invoices",
                  changeColor: "#4a5568",
                },
              ].map(({ label, value, color, change, changeColor }) => (
                <div
                  key={label}
                  style={{
                    background: "#121820",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 10,
                    padding: "14px 16px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color: "#4a5568",
                      marginBottom: 6,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 18,
                      fontWeight: 600,
                      color,
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      marginTop: 4,
                      color: changeColor,
                    }}
                  >
                    {change}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div
              style={{
                background: "#121820",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 16,
                height: 80,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "#4a5568",
                  marginBottom: 8,
                }}
              >
                Payroll history — last 12 months
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 3,
                  height: 40,
                }}
              >
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      borderRadius: "2px 2px 0 0",
                      height: `${h}%`,
                      background:
                        i === 11
                          ? "rgba(0,229,160,0.4)"
                          : "rgba(0,229,160,0.12)",
                      borderTop: `1px solid ${i === 11 ? "#00e5a0" : "rgba(0,229,160,0.3)"}`,
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Transactions */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "#4a5568",
                marginBottom: 10,
              }}
            >
              Live transactions
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {visibleTxns.map((txn, i) => (
                <div
                  key={`${txn.name}-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderRadius: 8,
                    background: "#121820",
                    border: `1px solid ${i === 0 && newRowIdx !== -1 ? "rgba(0,229,160,0.3)" : "rgba(255,255,255,0.07)"}`,
                    transition: "border-color 0.5s",
                    animation: i === 0 ? "txnIn 0.4s ease both" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: `${txn.color}20`,
                      color: txn.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {txn.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#e8edf2",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {txn.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        color: "#4a5568",
                        marginTop: 1,
                      }}
                    >
                      {txn.type}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: 600,
                      color: txn.dir === "in" ? "#00e5a0" : "#ff4d6a",
                      flexShrink: 0,
                    }}
                  >
                    {txn.amount}
                  </div>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: txn.status === "done" ? "#00e5a0" : "#f59e0b",
                      flexShrink: 0,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes txnIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
        @media (max-width: 960px) {
          section[data-hero] { grid-template-columns: 1fr !important; padding: 100px 24px 60px !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
