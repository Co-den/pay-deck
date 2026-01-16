"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  User,
  Building2,
  Info,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { register, type RegisterRequest } from "@/lib/api/auth";

// Types
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

export default function SignUp() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("individual");

  // Individual form data
  const [individualData, setIndividualData] = useState<IndividualFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  // Business form data
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Validation functions
  const validateIndividualForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!individualData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (individualData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!individualData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (individualData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!individualData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(individualData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!individualData.password) {
      newErrors.password = "Password is required";
    } else if (individualData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(individualData.password)
    ) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!individualData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (individualData.password !== individualData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const validateBusinessForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!businessData.businessName?.trim()) {
      newErrors.businessName = "Business name is required";
    } else if (businessData.businessName.trim().length < 2) {
      newErrors.businessName = "Business name must be at least 2 characters";
    }

    if (!businessData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!businessData.rcNumber?.trim()) {
      newErrors.rcNumber = "RC Number is required (CAC Registration Number)";
    } else if (!/^RC\d{6,}$/i.test(businessData.rcNumber.replace(/\s/g, ""))) {
      newErrors.rcNumber = "Invalid RC Number format (e.g., RC123456)";
    }

    if (!businessData.nin?.trim()) {
      newErrors.nin = "National Identity Number (NIN) is required";
    } else if (!/^\d{11}$/.test(businessData.nin.replace(/\s/g, ""))) {
      newErrors.nin = "NIN must be 11 digits";
    }

    if (!businessData.taxId?.trim()) {
      newErrors.taxId = "Tax ID (TIN) is required";
    } else if (!/^\d{10,}$/.test(businessData.taxId.replace(/[\s-]/g, ""))) {
      newErrors.taxId = "Invalid Tax ID format (minimum 10 digits)";
    }

    if (!businessData.businessType) {
      newErrors.businessType = "Business type is required";
    }

    if (!businessData.password) {
      newErrors.password = "Password is required";
    } else if (businessData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(businessData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!businessData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (businessData.password !== businessData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Change handlers
  const handleIndividualChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setIndividualData((prev) => ({ ...prev, [name]: value }));

    // Clear field error
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear API error
    if (apiError) {
      setApiError(null);
    }
  };

  const handleBusinessChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setBusinessData((prev) => ({ ...prev, [name]: value }));

    // Clear field error
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear API error
    if (apiError) {
      setApiError(null);
    }
  };

  const handleBusinessTypeChange = (value: string): void => {
    setBusinessData((prev) => ({ ...prev, businessType: value }));

    // Clear business type error
    if (errors.businessType) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.businessType;
        return newErrors;
      });
    }
  };

  const handleAccountTypeChange = (value: string): void => {
    setAccountType(value as AccountType);
    // Clear all errors when switching account types
    setErrors({});
    setApiError(null);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Validate based on account type
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
        // For individual, combine first and last name as business name
        registerData = {
          businessName: `${individualData.firstName} ${individualData.lastName}`,
          email: individualData.email,
          password: individualData.password,
          phone: individualData.phone || undefined,
          businessType: "individual",
          accountType: "individual",
        };
      } else {
        // For business, send all business data
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

      // Call register API
      const response = await register(registerData);

      // Check if registration was successful
      if (response.status === "success") {
        // Token is automatically stored by the API client
        setSuccess(true);

        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        // Handle API error response
        const errorMessage =
          response.message ||
          response.error ||
          "Failed to create account. Please try again.";

        setApiError(errorMessage);
        setLoading(false);
      }
    } catch (error: any) {
      // Handle network or unexpected errors
      console.error("Registration error:", error);

      const errorMessage =
        error.message || "An unexpected error occurred. Please try again.";

      setApiError(errorMessage);
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <Card className="border-0 shadow-xl max-w-md w-full">
          <CardContent className="pt-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome to PayPort!</h2>
            <p className="text-muted-foreground mb-6">
              {accountType === "business"
                ? "Your business account has been created. We'll verify your documents and activate your account within 24-48 hours."
                : "Your account has been created successfully. Redirecting to your dashboard..."}
            </p>
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-600" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Registration form
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <Card className="border-0 shadow-xl max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Create your PayPort account</CardTitle>
          <CardDescription>
            Join PayPort and start accepting payments in minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Account Type Tabs */}
          <Tabs
            value={accountType}
            onValueChange={handleAccountTypeChange}
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="individual" className="gap-2">
                <User className="w-4 h-4" />
                Individual
              </TabsTrigger>
              <TabsTrigger value="business" className="gap-2">
                <Building2 className="w-4 h-4" />
                Business
              </TabsTrigger>
            </TabsList>

            {/* Individual Account Form */}
            <TabsContent value="individual">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* API Error Alert */}
                {apiError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{apiError}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={individualData.firstName}
                      onChange={handleIndividualChange}
                      className={errors.firstName ? "border-red-500" : ""}
                      disabled={loading}
                      autoComplete="given-name"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={individualData.lastName}
                      onChange={handleIndividualChange}
                      className={errors.lastName ? "border-red-500" : ""}
                      disabled={loading}
                      autoComplete="family-name"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={individualData.email}
                    onChange={handleIndividualChange}
                    className={errors.email ? "border-red-500" : ""}
                    disabled={loading}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+234 xxx xxx xxxx"
                    value={individualData.phone}
                    onChange={handleIndividualChange}
                    disabled={loading}
                    autoComplete="tel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={individualData.password}
                      onChange={handleIndividualChange}
                      className={
                        errors.password ? "border-red-500 pr-10" : "pr-10"
                      }
                      disabled={loading}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={loading}
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                  {!errors.password && (
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters with uppercase, lowercase,
                      and number
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={individualData.confirmPassword}
                      onChange={handleIndividualChange}
                      className={
                        errors.confirmPassword
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                      disabled={loading}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={loading}
                      tabIndex={-1}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Individual Account"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Business Account Form */}
            <TabsContent value="business">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* API Error Alert */}
                {apiError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{apiError}</AlertDescription>
                  </Alert>
                )}

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Business Verification Required:</strong> Your
                    account will be verified within 24-48 hours. Please ensure
                    all information matches your CAC registration.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    Registered Business Name *
                  </Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder="Acme Nigeria Limited"
                    value={businessData.businessName}
                    onChange={handleBusinessChange}
                    className={errors.businessName ? "border-red-500" : ""}
                    disabled={loading}
                    autoComplete="organization"
                  />
                  {errors.businessName && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.businessName}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Must match your CAC registration
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select
                    value={businessData.businessType}
                    onValueChange={handleBusinessTypeChange}
                    disabled={loading}
                  >
                    <SelectTrigger
                      id="businessType"
                      className={errors.businessType ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="limited_company">
                        Limited Company
                      </SelectItem>
                      <SelectItem value="plc">
                        Public Limited Company (PLC)
                      </SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="sole_proprietorship">
                        Sole Proprietorship
                      </SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                      <SelectItem value="cooperative">
                        Cooperative Society
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.businessType && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.businessType}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rcNumber">
                    RC Number (CAC Registration) *
                  </Label>
                  <Input
                    id="rcNumber"
                    name="rcNumber"
                    placeholder="RC123456"
                    value={businessData.rcNumber}
                    onChange={handleBusinessChange}
                    className={errors.rcNumber ? "border-red-500" : ""}
                    disabled={loading}
                  />
                  {errors.rcNumber && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.rcNumber}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Your Corporate Affairs Commission registration number
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nin">
                      National Identity Number (NIN) *
                    </Label>
                    <Input
                      id="nin"
                      name="nin"
                      placeholder="12345678901"
                      maxLength={11}
                      value={businessData.nin}
                      onChange={handleBusinessChange}
                      className={errors.nin ? "border-red-500" : ""}
                      disabled={loading}
                    />
                    {errors.nin && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.nin}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID (TIN) *</Label>
                    <Input
                      id="taxId"
                      name="taxId"
                      placeholder="1234567890"
                      value={businessData.taxId}
                      onChange={handleBusinessChange}
                      className={errors.taxId ? "border-red-500" : ""}
                      disabled={loading}
                    />
                    {errors.taxId && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.taxId}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email *</Label>
                  <Input
                    id="businessEmail"
                    name="email"
                    type="email"
                    placeholder="contact@acme.com.ng"
                    value={businessData.email}
                    onChange={handleBusinessChange}
                    className={errors.email ? "border-red-500" : ""}
                    disabled={loading}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessPhone">
                    Business Phone (optional)
                  </Label>
                  <Input
                    id="businessPhone"
                    name="phone"
                    type="tel"
                    placeholder="+234 xxx xxx xxxx"
                    value={businessData.phone}
                    onChange={handleBusinessChange}
                    disabled={loading}
                    autoComplete="tel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessPassword">Password *</Label>
                  <div className="relative">
                    <Input
                      id="businessPassword"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={businessData.password}
                      onChange={handleBusinessChange}
                      className={
                        errors.password ? "border-red-500 pr-10" : "pr-10"
                      }
                      disabled={loading}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={loading}
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                  {!errors.password && (
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters with uppercase, lowercase,
                      and number
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessConfirmPassword">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="businessConfirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={businessData.confirmPassword}
                      onChange={handleBusinessChange}
                      className={
                        errors.confirmPassword
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                      disabled={loading}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={loading}
                      tabIndex={-1}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Business Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Sign In Link */}
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-purple-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Terms & Privacy */}
          <p className="mt-4 text-xs text-center text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-purple-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-purple-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
