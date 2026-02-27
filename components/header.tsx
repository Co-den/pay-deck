"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Product", href: "#" },
  { label: "Payroll", href: "#" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: "0 48px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          background: scrolled ? "rgba(8,12,16,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "all 0.4s",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "-0.5px",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "#00e5a0",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 600,
                color: "#080c10",
              }}
            >
              P
            </span>
          </div>
          <span style={{ color: "#e8edf2" }}>
            Pay<span style={{ color: "#00e5a0" }}>Port</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul
          style={{
            display: "flex",
            gap: 32,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  color: "#8a98a8",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#e8edf2")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#8a98a8")
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link
            href="/auth/login"
            className="hidden md:block"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.05em",
              color: "#8a98a8",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#e8edf2")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#8a98a8")
            }
          >
            Sign in
          </Link>
          <Link href="/auth/signup" className="hidden md:block">
            <button
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.05em",
                background: "#00e5a0",
                color: "#080c10",
                border: "none",
                padding: "9px 20px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 600,
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.88";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              Get started free →
            </button>
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 4,
            }}
          >
            <span
              style={{
                display: "block",
                width: 20,
                height: 1,
                background: "#8a98a8",
              }}
            />
            <span
              style={{
                display: "block",
                width: 20,
                height: 1,
                background: "#8a98a8",
              }}
            />
            <span
              style={{
                display: "block",
                width: 14,
                height: 1,
                background: "#8a98a8",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(8,12,16,0.9)",
              backdropFilter: "blur(20px)",
            }}
            onClick={() => setMobileOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 280,
              background: "#0d1218",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              flexDirection: "column",
              padding: 24,
              gap: 24,
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#8a98a8",
                  fontSize: 24,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    color: "#8a98a8",
                    textDecoration: "none",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                marginTop: "auto",
              }}
            >
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                <button
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 8,
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#e8edf2",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Sign in
                </button>
              </Link>
              <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                <button
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 8,
                    background: "#00e5a0",
                    border: "none",
                    color: "#080c10",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Get started free →
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
