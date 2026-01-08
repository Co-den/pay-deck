"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Shield,
  CreditCard,
  Smartphone,
  Building2,
  Bitcoin,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getPaymentLinkByCode, type PaymentLink } from "@/lib/api/paymentLinks";
import CustomCheckout from "@/components/custom-checkout";

export default function PaymentLinkPage() {
  const params = useParams();
  const shortCode = params.code as string;

  const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Customer form data
  const [customerData, setCustomerData] = useState({
    email: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    loadPaymentLink();
  }, [shortCode]);

  async function loadPaymentLink() {
    try {
      setLoading(true);
      setError(null);
      const link = await getPaymentLinkByCode(shortCode);
      setPaymentLink(link);
    } catch (err: any) {
      console.error("Failed to load payment link:", err);
      setError(err.message || "Payment link not found or has expired");
    } finally {
      setLoading(false);
    }
  }

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();

    if (!paymentLink) return;

    // Validate customer data
    if (!customerData.email || !customerData.name) {
      alert("Please fill in all required fields");
      return;
    }

    if (paymentLink.settings.collectPhone && !customerData.phone) {
      alert("Phone number is required");
      return;
    }

    // For card payments, the custom checkout component handles everything
    // For other methods, handle here
    if (paymentMethod !== "card") {
      try {
        setProcessing(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const isSuccess = Math.random() > 0.2;

        if (isSuccess) {
          setSuccess(true);

          if (paymentLink.settings.redirectUrl) {
            setTimeout(() => {
              window.location.href = paymentLink.settings.redirectUrl!;
            }, 3000);
          }
        } else {
          throw new Error("Payment failed. Please try again.");
        }
      } catch (err: any) {
        alert("Payment failed: " + (err.message || "Unknown error"));
      } finally {
        setProcessing(false);
      }
    }
  }

  function handlePaymentSuccess() {
    setSuccess(true);
    setProcessing(false);

    if (paymentLink?.settings.redirectUrl) {
      setTimeout(() => {
        window.location.href = paymentLink.settings.redirectUrl!;
      }, 3000);
    }
  }

  function handlePaymentError(error: string) {
    setProcessing(false);
    alert("Payment failed: " + error);
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !paymentLink) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Payment Link Not Found
                </h3>
                <p className="text-muted-foreground">
                  {error ||
                    "This payment link may have expired or been disabled."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground">
                {paymentLink.settings.successMessage ||
                  "Your payment has been processed successfully."}
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-left">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Amount Paid</span>
                <span className="font-semibold">
                  {paymentLink.currency === "NGN" && "₦"}
                  {paymentLink.currency === "USD" && "$"}
                  {paymentLink.currency === "EUR" && "€"}
                  {paymentLink.currency === "GBP" && "£"}
                  {!["NGN", "USD", "EUR", "GBP"].includes(
                    paymentLink.currency
                  ) && paymentLink.currency + " "}
                  {paymentLink.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Receipt sent to</span>
                <span className="font-semibold">{customerData.email}</span>
              </div>
            </div>
            {paymentLink.settings.redirectUrl ? (
              <p className="text-sm text-muted-foreground">
                Redirecting you shortly...
              </p>
            ) : (
              <Button className="w-full">Close</Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main payment page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid gap-6 md:grid-cols-5">
        {/* Order Summary */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary-foreground">
                S
              </span>
            </div>
            <CardTitle>SettleMe</CardTitle>
            <CardDescription>
              Secure checkout powered by SettleMe
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {paymentLink.title}
              </h3>
              {paymentLink.description && (
                <p className="text-sm text-muted-foreground">
                  {paymentLink.description}
                </p>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>
                  {paymentLink.currency === "NGN" && "₦"}
                  {paymentLink.currency === "USD" && "$"}
                  {paymentLink.currency === "EUR" && "€"}
                  {paymentLink.currency === "GBP" && "£"}
                  {!["NGN", "USD", "EUR", "GBP"].includes(
                    paymentLink.currency
                  ) && paymentLink.currency + " "}
                  {paymentLink.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Processing Fee</span>
                <span>
                  {paymentLink.currency === "NGN" && "₦"}
                  {paymentLink.currency === "USD" && "$"}0.00
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>
                  {paymentLink.currency === "NGN" && "₦"}
                  {paymentLink.currency === "USD" && "$"}
                  {paymentLink.currency === "EUR" && "€"}
                  {paymentLink.currency === "GBP" && "£"}
                  {!["NGN", "USD", "EUR", "GBP"].includes(
                    paymentLink.currency
                  ) && paymentLink.currency + " "}
                  {paymentLink.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Usage Info */}
            {paymentLink.maxUses && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-xs text-blue-900 dark:text-blue-100">
                  <strong>Limited offer:</strong>{" "}
                  {paymentLink.maxUses - paymentLink.currentUses} uses remaining
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
              <Shield className="w-4 h-4" />
              <span>Secure payment • PCI DSS compliant</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Choose your payment method and complete checkout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-4">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-green-500 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                      <CreditCard className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Credit Card</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="bank"
                      id="bank"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="bank"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-green-500 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                      <Building2 className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Bank Transfer</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="ussd"
                      id="ussd"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="ussd"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-green-500 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                      <Smartphone className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">USSD</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="crypto"
                      id="crypto"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="crypto"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-green-500 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                      <Bitcoin className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">
                        Cryptocurrency
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={customerData.name}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          name: e.target.value,
                        })
                      }
                      required
                      disabled={processing}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={customerData.email}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          email: e.target.value,
                        })
                      }
                      required
                      disabled={processing}
                      className="h-11"
                    />
                  </div>
                </div>

                {paymentLink.settings.collectPhone && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+234 xxx xxx xxxx"
                      value={customerData.phone}
                      onChange={(e) =>
                        setCustomerData({
                          ...customerData,
                          phone: e.target.value,
                        })
                      }
                      required
                      disabled={processing}
                      className="h-11"
                    />
                  </div>
                )}
              </div>

              {/* Card Payment Form */}
              {paymentMethod === "card" && (
                <>
                  {customerData.email && customerData.name ? (
                    <CustomCheckout
                      amount={paymentLink.amount}
                      currency={paymentLink.currency}
                      customerData={customerData}
                      paymentLinkId={paymentLink.id || paymentLink._id}
                      shortCode={shortCode}
                      metadata={{
                        title: paymentLink.title,
                        description: paymentLink.description,
                        shortCode: shortCode,
                      }}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  ) : (
                    <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <p className="text-sm text-amber-900 dark:text-amber-100 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Please fill in your name and email above to continue
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Bank Transfer */}
              {paymentMethod === "bank" && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-4">
                      Transfer the exact amount to the following account:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Bank Name:
                        </span>
                        <span className="font-medium">SettleMe Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Account Number:
                        </span>
                        <span className="font-medium">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Reference:
                        </span>
                        <span className="font-medium">
                          {shortCode.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      "I've Made the Transfer"
                    )}
                  </Button>
                </div>
              )}

              {/* USSD */}
              {paymentMethod === "ussd" && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Dial the following USSD code from your phone:
                    </p>
                    <p className="text-3xl font-bold mb-2">*737*1234#</p>
                    <p className="text-xs text-muted-foreground">
                      Follow the prompts to complete your payment
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      "I've Completed the Payment"
                    )}
                  </Button>
                </div>
              )}

              {/* Cryptocurrency */}
              {paymentMethod === "crypto" && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="w-48 h-48 bg-white dark:bg-gray-800 mx-auto mb-4 rounded-lg flex items-center justify-center border-2 border-dashed">
                      <Bitcoin className="w-16 h-16 text-muted-foreground" />
                    </div>
                    <p className="font-mono text-sm break-all bg-background p-3 rounded">
                      bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Send exactly {(paymentLink.amount / 50000).toFixed(8)} BTC
                      to this address
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      "I've Sent the Crypto"
                    )}
                  </Button>
                </div>
              )}

              <p className="text-xs text-center text-muted-foreground">
                By completing this payment, you agree to our terms of service
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
