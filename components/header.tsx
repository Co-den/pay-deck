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

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        background: scrolled ? "rgba(8,12,16,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.4s",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, background: "#00e5a0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 600, color: "#080c10" }}>₿</span>
          </div>
          <span style={{ color: "#e8edf2" }}>Pay<span style={{ color: "#00e5a0" }}>deck</span></span>
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <ul style={{ gap: 32, listStyle: "none", margin: 0, padding: 0 }} className="hidden md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 400, letterSpacing: "0.05em", color: "#8a98a8", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#e8edf2"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#8a98a8"}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop buttons — hidden on mobile */}
        {/* FIX: Removed `display: "flex"` from inline style — it was overriding the Tailwind
            `hidden` class, causing this div to always be visible and crowd out the hamburger */}
        <div className="hidden md:flex" style={{ gap: 12, alignItems: "center" }}>
          <Link href="/auth/login" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.05em", color: "#8a98a8", textDecoration: "none" }}>
            Sign in
          </Link>
          <Link href="/auth/signup">
            <button style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.05em", background: "#00e5a0", color: "#080c10", border: "none", padding: "9px 20px", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
              Get started free →
            </button>
          </Link>
        </div>

        {/* Hamburger — visible only on mobile */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, cursor: "pointer", padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5, flexShrink: 0 }}
        >
          <span style={{ display: "block", width: 18, height: 1.5, background: "#8a98a8", borderRadius: 2 }} />
          <span style={{ display: "block", width: 18, height: 1.5, background: "#8a98a8", borderRadius: 2 }} />
          <span style={{ display: "block", width: 12, height: 1.5, background: "#8a98a8", borderRadius: 2 }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300 }}>
          {/* Backdrop */}
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(8,12,16,0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "min(300px, 85vw)",
            background: "#0d1218", borderLeft: "1px solid rgba(255,255,255,0.07)",
            display: "flex", flexDirection: "column", padding: 24,
          }}>
            {/* Close */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 32 }}>
              <button onClick={() => setMobileOpen(false)}
                style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#8a98a8", fontSize: 18, cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                ×
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={label} href={href} onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: "#8a98a8", textDecoration: "none", padding: "12px 8px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "block" }}>
                  {label}
                </Link>
              ))}
            </nav>

            {/* CTAs at bottom */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 24 }}>
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                <button style={{ width: "100%", padding: "13px", borderRadius: 8, background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "#e8edf2", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                  Sign in
                </button>
              </Link>
              <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                <button style={{ width: "100%", padding: "13px", borderRadius: 8, background: "#00e5a0", border: "none", color: "#080c10", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 24px rgba(0,229,160,0.2)" }}>
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