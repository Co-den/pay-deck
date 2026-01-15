"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Building2,
  Bell,
  Shield,
  CreditCard,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Download,
  Bitcoin,
  Wallet,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api/client";

// ============================================
// TYPES & INTERFACES
// ============================================

interface BusinessProfile {
  businessName: string;
  website: string;
  description: string;
  phone: string;
  businessEmail: string;
  address: string;
  taxId: string;
  industry: string;
}

interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: "checking" | "savings";
  payoutSchedule: "daily" | "weekly" | "monthly";
  isVerified?: boolean;
}

interface NotificationEvents {
  paymentCompleted: boolean;
  paymentFailed: boolean;
  paymentRefunded: boolean;
  payoutCompleted: boolean;
  suspiciousActivity: boolean;
  weeklySummary: boolean;
  monthlyReport: boolean;
}

interface NotificationPreferences {
  email: {
    enabled: boolean;
    address: string;
  };
  sms: {
    enabled: boolean;
    phoneNumber: string;
  };
  events: NotificationEvents;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface LoginHistoryItem {
  ipAddress: string;
  location?: {
    city?: string;
    region?: string;
    country?: string;
  };
  device?: {
    browser?: string;
    os?: string;
  };
  loginAt: string;
}

interface BillingPlan {
  planName: "free" | "starter" | "business" | "enterprise";
  planPrice: number;
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string | null;
  status: string;
}

interface CardDetails {
  brand: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
}

interface CryptoDetails {
  currency: string;
  walletAddress: string;
}

interface PaymentMethod {
  _id?: string;
  type: "card" | "bank" | "crypto" | "paypal";
  card?: CardDetails;
  crypto?: CryptoDetails;
  isDefault: boolean;
  addedAt?: string;
}

interface BillingHistoryItem {
  invoiceNumber: string;
  amount: number;
  status: string;
  description: string;
  billingDate: string;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // Business Profile State
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    businessName: "",
    website: "",
    description: "",
    phone: "",
    businessEmail: "",
    address: "",
    taxId: "",
    industry: "ecommerce",
  });

  // Bank Account State
  const [bankAccount, setBankAccount] = useState<BankAccount>({
    bankName: "",
    accountName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",
    payoutSchedule: "monthly",
  });
  const [verifyingAccount, setVerifyingAccount] = useState<boolean>(false);
  const [accountVerified, setAccountVerified] = useState<boolean>(false);

  // Notification Preferences State
  const [notificationPreferences, setNotificationPreferences] =
    useState<NotificationPreferences>({
      email: {
        enabled: true,
        address: "",
      },
      sms: {
        enabled: false,
        phoneNumber: "",
      },
      events: {
        paymentCompleted: true,
        paymentFailed: true,
        paymentRefunded: true,
        payoutCompleted: true,
        suspiciousActivity: true,
        weeklySummary: false,
        monthlyReport: false,
      },
    });

  // Security State
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState<boolean>(false);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [twoFAToken, setTwoFAToken] = useState<string>("");
  const [loginHistory, setLoginHistory] = useState<LoginHistoryItem[]>([]);
  const [showDisable2FADialog, setShowDisable2FADialog] = useState(false);
  const [disable2FAPassword, setDisable2FAPassword] = useState("");

  // Billing State
  const [billingPlan, setBillingPlan] = useState<BillingPlan>({
    planName: "free",
    planPrice: 0,
    billingCycle: "monthly",
    nextBillingDate: null,
    status: "active",
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [billingHistory, setBillingHistory] = useState<BillingHistoryItem[]>(
    []
  );
  const [showPlanSelector, setShowPlanSelector] = useState<boolean>(false);
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] =
    useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    cycle: string;
  } | null>(null);
  const [paymentMethodForm, setPaymentMethodForm] = useState<PaymentMethod>({
    type: "card",
    card: {
      brand: "visa",
      last4: "",
      expiryMonth: "",
      expiryYear: "",
      holderName: "",
    },
    crypto: { currency: "BTC", walletAddress: "" },
    isDefault: false,
  });

  // Account State
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");
  const [deletePassword, setDeletePassword] = useState<string>("");
  const [showDeactivateDialog, setShowDeactivateDialog] =
    useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [deactivatePassword, setDeactivatePassword] = useState<string>("");

  // ============================================
  // LOAD ALL SETTINGS ON MOUNT
  // ============================================

  useEffect(() => {
    loadAllSettings();
  }, []);

  const loadAllSettings = async (): Promise<void> => {
    setLoading(true);
    try {
      await Promise.allSettled([
        loadBusinessProfile(),
        loadBankAccount(),
        loadNotificationPreferences(),
        loadLoginHistory(),
        loadBillingPlan(),
        loadPaymentMethods(),
        loadBillingHistory(),
        loadPersonalInfo(),
      ]);
    } catch (error) {
      console.error("Error loading settings:", error);
      showToast("Error loading settings", "error");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // DATA LOADING FUNCTIONS
  // ============================================

  const loadBusinessProfile = async (): Promise<void> => {
    try {
      const response = await api.get("/business/business-profile");
      if (response.status === "success" && response.data?.businessProfile) {
        setBusinessProfile(response.data.businessProfile);
      }
    } catch (error) {
      console.error("Error loading business profile:", error);
    }
  };

  const loadBankAccount = async (): Promise<void> => {
    try {
      const response = await api.get("/banks/bank-account");
      if (response.status === "success" && response.data?.bankAccount) {
        setBankAccount(response.data.bankAccount);
        setAccountVerified(response.data.bankAccount.isVerified || false);
      }
    } catch (error) {
      console.error("Error loading bank account:", error);
    }
  };

  const loadNotificationPreferences = async (): Promise<void> => {
    try {
      const response = await api.get("/notifications/notification-preferences");
      if (
        response.status === "success" &&
        response.data?.notificationPreferences
      ) {
        setNotificationPreferences(response.data.notificationPreferences);
      }
    } catch (error) {
      console.error("Error loading notification preferences:", error);
    }
  };

  const loadLoginHistory = async (): Promise<void> => {
    try {
      const response = await api.get("/security/login-history");
      if (response.status === "success" && response.data?.loginHistory) {
        setLoginHistory(response.data.loginHistory);
      }
    } catch (error) {
      console.error("Error loading login history:", error);
    }
  };

  const loadBillingPlan = async (): Promise<void> => {
    try {
      const response = await api.get("/billing/billing-plan");
      if (response.status === "success" && response.data?.billingPlan) {
        setBillingPlan(response.data.billingPlan);
      }
    } catch (error) {
      console.error("Error loading billing plan:", error);
    }
  };

  const loadPaymentMethods = async (): Promise<void> => {
    try {
      const response = await api.get("/billing/payment-methods");
      if (response.status === "success" && response.data?.paymentMethods) {
        setPaymentMethods(response.data.paymentMethods);
      }
    } catch (error) {
      console.error("Error loading payment methods:", error);
    }
  };

  const loadBillingHistory = async (): Promise<void> => {
    try {
      const response = await api.get("/billing/billing-history");
      if (response.status === "success" && response.data?.billingHistory) {
        setBillingHistory(response.data.billingHistory);
      }
    } catch (error) {
      console.error("Error loading billing history:", error);
    }
  };

  const loadPersonalInfo = async (): Promise<void> => {
    try {
      const response = await api.get("/accounts/personal-info");
      if (response.status === "success" && response.data?.merchant) {
        setPersonalInfo(response.data.merchant);
      }
    } catch (error) {
      console.error("Error loading personal info:", error);
    }
  };

  // ============================================
  // BUSINESS PROFILE HANDLERS
  // ============================================

  const handleSaveBusinessProfile = async (): Promise<void> => {
    setSaving(true);
    try {
      const response = await api.put(
        "/business/business-profile",
        businessProfile
      );

      if (response.status === "success") {
        showToast("Business profile updated successfully", "success");
      } else {
        showToast(response.message || "Failed to update profile", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to update business profile", "error");
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // BANK ACCOUNT HANDLERS
  // ============================================

  const handleVerifyBankAccount = async (): Promise<void> => {
    if (!bankAccount.accountNumber || !bankAccount.routingNumber) {
      showToast("Please enter account and routing numbers", "error");
      return;
    }

    setVerifyingAccount(true);
    try {
      const response = await api.post("/banks/verify-bank-account", {
        accountNumber: bankAccount.accountNumber,
        routingNumber: bankAccount.routingNumber,
      });

      if (response.status === "success" && response.data?.accountName) {
        setBankAccount((prev) => ({
          ...prev,
          accountName: response.data.accountName,
        }));
        setAccountVerified(true);
        showToast("Bank account verified successfully", "success");
      } else {
        showToast("Could not verify bank account", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to verify bank account", "error");
    } finally {
      setVerifyingAccount(false);
    }
  };

  const handleSaveBankAccount = async (): Promise<void> => {
    if (!accountVerified) {
      showToast("Please verify your bank account first", "error");
      return;
    }

    setSaving(true);
    try {
      const response = await api.put("/banks/bank-account", bankAccount);

      if (response.status === "success") {
        showToast("Bank account updated successfully", "success");
        if (response.data?.bankAccount) {
          setBankAccount(response.data.bankAccount);
        }
      } else {
        showToast(response.message || "Failed to update bank account", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to update bank account", "error");
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // NOTIFICATION HANDLERS
  // ============================================

  const handleSaveNotificationPreferences = async (): Promise<void> => {
    setSaving(true);
    try {
      const response = await api.put(
        "/notifications/notification-preferences",
        notificationPreferences
      );

      if (response.status === "success") {
        showToast("Notification preferences updated successfully", "success");
      } else {
        showToast(response.message || "Failed to update preferences", "error");
      }
    } catch (error: any) {
      showToast(
        error.message || "Failed to update notification preferences",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // SECURITY HANDLERS
  // ============================================

  const handleChangePassword = async (): Promise<void> => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordForm.newPassword)) {
      showToast(
        "Password must contain uppercase, lowercase, and number",
        "error"
      );
      return;
    }

    setSaving(true);
    try {
      const response = await api.put("/security/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (response.status === "success") {
        showToast("Password updated successfully", "success");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        showToast(response.message || "Failed to update password", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to update password", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleSetup2FA = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.post("/security/setup-2fa");

      if (response.status === "success") {
        setQrCodeUrl(response.data?.qrCode || "");
        setBackupCodes(response.data?.backupCodes || []);
        setShowQRCode(true);
      } else {
        showToast("Failed to setup 2FA", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to setup 2FA", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async (): Promise<void> => {
    if (!twoFAToken || twoFAToken.length !== 6) {
      showToast("Please enter a valid 6-digit code", "error");
      return;
    }

    setSaving(true);
    try {
      const response = await api.post("/security/verify-2fa", {
        token: twoFAToken,
      });

      if (response.status === "success") {
        setTwoFAEnabled(true);
        setShowQRCode(false);
        setTwoFAToken("");
        showToast("2FA enabled successfully", "success");
      } else {
        showToast("Invalid verification code", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to verify 2FA", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDisable2FA = async (): Promise<void> => {
    if (!disable2FAPassword) {
      showToast("Please enter your password", "error");
      return;
    }

    setSaving(true);
    try {
      const response = await api.post("/security/disable-2fa", {
        password: disable2FAPassword,
      });

      if (response.status === "success") {
        setTwoFAEnabled(false);
        setShowDisable2FADialog(false);
        setDisable2FAPassword("");
        showToast("2FA disabled successfully", "success");
      } else {
        showToast(response.message || "Failed to disable 2FA", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to disable 2FA", "error");
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // BILLING HANDLERS
  // ============================================

  const handleSubscribePlan = async (
    planName: string,
    billingCycle: string
  ): Promise<void> => {
    setSaving(true);
    try {
      const defaultPaymentMethod = paymentMethods.find((pm) => pm.isDefault);

      if (!defaultPaymentMethod && planName !== "free") {
        showToast("Please add a payment method first", "error");
        setShowPaymentMethodDialog(true);
        setSelectedPlan({ name: planName, cycle: billingCycle });
        setSaving(false);
        return;
      }

      const response = await api.post("/billing/subscribe-plan", {
        planName,
        billingCycle,
        paymentMethodId: defaultPaymentMethod?._id,
      });

      if (response.status === "success") {
        if (response.data?.billingPlan) {
          setBillingPlan(response.data.billingPlan);
        }
        setShowPlanSelector(false);
        showToast("Subscribed to plan successfully", "success");
        await loadBillingHistory();
      } else {
        showToast(response.message || "Failed to subscribe", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to subscribe to plan", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleAddPaymentMethod = async (): Promise<void> => {
    // Validate payment method based on type
    if (paymentMethodForm.type === "card") {
      if (
        !paymentMethodForm.card?.last4 ||
        !paymentMethodForm.card?.holderName
      ) {
        showToast("Please fill in all card details", "error");
        return;
      }
    } else if (paymentMethodForm.type === "crypto") {
      if (!paymentMethodForm.crypto?.walletAddress) {
        showToast("Please enter wallet address", "error");
        return;
      }
    }

    setSaving(true);
    try {
      const response = await api.post(
        "/billing/payment-method",
        paymentMethodForm
      );

      if (response.status === "success") {
        await loadPaymentMethods();
        setShowPaymentMethodDialog(false);
        setPaymentMethodForm({
          type: "card",
          card: {
            brand: "visa",
            last4: "",
            expiryMonth: "",
            expiryYear: "",
            holderName: "",
          },
          crypto: { currency: "BTC", walletAddress: "" },
          isDefault: false,
        });
        showToast("Payment method added successfully", "success");

        // If there was a pending plan selection, subscribe now
        if (selectedPlan) {
          await handleSubscribePlan(selectedPlan.name, selectedPlan.cycle);
          setSelectedPlan(null);
        }
      } else {
        showToast(response.message || "Failed to add payment method", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to add payment method", "error");
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // ACCOUNT HANDLERS
  // ============================================

  const handleSavePersonalInfo = async (): Promise<void> => {
    setSaving(true);
    try {
      const response = await api.put("/accounts/personal-info", personalInfo);

      if (response.status === "success") {
        showToast("Personal information updated successfully", "success");
      } else {
        showToast(response.message || "Failed to update information", "error");
      }
    } catch (error: any) {
      showToast(
        error.message || "Failed to update personal information",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivateAccount = async (): Promise<void> => {
    if (!deactivatePassword) {
      showToast("Please enter your password", "error");
      return;
    }

    setSaving(true);
    try {
      const response = await api.post("/accounts/deactivate-account", {
        password: deactivatePassword,
      });

      if (response.status === "success") {
        showToast("Account deactivated successfully", "success");
        localStorage.clear();
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        showToast(response.message || "Failed to deactivate account", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to deactivate account", "error");
    } finally {
      setSaving(false);
      setShowDeactivateDialog(false);
    }
  };

  const handleDeleteAccount = async (): Promise<void> => {
    if (deleteConfirmation !== "DELETE") {
      showToast('Please type "DELETE" to confirm', "error");
      return;
    }

    if (!deletePassword) {
      showToast("Please enter your password", "error");
      return;
    }

    setSaving(true);
    try {
      const response = await api.delete("/accounts/delete-account");

      if (response.status === "success") {
        showToast("Account deleted successfully", "success");
        localStorage.clear();
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        showToast(response.message || "Failed to delete account", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to delete account", "error");
    } finally {
      setSaving(false);
      setShowDeleteDialog(false);
    }
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  const showToast = (
    message: string,
    type: "default" | "success" | "error" = "default"
  ): void => {
    toast({
      title: type === "error" ? "Error" : "Success",
      description: message,
      variant: type === "error" ? "destructive" : "default",
    });
  };

  const formatDate = (date: string | null): string => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRelativeTime = (date: string): string => {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  const getPlanPrice = (plan: string, cycle: string): number => {
    const prices: Record<string, { monthly: number; yearly: number }> = {
      free: { monthly: 0, yearly: 0 },
      starter: { monthly: 29, yearly: 290 },
      business: { monthly: 99, yearly: 990 },
      enterprise: { monthly: 299, yearly: 2990 },
    };
    return prices[plan]?.[cycle as "monthly" | "yearly"] || 0;
  };

  // ============================================
  // RENDER
  // ============================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and integration settings
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
        </TabsList>

        {/* BUSINESS PROFILE TAB */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={businessProfile.businessName}
                    onChange={(e) =>
                      setBusinessProfile((prev) => ({
                        ...prev,
                        businessName: e.target.value,
                      }))
                    }
                    placeholder="Your Business Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={businessProfile.website}
                    onChange={(e) =>
                      setBusinessProfile((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    placeholder="https://yourbusiness.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={businessProfile.description}
                  onChange={(e) =>
                    setBusinessProfile((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Brief description of your business"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={businessProfile.phone}
                    onChange={(e) =>
                      setBusinessProfile((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email *</Label>
                  <Input
                    id="businessEmail"
                    type="email"
                    value={businessProfile.businessEmail}
                    onChange={(e) =>
                      setBusinessProfile((prev) => ({
                        ...prev,
                        businessEmail: e.target.value,
                      }))
                    }
                    placeholder="contact@yourbusiness.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={businessProfile.address}
                  onChange={(e) =>
                    setBusinessProfile((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  placeholder="123 Business St, City, State"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / TIN</Label>
                  <Input
                    id="taxId"
                    value={businessProfile.taxId}
                    onChange={(e) =>
                      setBusinessProfile((prev) => ({
                        ...prev,
                        taxId: e.target.value,
                      }))
                    }
                    placeholder="12-3456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={businessProfile.industry}
                    onValueChange={(value) =>
                      setBusinessProfile((prev) => ({
                        ...prev,
                        industry: value,
                      }))
                    }
                  >
                    <SelectTrigger id="industry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">
                        Professional Services
                      </SelectItem>
                      <SelectItem value="nonprofit">Non-profit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveBusinessProfile} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bank Account</CardTitle>
              <CardDescription>
                Where you'll receive payouts from PayDeck
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    value={bankAccount.bankName}
                    onChange={(e) =>
                      setBankAccount((prev) => ({
                        ...prev,
                        bankName: e.target.value,
                      }))
                    }
                    placeholder="Bank Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type *</Label>
                  <Select
                    value={bankAccount.accountType}
                    onValueChange={(value: "checking" | "savings") =>
                      setBankAccount((prev) => ({
                        ...prev,
                        accountType: value,
                      }))
                    }
                  >
                    <SelectTrigger id="accountType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="routing">Routing Number</Label>
                  <Input
                    id="routing"
                    value={bankAccount.routingNumber}
                    onChange={(e) =>
                      setBankAccount((prev) => ({
                        ...prev,
                        routingNumber: e.target.value,
                      }))
                    }
                    placeholder="021000021"
                  />
                  <p className="text-xs text-muted-foreground">
                    Required for international accounts
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account">Account Number *</Label>
                  <Input
                    id="account"
                    type="text"
                    value={bankAccount.accountNumber}
                    onChange={(e) => {
                      setBankAccount((prev) => ({
                        ...prev,
                        accountNumber: e.target.value,
                      }));
                      setAccountVerified(false);
                    }}
                    placeholder="Account Number"
                  />
                </div>
              </div>

              {bankAccount.accountNumber && (
                <Button
                  variant="outline"
                  onClick={handleVerifyBankAccount}
                  disabled={verifyingAccount || accountVerified}
                  className="w-full"
                >
                  {verifyingAccount ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying Account...
                    </>
                  ) : accountVerified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                      Account Verified
                    </>
                  ) : (
                    "Verify Account"
                  )}
                </Button>
              )}

              {accountVerified && bankAccount.accountName && (
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Account Verified</AlertTitle>
                  <AlertDescription>
                    Account Name: <strong>{bankAccount.accountName}</strong>
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="schedule">Payout Schedule</Label>
                <Select
                  value={bankAccount.payoutSchedule}
                  onValueChange={(value: "daily" | "weekly" | "monthly") =>
                    setBankAccount((prev) => ({
                      ...prev,
                      payoutSchedule: value,
                    }))
                  }
                >
                  <SelectTrigger id="schedule">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleSaveBankAccount}
                disabled={saving || !accountVerified}
              >
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Update Bank Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationPreferences.email.enabled}
                    onCheckedChange={(checked) =>
                      setNotificationPreferences((prev) => ({
                        ...prev,
                        email: { ...prev.email, enabled: checked },
                      }))
                    }
                  />
                </div>

                {notificationPreferences.email.enabled && (
                  <div className="space-y-2 pl-4">
                    <Label htmlFor="emailAddress">Email Address</Label>
                    <Input
                      id="emailAddress"
                      type="email"
                      value={notificationPreferences.email.address}
                      onChange={(e) =>
                        setNotificationPreferences((prev) => ({
                          ...prev,
                          email: { ...prev.email, address: e.target.value },
                        }))
                      }
                      placeholder="your@email.com"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notificationPreferences.sms.enabled}
                    onCheckedChange={(checked) =>
                      setNotificationPreferences((prev) => ({
                        ...prev,
                        sms: { ...prev.sms, enabled: checked },
                      }))
                    }
                  />
                </div>

                {notificationPreferences.sms.enabled && (
                  <div className="space-y-2 pl-4">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={notificationPreferences.sms.phoneNumber}
                      onChange={(e) =>
                        setNotificationPreferences((prev) => ({
                          ...prev,
                          sms: { ...prev.sms, phoneNumber: e.target.value },
                        }))
                      }
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Events</CardTitle>
              <CardDescription>
                Choose which events trigger notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries({
                paymentCompleted: "Payment Completed",
                paymentFailed: "Payment Failed",
                paymentRefunded: "Payment Refunded",
                payoutCompleted: "Payout Completed",
                suspiciousActivity: "Suspicious Activity",
                weeklySummary: "Weekly Summary",
                monthlyReport: "Monthly Report",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label>{label}</Label>
                  <Switch
                    checked={
                      notificationPreferences.events[
                        key as keyof NotificationEvents
                      ]
                    }
                    onCheckedChange={(checked) =>
                      setNotificationPreferences((prev) => ({
                        ...prev,
                        events: { ...prev.events, [key]: checked },
                      }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={handleSaveNotificationPreferences} disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Preferences
          </Button>
        </TabsContent>

        {/* SECURITY TAB */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password regularly to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters with uppercase, lowercase, and
                  number
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <Button onClick={handleChangePassword} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!twoFAEnabled && !showQRCode && (
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Two-factor authentication adds an extra layer of security
                      to your account by requiring a code from your phone in
                      addition to your password.
                    </AlertDescription>
                  </Alert>
                  <Button onClick={handleSetup2FA}>Enable 2FA</Button>
                </div>
              )}

              {showQRCode && (
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Setup Two-Factor Authentication</AlertTitle>
                    <AlertDescription>
                      Scan this QR code with your authenticator app (Google
                      Authenticator, Authy, etc.)
                    </AlertDescription>
                  </Alert>

                  {qrCodeUrl && (
                    <div className="flex justify-center">
                      <img
                        src={qrCodeUrl}
                        alt="2FA QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                  )}

                  {backupCodes.length > 0 && (
                    <div className="space-y-2">
                      <Label>Backup Codes</Label>
                      <p className="text-sm text-muted-foreground">
                        Save these backup codes in a safe place. You can use
                        them to access your account if you lose your phone.
                      </p>
                      <div className="grid grid-cols-2 gap-2 p-4 bg-muted rounded-lg">
                        {backupCodes.map((code, index) => (
                          <code key={index} className="text-sm">
                            {code}
                          </code>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="twoFAToken">Verification Code</Label>
                    <Input
                      id="twoFAToken"
                      value={twoFAToken}
                      onChange={(e) => setTwoFAToken(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                    />
                  </div>

                  <Button onClick={handleVerify2FA} disabled={saving}>
                    {saving && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Verify and Enable
                  </Button>
                </div>
              )}

              {twoFAEnabled && (
                <div className="space-y-4">
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>2FA Enabled</AlertTitle>
                    <AlertDescription>
                      Your account is protected with two-factor authentication
                    </AlertDescription>
                  </Alert>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDisable2FADialog(true)}
                  >
                    Disable 2FA
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {loginHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Login History</CardTitle>
                <CardDescription>
                  Recent login activity on your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loginHistory.slice(0, 5).map((login, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">{login.ipAddress}</p>
                        <p className="text-sm text-muted-foreground">
                          {login.location?.city && login.location?.country
                            ? `${login.location.city}, ${login.location.country}`
                            : "Unknown location"}
                        </p>
                        {login.device && (
                          <p className="text-xs text-muted-foreground">
                            {login.device.browser} on {login.device.os}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {getRelativeTime(login.loginAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* BILLING TAB */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold capitalize">
                    {billingPlan.planName} Plan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ${billingPlan.planPrice}/{billingPlan.billingCycle}
                  </p>
                  {billingPlan.nextBillingDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Next billing: {formatDate(billingPlan.nextBillingDate)}
                    </p>
                  )}
                </div>
                <Button onClick={() => setShowPlanSelector(true)}>
                  Change Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.length > 0 ? (
                <div className="space-y-3">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {method.type === "card" ? (
                          <CreditCard className="w-5 h-5" />
                        ) : method.type === "crypto" ? (
                          <Bitcoin className="w-5 h-5" />
                        ) : (
                          <Wallet className="w-5 h-5" />
                        )}
                        <div>
                          <p className="font-medium">
                            {method.type === "card" &&
                              `${method.card?.brand} •••• ${method.card?.last4}`}
                            {method.type === "crypto" &&
                              `${method.crypto?.currency} Wallet`}
                          </p>
                          {method.isDefault && (
                            <span className="text-xs text-green-600">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No payment methods added
                </p>
              )}
              <Button
                variant="outline"
                onClick={() => setShowPaymentMethodDialog(true)}
              >
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          {billingHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  Your past invoices and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {billingHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(item.billingDate)} • {item.invoiceNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.amount}</p>
                        <span
                          className={`text-xs ${
                            item.status === "paid"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ACCOUNT TAB */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) =>
                    setPersonalInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personalPhone">Phone</Label>
                <Input
                  id="personalPhone"
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) =>
                    setPersonalInfo((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="+234 xxx xxx xxxx"
                />
              </div>

              <Button onClick={handleSavePersonalInfo} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="border-yellow-500">
            <CardHeader>
              <CardTitle className="text-yellow-700">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Deactivate Account</h3>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable your account. You can reactivate it later
                  by logging in.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowDeactivateDialog(true)}
                >
                  Deactivate Account
                </Button>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <h3 className="font-semibold text-red-600">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* DIALOGS */}

      {/* Plan Selector Dialog */}
      <Dialog open={showPlanSelector} onOpenChange={setShowPlanSelector}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Choose Your Plan</DialogTitle>
            <DialogDescription>
              Select a plan that works best for your business
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-3">
            {["starter", "business", "enterprise"].map((plan) => (
              <Card
                key={plan}
                className={`cursor-pointer transition-all ${
                  billingPlan.planName === plan ? "border-purple-600" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="capitalize">{plan}</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold">
                      ${getPlanPrice(plan, "monthly")}
                    </span>
                    /month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => handleSubscribePlan(plan, "monthly")}
                    disabled={saving || billingPlan.planName === plan}
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : billingPlan.planName === plan ? (
                      "Current Plan"
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Method Dialog */}
      <Dialog
        open={showPaymentMethodDialog}
        onOpenChange={setShowPaymentMethodDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Add a new payment method to your account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Payment Type</Label>
              <Select
                value={paymentMethodForm.type}
                onValueChange={(value: any) =>
                  setPaymentMethodForm((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethodForm.type === "card" && (
              <>
                <div className="space-y-2">
                  <Label>Card Holder Name</Label>
                  <Input
                    value={paymentMethodForm.card?.holderName || ""}
                    onChange={(e) =>
                      setPaymentMethodForm((prev) => ({
                        ...prev,
                        card: { ...prev.card!, holderName: e.target.value },
                      }))
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Card Brand</Label>
                    <Select
                      value={paymentMethodForm.card?.brand || "visa"}
                      onValueChange={(value) =>
                        setPaymentMethodForm((prev) => ({
                          ...prev,
                          card: { ...prev.card!, brand: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="mastercard">Mastercard</SelectItem>
                        <SelectItem value="amex">American Express</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Last 4 Digits</Label>
                    <Input
                      value={paymentMethodForm.card?.last4 || ""}
                      onChange={(e) =>
                        setPaymentMethodForm((prev) => ({
                          ...prev,
                          card: { ...prev.card!, last4: e.target.value },
                        }))
                      }
                      placeholder="1234"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Expiry Month</Label>
                    <Input
                      value={paymentMethodForm.card?.expiryMonth || ""}
                      onChange={(e) =>
                        setPaymentMethodForm((prev) => ({
                          ...prev,
                          card: { ...prev.card!, expiryMonth: e.target.value },
                        }))
                      }
                      placeholder="MM"
                      maxLength={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Year</Label>
                    <Input
                      value={paymentMethodForm.card?.expiryYear || ""}
                      onChange={(e) =>
                        setPaymentMethodForm((prev) => ({
                          ...prev,
                          card: { ...prev.card!, expiryYear: e.target.value },
                        }))
                      }
                      placeholder="YYYY"
                      maxLength={4}
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethodForm.type === "crypto" && (
              <>
                <div className="space-y-2">
                  <Label>Cryptocurrency</Label>
                  <Select
                    value={paymentMethodForm.crypto?.currency || "BTC"}
                    onValueChange={(value) =>
                      setPaymentMethodForm((prev) => ({
                        ...prev,
                        crypto: { ...prev.crypto!, currency: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                      <SelectItem value="USDT">Tether (USDT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Wallet Address</Label>
                  <Input
                    value={paymentMethodForm.crypto?.walletAddress || ""}
                    onChange={(e) =>
                      setPaymentMethodForm((prev) => ({
                        ...prev,
                        crypto: {
                          ...prev.crypto!,
                          walletAddress: e.target.value,
                        },
                      }))
                    }
                    placeholder="0x..."
                  />
                </div>
              </>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                checked={paymentMethodForm.isDefault}
                onCheckedChange={(checked) =>
                  setPaymentMethodForm((prev) => ({
                    ...prev,
                    isDefault: checked,
                  }))
                }
              />
              <Label>Set as default payment method</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentMethodDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddPaymentMethod} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disable 2FA Dialog */}
      <Dialog
        open={showDisable2FADialog}
        onOpenChange={setShowDisable2FADialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enter your password to disable 2FA
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="disable2FAPassword">Password</Label>
              <Input
                id="disable2FAPassword"
                type="password"
                value={disable2FAPassword}
                onChange={(e) => setDisable2FAPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDisable2FADialog(false);
                setDisable2FAPassword("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDisable2FA}
              disabled={saving}
            >
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Disable 2FA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate Account Dialog */}
      <Dialog
        open={showDeactivateDialog}
        onOpenChange={setShowDeactivateDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deactivate Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to deactivate your account? You can
              reactivate it later by logging in.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deactivatePassword">Confirm Password</Label>
              <Input
                id="deactivatePassword"
                type="password"
                value={deactivatePassword}
                onChange={(e) => setDeactivatePassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeactivateDialog(false);
                setDeactivatePassword("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleDeactivateAccount} disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your data will be permanently
              deleted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This will permanently delete your account and all associated
                data.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Label htmlFor="deleteConfirmation">
                Type "DELETE" to confirm
              </Label>
              <Input
                id="deleteConfirmation"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="DELETE"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deletePassword">Confirm Password</Label>
              <Input
                id="deletePassword"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false);
                setDeleteConfirmation("");
                setDeletePassword("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={saving || deleteConfirmation !== "DELETE"}
            >
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete Account Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
