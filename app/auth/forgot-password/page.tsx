"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Mail,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1500);
  };

  // ── Success state ───────────────────────────────────────────────────────────
  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(0,229,160,0.1)] border border-[rgba(0,229,160,0.2)] flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[#00e5a0]" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-3">
          Check your email
        </h2>
        <p className="text-sm font-mono text-[#8a98a8] leading-relaxed mb-2">
          We've sent a password reset link to
        </p>
        <p className="text-sm font-mono font-semibold text-[#00e5a0] mb-8">
          {email}
        </p>
        <p className="text-xs font-mono text-[#4a5568] mb-6">
          Didn't receive it? Check your spam folder or{" "}
          <button
            onClick={() => setSent(false)}
            className="text-[#00e5a0] hover:text-[#00e5a0]/70 transition-colors underline"
          >
            try again
          </button>
          .
        </p>
        <Link href="/auth/login">
          <button className="w-full h-11 rounded-lg border border-[rgba(255,255,255,0.07)] bg-[#161e28] hover:bg-[#1c2636] hover:border-[rgba(255,255,255,0.12)] flex items-center justify-center gap-2 text-sm font-semibold text-[#e8edf2] transition-all">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </button>
        </Link>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div>
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-2 text-xs font-mono text-[#4a5568] hover:text-[#8a98a8] transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
      </Link>

      <div className="w-12 h-12 rounded-xl bg-[rgba(0,229,160,0.1)] border border-[rgba(0,229,160,0.15)] flex items-center justify-center mb-6">
        <Mail className="w-6 h-6 text-[#00e5a0]" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight mb-1">
        Reset your password
      </h1>
      <p className="text-sm font-mono text-[#8a98a8] mb-8">
        Enter your email and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono tracking-wide text-[#8a98a8] mb-1.5">
            Email address <span className="text-[#00e5a0]">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              disabled={loading}
              className={[
                "w-full h-11 rounded-lg border bg-[#161e28] pl-10 pr-4 text-sm text-[#e8edf2]",
                "placeholder:text-[#4a5568] font-mono transition-all outline-none disabled:opacity-50",
                error
                  ? "border-[rgba(255,77,106,0.5)] focus:border-[#ff4d6a] focus:ring-1 focus:ring-[rgba(255,77,106,0.2)]"
                  : "border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.12)] focus:border-[rgba(0,229,160,0.4)] focus:ring-1 focus:ring-[rgba(0,229,160,0.15)]",
              ].join(" ")}
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568] pointer-events-none" />
          </div>
          {error && (
            <p className="flex items-center gap-1 text-xs font-mono text-[#ff4d6a] mt-1.5">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-lg bg-[#00e5a0] text-[#080c10] font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-[#00e5a0]/90 shadow-[0_0_24px_rgba(0,229,160,0.2)] hover:shadow-[0_0_40px_rgba(0,229,160,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
}
