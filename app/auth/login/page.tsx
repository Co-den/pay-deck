"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ArrowRight,
  Mail,
  Lock,
} from "lucide-react";
import { login } from "@/lib/api/auth";

// ── Shared primitives ─────────────────────────────────────────────────────────

function PdInput({
  error,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={[
        "w-full h-11 rounded-lg border bg-[#161e28] px-4 text-sm text-[#e8edf2]",
        "placeholder:text-[#4a5568] font-mono transition-all outline-none",
        error
          ? "border-[rgba(255,77,106,0.5)] focus:border-[#ff4d6a] focus:ring-1 focus:ring-[rgba(255,77,106,0.2)]"
          : "border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.12)] focus:border-[rgba(0,229,160,0.4)] focus:ring-1 focus:ring-[rgba(0,229,160,0.15)]",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 text-xs font-mono text-[#ff4d6a] mt-1">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {msg}
    </p>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormData {
  email: string;
  password: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Invalid email address";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 6) e.password = "Min. 6 characters";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[name];
        return n;
      });
    if (apiError) setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const response = await login(formData);
      if (response.status === "success") {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setApiError(
          response.message ||
            response.error ||
            "Failed to sign in. Check your credentials.",
        );
        setLoading(false);
      }
    } catch (error: any) {
      setApiError(error.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  // ── Success state ───────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(0,229,160,0.1)] border border-[rgba(0,229,160,0.2)] flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[#00e5a0]" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          Welcome back!
        </h2>
        <p className="text-sm font-mono text-[#8a98a8] mb-6">
          Successfully signed in. Redirecting to your dashboard…
        </p>
        <Loader2 className="w-5 h-5 animate-spin text-[#00e5a0] mx-auto" />
      </div>
    );
  }

  // ── Login form ──────────────────────────────────────────────────────────────
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">
        Sign in to Paydeck
      </h1>
      <p className="text-sm font-mono text-[#8a98a8] mb-8">
        Enter your credentials to access your account
      </p>

      {/* API error */}
      {apiError && (
        <div className="mb-5 rounded-xl bg-[rgba(255,77,106,0.08)] border border-[rgba(255,77,106,0.2)] px-4 py-3 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-[#ff4d6a] mt-0.5 flex-shrink-0" />
          <p className="text-sm font-mono text-[#ff4d6a]">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-mono tracking-wide text-[#8a98a8] mb-1.5">
            Email <span className="text-[#00e5a0]">*</span>
          </label>
          <div className="relative">
            <PdInput
              type="email"
              name="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              disabled={loading}
              autoComplete="email"
              className="pl-10"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568] pointer-events-none" />
          </div>
          <FieldError msg={errors.email} />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono tracking-wide text-[#8a98a8]">
              Password <span className="text-[#00e5a0]">*</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-mono text-[#00e5a0] hover:text-[#00e5a0]/70 transition-colors"
              tabIndex={-1}
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <PdInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              disabled={loading}
              autoComplete="current-password"
              className="pl-10 pr-10"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568] pointer-events-none" />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#8a98a8] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <FieldError msg={errors.password} />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 mt-2 rounded-lg bg-[#00e5a0] text-[#080c10] font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-[#00e5a0]/90 shadow-[0_0_24px_rgba(0,229,160,0.2)] hover:shadow-[0_0_40px_rgba(0,229,160,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
            </>
          ) : (
            <>
              Sign In <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Divider + OAuth */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.07)]" />
        <span className="text-xs font-mono text-[#4a5568]">
          or continue with
        </span>
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.07)]" />
      </div>
      <button
        type="button"
        className="w-full h-11 rounded-lg border border-[rgba(255,255,255,0.07)] bg-[#161e28] hover:bg-[#1c2636] hover:border-[rgba(255,255,255,0.12)] flex items-center justify-center gap-2.5 text-sm font-semibold text-[#e8edf2] transition-all"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      {/* Footer */}
      <p className="mt-6 text-center text-sm font-mono text-[#8a98a8]">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-[#00e5a0] hover:text-[#00e5a0]/70 font-semibold transition-colors"
        >
          Sign up free
        </Link>
      </p>
    </div>
  );
}
