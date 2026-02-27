import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Paydeck",
  description: "Sign in or create your Paydeck account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#080c10]">
      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex flex-col justify-between p-12 border-r border-[rgba(255,255,255,0.07)] bg-[#0d1218] relative overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,229,160,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow orb */}
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Logo + headline */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 rounded-xl bg-[#00e5a0] flex items-center justify-center text-[#080c10] font-bold text-base">
              P
            </div>
            <span className="text-xl font-bold text-[#e8edf2]">
              Pay<span className="text-[#00e5a0]">Port</span>
            </span>
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight mb-4 text-[#e8edf2]">
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
          </h2>
          <p className="text-[#8a98a8] text-base leading-relaxed max-w-xs font-mono">
            The all-in-one payments platform — payroll, invoices, global
            transfers, and expense management unified.
          </p>
        </div>

        {/* Stats row */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: "Businesses", value: "40k+" },
            { label: "Monthly Volume", value: "$1B+" },
            { label: "Countries", value: "60+" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] p-4"
            >
              <div className="text-xl font-bold text-[#00e5a0] font-mono">
                {value}
              </div>
              <div className="text-xs font-mono text-[#4a5568] mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right content panel ── */}
      <div className="flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile-only logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#00e5a0] flex items-center justify-center text-[#080c10] font-bold text-sm">
              P
            </div>
            <span className="text-lg font-bold text-[#e8edf2]">
              Pay<span className="text-[#00e5a0]">Port</span>
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
