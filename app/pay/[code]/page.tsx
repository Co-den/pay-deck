"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  CreditCard,
  Building2,
  Smartphone,
  Bitcoin,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPaymentLinkByCode, type PaymentLink } from "@/lib/api/paymentLinks";
import CustomCheckout from "@/components/custom-checkout";

export default function PaymentLinkPage() {
  const params = useParams();
  const router = useRouter();
  const shortCode = params.code as string;

  const [paymentLink, setPaymentLink] = useState<PaymentLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("card");

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
    if (selectedMethod !== "card") {
      try {
        setProcessing(true);

        // TODO: Integrate with actual payment processors
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !paymentLink) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground mb-4">
                  {paymentLink.settings.successMessage ||
                    "Your payment has been processed successfully. Thank you!"}
                </p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Amount Paid</p>
                  <p className="text-2xl font-bold">
                    {paymentLink.currency} {paymentLink.amount.toLocaleString()}
                  </p>
                </div>
                {paymentLink.settings.redirectUrl && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Redirecting you shortly...
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Wider container with better max-width */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Complete Your Payment
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Powered by SettleMe
          </p>
        </div>

        {/* Main Content - Better horizontal layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Order Summary - Sidebar on desktop, top on mobile */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Item</p>
                  <p className="font-semibold text-base">{paymentLink.title}</p>
                  {paymentLink.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {paymentLink.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-2xl font-bold">
                      {paymentLink.currency === "NGN" && "₦"}
                      {paymentLink.currency === "USD" && "$"}
                      {paymentLink.currency === "EUR" && "€"}
                      {paymentLink.currency === "GBP" && "£"}
                      {!["NGN", "USD", "EUR", "GBP"].includes(
                        paymentLink.currency
                      ) && paymentLink.currency + " "}
                      {paymentLink.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Usage Info */}
                {paymentLink.maxUses && (
                  <Alert className="mt-4">
                    <AlertDescription className="text-xs">
                      <strong>Limited:</strong>{" "}
                      {paymentLink.maxUses - paymentLink.currentUses} uses
                      remaining
                    </AlertDescription>
                  </Alert>
                )}

                {/* Security Badge */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-4 h-4" />
                    <span>Secured by SettleMe • SSL Encrypted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form - Main content area */}
          <div className="lg:col-span-8 xl:col-span-9">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>
                  Enter your details to complete payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Customer Details - Two columns on larger screens */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    {paymentLink.settings.collectPhone && (
                      <div className="space-y-2 md:col-span-2">
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

                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <Label className="text-base">Payment Method</Label>
                    <Tabs
                      value={selectedMethod}
                      onValueChange={setSelectedMethod}
                    >
                      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                        <TabsTrigger value="card" className="gap-2 py-3">
                          <CreditCard className="w-4 h-4" />
                          <span className="hidden sm:inline">Card</span>
                        </TabsTrigger>
                        <TabsTrigger value="bank" className="gap-2 py-3">
                          <Building2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Bank</span>
                        </TabsTrigger>
                        <TabsTrigger value="ussd" className="gap-2 py-3">
                          <Smartphone className="w-4 h-4" />
                          <span className="hidden sm:inline">USSD</span>
                        </TabsTrigger>
                        <TabsTrigger value="crypto" className="gap-2 py-3">
                          <Bitcoin className="w-4 h-4" />
                          <span className="hidden sm:inline">Crypto</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="card" className="space-y-4 mt-6">
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
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              Please fill in your name and email above to
                              continue with card payment
                            </AlertDescription>
                          </Alert>
                        )}
                      </TabsContent>

                      <TabsContent value="bank" className="space-y-4 mt-6">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            You'll receive bank account details to transfer to
                          </AlertDescription>
                        </Alert>
                      </TabsContent>

                      <TabsContent value="ussd" className="space-y-4 mt-6">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            You'll receive a USSD code to dial from your phone
                          </AlertDescription>
                        </Alert>
                      </TabsContent>

                      <TabsContent value="crypto" className="space-y-4 mt-6">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            You'll receive a crypto wallet address and QR code
                          </AlertDescription>
                        </Alert>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Submit Button - Only show for non-card payments */}
                  {selectedMethod !== "card" && (
                    <Button
                      type="submit"
                      className="w-full h-12 text-base"
                      size="lg"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          Pay {paymentLink.currency}{" "}
                          {paymentLink.amount.toLocaleString()}
                        </>
                      )}
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Powered by <strong>SettleMe</strong> Payment Gateway
          </p>
        </div>
      </div>
    </div>
  );
}
