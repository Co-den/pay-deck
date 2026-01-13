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
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { register, type RegisterRequest } from "@/lib/api/auth";

// Extended registration request for business
interface ExtendedRegisterRequest extends RegisterRequest {
  businessType: any;
  confirmPassword: any;
  password: any;
  email: any;
  businessName: any;
  firstName?: string;
  lastName?: string;
  rcNumber?: string;
  nin?: string;
  taxId?: string;
  phone?: string;
  accountType: "individual" | "business";
}

export default function SignUp() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"individual" | "business">(
    "individual"
  );

  // Individual form data
  const [individualData, setIndividualData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  // Business form data
  const [businessData, setBusinessData] = useState<ExtendedRegisterRequest>({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    phone: "",
    rcNumber: "",
    nin: "",
    taxId: "",
    accountType: "business",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateIndividualForm = () => {
    const newErrors: Record<string, string> = {};

    if (!individualData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!individualData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!individualData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(individualData.email))
      newErrors.email = "Please enter a valid email";

    if (!individualData.password) newErrors.password = "Password is required";
    else if (individualData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(individualData.password))
      newErrors.password = "Password must contain an uppercase letter";
    else if (!/[0-9]/.test(individualData.password))
      newErrors.password = "Password must contain a number";

    if (!individualData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (individualData.password !== individualData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const validateBusinessForm = () => {
    const newErrors: Record<string, string> = {};

    if (!businessData.businessName?.trim())
      newErrors.businessName = "Business name is required";
    if (!businessData.email?.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessData.email))
      newErrors.email = "Please enter a valid email";

    if (!businessData.rcNumber?.trim())
      newErrors.rcNumber = "RC Number is required (CAC Registration Number)";
    else if (!/^RC\d{6,}$/i.test(businessData.rcNumber.replace(/\s/g, "")))
      newErrors.rcNumber = "Invalid RC Number format (e.g., RC123456)";

    if (!businessData.nin?.trim())
      newErrors.nin = "National Identity Number (NIN) is required";
    else if (!/^\d{11}$/.test(businessData.nin.replace(/\s/g, "")))
      newErrors.nin = "NIN must be 11 digits";

    if (!businessData.taxId?.trim())
      newErrors.taxId = "Tax ID (TIN) is required";
    else if (!/^\d{10,}$/.test(businessData.taxId.replace(/[\s-]/g, "")))
      newErrors.taxId = "Invalid Tax ID format";

    if (!businessData.businessType)
      newErrors.businessType = "Business type is required";

    if (!businessData.password) newErrors.password = "Password is required";
    else if (businessData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(businessData.password))
      newErrors.password = "Password must contain an uppercase letter";
    else if (!/[0-9]/.test(businessData.password))
      newErrors.password = "Password must contain a number";

    if (!businessData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (businessData.password !== businessData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleIndividualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIndividualData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError(null);
  };

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError(null);
  };

  const handleBusinessTypeChange = (value: string) => {
    setBusinessData((prev) => ({ ...prev, businessType: value }));
    if (errors.businessType) {
      setErrors((prev) => ({ ...prev, businessType: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation based on account type
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
          phone: individualData.phone,
          businessType: "individual",
          accountType: "individual",
        };
      } else {
        // For business, send all business data
        const { confirmPassword, ...dataToSend } = businessData;
        registerData = dataToSend as RegisterRequest;
      }

      // Call backend API
      const response = await register(registerData);

      // Success! Token is automatically stored
      setSuccess(true);

      // Redirect to API keys page for new users to create their first key
      setTimeout(() => {
        router.push("/dashboard/api-keys");
      }, 1500);
    } catch (error: any) {
      console.error("Registration error:", error);
      setApiError(
        error.message || "Failed to create account. Please try again."
      );
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="border-0 shadow-xl">
        <CardContent className="pt-8 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Welcome to SettleMe!</h2>
          <p className="text-muted-foreground mb-6">
            {accountType === "business"
              ? "Your business account has been created. We'll verify your documents and activate your account within 24-48 hours."
              : "Your account has been created successfully. Redirecting to your dashboard..."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl max-w-2xl">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Join SettleMe and start accepting payments in minutes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Account Type Tabs */}
        <Tabs
          value={accountType}
          onValueChange={(value) =>
            setAccountType(value as "individual" | "business")
          }
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual" className="gap-2">
              <User className="w-4 h-4" />
              Individual
            </TabsTrigger>
            <TabsTrigger value="business" className="gap-2">
              <Building2 className="w-4 h-4" />
              Business Enterprise
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
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName}</p>
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
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={individualData.email}
                  onChange={handleIndividualChange}
                  className={errors.email ? "border-red-500" : ""}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+234 xxx xxx xxxx"
                  value={individualData.phone}
                  onChange={handleIndividualChange}
                  disabled={loading}
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
                {!errors.password && individualData.password && (
                  <p className="text-xs text-muted-foreground">
                    Password must be 8+ characters with uppercase and numbers
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
                      errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"
                    }
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
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

          {/* Business Enterprise Account Form */}
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
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Business Verification Required:</strong> Your account
                  will be verified by our team within 24-48 hours after
                  submission. Please ensure all information is accurate.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="businessName">Registered Business Name *</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  placeholder="Acme Nigeria Limited"
                  value={businessData.businessName}
                  onChange={handleBusinessChange}
                  className={errors.businessName ? "border-red-500" : ""}
                  disabled={loading}
                />
                {errors.businessName && (
                  <p className="text-sm text-red-500">{errors.businessName}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Must match your CAC registration
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rcNumber">RC Number (CAC Registration) *</Label>
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
                  <p className="text-sm text-red-500">{errors.rcNumber}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Your Corporate Affairs Commission registration number
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nin">National Identity Number (NIN) *</Label>
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
                    <p className="text-sm text-red-500">{errors.nin}</p>
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
                    <p className="text-sm text-red-500">{errors.taxId}</p>
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
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
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
                    <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                    <SelectItem value="cooperative">
                      Cooperative Society
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessType && (
                  <p className="text-sm text-red-500">{errors.businessType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessPhone">Business Phone *</Label>
                <Input
                  id="businessPhone"
                  name="phone"
                  type="tel"
                  placeholder="+234 xxx xxx xxxx"
                  value={businessData.phone}
                  onChange={handleBusinessChange}
                  disabled={loading}
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
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
                      errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"
                    }
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
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
      </CardContent>
    </Card>
  );
}
