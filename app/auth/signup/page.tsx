"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  User,
  Building2,
  Info,
  ArrowRight,
} from "lucide-react";
import { register, type RegisterRequest } from "@/lib/api/auth";

// ── Types ─────────────────────────────────────────────────────────────────────

interface IndividualFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface BusinessFormData {
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
  businessType: string;
  phone: string;
  rcNumber: string;
  nin: string;
  taxId: string;
}

type AccountType = "individual" | "business";

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
        "placeholder:text-[#4a5568] font-mono transition-all outline-none disabled:opacity-50",
        error
          ? "border-[rgba(255,77,106,0.5)] focus:border-[#ff4d6a] focus:ring-1 focus:ring-[rgba(255,77,106,0.2)]"
          : "border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.12)] focus:border-[rgba(0,229,160,0.4)] focus:ring-1 focus:ring-[rgba(0,229,160,0.15)]",
        className,
      ].join(" ")}
      {...props}
    />
  );
}

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-mono tracking-wide text-[#8a98a8]">
        {label}
        {required && <span className="text-[#00e5a0] ml-0.5">*</span>}
      </label>
      {children}
      {error ? (
        <p className="flex items-center gap-1 text-xs font-mono text-[#ff4d6a]">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      ) : (
        hint && <p className="text-xs font-mono text-[#4a5568]">{hint}</p>
      )}
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  error,
  show,
  onToggle,
  disabled,
  hint,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  show: boolean;
  onToggle: () => void;
  disabled?: boolean;
  hint?: string;
  autoComplete?: string;
}) {
  return (
    <Field label={label} error={error} required hint={hint}>
      <div className="relative">
        <PdInput
          type={show ? "text" : "password"}
          name={name}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          error={!!error}
          disabled={disabled}
          autoComplete={autoComplete}
          className="pr-10"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#8a98a8] transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </Field>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SignUp() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("individual");

  const [individualData, setIndividualData] = useState<IndividualFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [businessData, setBusinessData] = useState<BusinessFormData>({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    phone: "",
    rcNumber: "",
    nin: "",
    taxId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validateIndividualForm = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!individualData.firstName.trim())
      e.firstName = "First name is required";
    else if (individualData.firstName.trim().length < 2)
      e.firstName = "Min. 2 characters";
    if (!individualData.lastName.trim()) e.lastName = "Last name is required";
    else if (individualData.lastName.trim().length < 2)
      e.lastName = "Min. 2 characters";
    if (!individualData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(individualData.email))
      e.email = "Invalid email address";
    if (!individualData.password) e.password = "Password is required";
    else if (individualData.password.length < 8)
      e.password = "Min. 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(individualData.password))
      e.password = "Must include uppercase, lowercase, and number";
    if (!individualData.confirmPassword)
      e.confirmPassword = "Please confirm your password";
    else if (individualData.password !== individualData.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    return e;
  };

  const validateBusinessForm = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!businessData.businessName?.trim())
      e.businessName = "Business name is required";
    else if (businessData.businessName.trim().length < 2)
      e.businessName = "Min. 2 characters";
    if (!businessData.email?.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessData.email))
      e.email = "Invalid email address";
    if (!businessData.rcNumber?.trim()) e.rcNumber = "RC Number is required";
    else if (!/^RC\d{6,}$/i.test(businessData.rcNumber.replace(/\s/g, "")))
      e.rcNumber = "Invalid format (e.g. RC123456)";
    if (!businessData.nin?.trim()) e.nin = "NIN is required";
    else if (!/^\d{11}$/.test(businessData.nin.replace(/\s/g, "")))
      e.nin = "Must be 11 digits";
    if (!businessData.taxId?.trim()) e.taxId = "Tax ID (TIN) is required";
    else if (!/^\d{10,}$/.test(businessData.taxId.replace(/[\s-]/g, "")))
      e.taxId = "Min. 10 digits";
    if (!businessData.businessType)
      e.businessType = "Business type is required";
    if (!businessData.password) e.password = "Password is required";
    else if (businessData.password.length < 8) e.password = "Min. 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(businessData.password))
      e.password = "Must include uppercase, lowercase, and number";
    if (!businessData.confirmPassword)
      e.confirmPassword = "Please confirm your password";
    else if (businessData.password !== businessData.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    return e;
  };

  // ── Handlers ────────────────────────────────────────────────────────────────
  const clearField = (name: string) => {
    setErrors((prev) => {
      const n = { ...prev };
      delete n[name];
      return n;
    });
    if (apiError) setApiError(null);
  };

  const handleIndividualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndividualData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    clearField(e.target.name);
  };

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    clearField(e.target.name);
  };

  const handleBusinessTypeChange = (value: string) => {
    setBusinessData((prev) => ({ ...prev, businessType: value }));
    clearField("businessType");
  };

  const handleAccountTypeChange = (type: AccountType) => {
    setAccountType(type);
    setErrors({});
    setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors =
      accountType === "individual"
        ? validateIndividualForm()
        : validateBusinessForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      let registerData: RegisterRequest;
      if (accountType === "individual") {
        registerData = {
          businessName: `${individualData.firstName} ${individualData.lastName}`,
          email: individualData.email,
          password: individualData.password,
          phone: individualData.phone || undefined,
          businessType: "individual",
          accountType: "individual",
        };
      } else {
        registerData = {
          businessName: businessData.businessName,
          email: businessData.email,
          password: businessData.password,
          businessType: businessData.businessType,
          phone: businessData.phone || undefined,
          rcNumber: businessData.rcNumber || undefined,
          nin: businessData.nin || undefined,
          taxId: businessData.taxId || undefined,
          accountType: "business",
        };
      }

      const response = await register(registerData);
      if (response.status === "success") {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setApiError(
          response.message ||
            response.error ||
            "Failed to create account. Please try again.",
        );
        setLoading(false);
      }
    } catch (error: any) {
      setApiError(error.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  // ── Password strength ───────────────────────────────────────────────────────
  const pwd =
    accountType === "individual"
      ? individualData.password
      : businessData.password;
  const strength =
    pwd.length === 0 ? 0 : pwd.length < 6 ? 1 : pwd.length < 10 ? 2 : 3;
  const strengthColor = ["", "#ff4d6a", "#f59e0b", "#00e5a0"][strength];
  const strengthLabel = ["", "Weak", "Fair", "Strong"][strength];

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[rgba(0,229,160,0.1)] border border-[rgba(0,229,160,0.2)] flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[#00e5a0]" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-3">
          {accountType === "business"
            ? "Application submitted!"
            : "Welcome to Paydeck!"}
        </h2>
        <p className="text-sm font-mono text-[#8a98a8] leading-relaxed mb-6 max-w-xs mx-auto">
          {accountType === "business"
            ? "Your business account is under review. We'll verify your documents and activate your account within 24–48 hours."
            : "Your account has been created. Redirecting to your dashboard…"}
        </p>
        <Loader2 className="w-5 h-5 animate-spin text-[#00e5a0] mx-auto" />
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">
        Create your account
      </h1>
      <p className="text-sm font-mono text-[#8a98a8] mb-8">
        Start accepting payments in minutes
      </p>

      {/* Account type toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#0d1218] border border-[rgba(255,255,255,0.07)] mb-7">
        {(
          [
            ["individual", "Individual", User],
            ["business", "Business", Building2],
          ] as const
        ).map(([type, label, Icon]) => (
          <button
            key={type}
            type="button"
            onClick={() => handleAccountTypeChange(type)}
            className={[
              "flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all",
              accountType === type
                ? "bg-[rgba(0,229,160,0.1)] text-[#00e5a0] border border-[rgba(0,229,160,0.2)]"
                : "text-[#8a98a8] hover:text-[#e8edf2]",
            ].join(" ")}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* API error */}
      {apiError && (
        <div className="mb-5 rounded-xl bg-[rgba(255,77,106,0.08)] border border-[rgba(255,77,106,0.2)] px-4 py-3 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-[#ff4d6a] mt-0.5 flex-shrink-0" />
          <p className="text-sm font-mono text-[#ff4d6a]">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ══════ INDIVIDUAL ══════ */}
        {accountType === "individual" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" error={errors.firstName} required>
                <PdInput
                  name="firstName"
                  placeholder="John"
                  value={individualData.firstName}
                  onChange={handleIndividualChange}
                  error={!!errors.firstName}
                  disabled={loading}
                  autoComplete="given-name"
                />
              </Field>
              <Field label="Last Name" error={errors.lastName} required>
                <PdInput
                  name="lastName"
                  placeholder="Doe"
                  value={individualData.lastName}
                  onChange={handleIndividualChange}
                  error={!!errors.lastName}
                  disabled={loading}
                  autoComplete="family-name"
                />
              </Field>
            </div>

            <Field label="Email Address" error={errors.email} required>
              <PdInput
                type="email"
                name="email"
                placeholder="john@example.com"
                value={individualData.email}
                onChange={handleIndividualChange}
                error={!!errors.email}
                disabled={loading}
                autoComplete="email"
              />
            </Field>

            <Field label="Phone Number" hint="Optional">
              <PdInput
                type="tel"
                name="phone"
                placeholder="+234 xxx xxx xxxx"
                value={individualData.phone}
                onChange={handleIndividualChange}
                disabled={loading}
                autoComplete="tel"
              />
            </Field>

            <Field
              label="Password"
              error={errors.password}
              required
              hint={
                !errors.password
                  ? "Min. 8 characters with uppercase, lowercase, and number"
                  : undefined
              }
            >
              <div className="relative">
                <PdInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={individualData.password}
                  onChange={handleIndividualChange}
                  error={!!errors.password}
                  disabled={loading}
                  autoComplete="new-password"
                  className="pr-10"
                />
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
              {pwd && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i <= strength
                              ? strengthColor
                              : "rgba(255,255,255,0.07)",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: strengthColor }}
                  >
                    {strengthLabel}
                  </span>
                </div>
              )}
            </Field>

            <Field
              label="Confirm Password"
              error={errors.confirmPassword}
              required
            >
              <div className="relative">
                <PdInput
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={individualData.confirmPassword}
                  onChange={handleIndividualChange}
                  error={!!errors.confirmPassword}
                  disabled={loading}
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#8a98a8] transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Field>
          </>
        )}

        {/* ══════ BUSINESS ══════ */}
        {accountType === "business" && (
          <>
            {/* Verification notice */}
            <div className="rounded-xl bg-[rgba(45,212,245,0.06)] border border-[rgba(45,212,245,0.15)] px-4 py-3 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#2dd4f5] mt-0.5 flex-shrink-0" />
              <p className="text-xs font-mono text-[#2dd4f5] leading-relaxed">
                <strong className="font-semibold">
                  Business Verification Required —{" "}
                </strong>
                Activated within 24–48 hours. Ensure all info matches your CAC
                registration.
              </p>
            </div>

            <Field
              label="Registered Business Name"
              error={errors.businessName}
              hint={
                !errors.businessName
                  ? "Must match your CAC registration"
                  : undefined
              }
              required
            >
              <PdInput
                name="businessName"
                placeholder="Acme Nigeria Limited"
                value={businessData.businessName}
                onChange={handleBusinessChange}
                error={!!errors.businessName}
                disabled={loading}
                autoComplete="organization"
              />
            </Field>

            <Field label="Business Type" error={errors.businessType} required>
              <Select
                value={businessData.businessType}
                onValueChange={handleBusinessTypeChange}
                disabled={loading}
              >
                <SelectTrigger
                  className={[
                    "h-11 rounded-lg border bg-[#161e28] px-4 text-sm font-mono text-[#e8edf2] transition-all outline-none focus:ring-1 disabled:opacity-50",
                    errors.businessType
                      ? "border-[rgba(255,77,106,0.5)] focus:border-[#ff4d6a] focus:ring-[rgba(255,77,106,0.2)]"
                      : "border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.12)] focus:border-[rgba(0,229,160,0.4)] focus:ring-[rgba(0,229,160,0.15)]",
                  ].join(" ")}
                >
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent className="bg-[#161e28] border border-[rgba(255,255,255,0.12)] rounded-xl text-[#e8edf2] font-mono text-sm">
                  {[
                    ["limited_company", "Limited Company"],
                    ["plc", "Public Limited Company (PLC)"],
                    ["partnership", "Partnership"],
                    ["sole_proprietorship", "Sole Proprietorship"],
                    ["retail", "Retail"],
                    ["ecommerce", "E-commerce"],
                    ["saas", "SaaS"],
                    ["marketplace", "Marketplace"],
                    ["ngo", "NGO / Non-Profit"],
                    ["cooperative", "Cooperative Society"],
                    ["other", "Other"],
                  ].map(([value, label]) => (
                    <SelectItem
                      key={value}
                      value={value}
                      className="focus:bg-[rgba(0,229,160,0.08)] focus:text-[#00e5a0] cursor-pointer"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field
              label="RC Number (CAC Registration)"
              error={errors.rcNumber}
              hint={
                !errors.rcNumber
                  ? "Your Corporate Affairs Commission registration number"
                  : undefined
              }
              required
            >
              <PdInput
                name="rcNumber"
                placeholder="RC123456"
                value={businessData.rcNumber}
                onChange={handleBusinessChange}
                error={!!errors.rcNumber}
                disabled={loading}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="NIN" error={errors.nin} required>
                <PdInput
                  name="nin"
                  placeholder="12345678901"
                  maxLength={11}
                  value={businessData.nin}
                  onChange={handleBusinessChange}
                  error={!!errors.nin}
                  disabled={loading}
                />
              </Field>
              <Field label="Tax ID (TIN)" error={errors.taxId} required>
                <PdInput
                  name="taxId"
                  placeholder="1234567890"
                  value={businessData.taxId}
                  onChange={handleBusinessChange}
                  error={!!errors.taxId}
                  disabled={loading}
                />
              </Field>
            </div>

            <Field label="Business Email" error={errors.email} required>
              <PdInput
                type="email"
                name="email"
                placeholder="contact@acme.com.ng"
                value={businessData.email}
                onChange={handleBusinessChange}
                error={!!errors.email}
                disabled={loading}
                autoComplete="email"
              />
            </Field>

            <Field label="Business Phone" hint="Optional">
              <PdInput
                type="tel"
                name="phone"
                placeholder="+234 xxx xxx xxxx"
                value={businessData.phone}
                onChange={handleBusinessChange}
                disabled={loading}
                autoComplete="tel"
              />
            </Field>

            <Field
              label="Password"
              error={errors.password}
              required
              hint={
                !errors.password
                  ? "Min. 8 characters with uppercase, lowercase, and number"
                  : undefined
              }
            >
              <div className="relative">
                <PdInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={businessData.password}
                  onChange={handleBusinessChange}
                  error={!!errors.password}
                  disabled={loading}
                  autoComplete="new-password"
                  className="pr-10"
                />
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
              {pwd && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i <= strength
                              ? strengthColor
                              : "rgba(255,255,255,0.07)",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: strengthColor }}
                  >
                    {strengthLabel}
                  </span>
                </div>
              )}
            </Field>

            <Field
              label="Confirm Password"
              error={errors.confirmPassword}
              required
            >
              <div className="relative">
                <PdInput
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={businessData.confirmPassword}
                  onChange={handleBusinessChange}
                  error={!!errors.confirmPassword}
                  disabled={loading}
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5568] hover:text-[#8a98a8] transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Field>
          </>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 mt-2 rounded-lg bg-[#00e5a0] text-[#080c10] font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-[#00e5a0]/90 shadow-[0_0_24px_rgba(0,229,160,0.2)] hover:shadow-[0_0_40px_rgba(0,229,160,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Creating account…
            </>
          ) : (
            <>
              {accountType === "individual"
                ? "Create Individual Account"
                : "Create Business Account"}{" "}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm font-mono text-[#8a98a8]">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-[#00e5a0] hover:text-[#00e5a0]/70 font-semibold transition-colors"
        >
          Sign in
        </Link>
      </p>
      <p className="mt-3 text-xs text-center font-mono text-[#4a5568]">
        By creating an account, you agree to our{" "}
        <Link
          href="/terms"
          className="text-[#00e5a0]/70 hover:text-[#00e5a0] transition-colors"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="text-[#00e5a0]/70 hover:text-[#00e5a0] transition-colors"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
