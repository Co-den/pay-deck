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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPaymentLinkByCode, type PaymentLink } from "@/lib/api/paymentLinks";
import { processPayment, type PaymentRequest } from "@/lib/api/payments";

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

    try {
      setProcessing(true);

      // Prepare payment request
      const paymentRequest: PaymentRequest = {
        amount: paymentLink.amount,
        currency: paymentLink.currency,
        paymentMethod: selectedMethod,
        customerData,
        paymentLinkId: paymentLink.id,
        metadata: {
          title: paymentLink.title,
          description: paymentLink.description,
          shortCode: paymentLink.shortCode,
        },
      };

      // Process payment
      const result = await processPayment(paymentRequest);

      if (result.success) {
        if (selectedMethod === 'card' && result.redirectUrl) {
          // Redirect to Stripe Checkout immediately
          window.location.href = result.redirectUrl;
          return;
        }

        setSuccess(true);

        // Handle redirects for other payment methods
        if (result.redirectUrl) {
          setTimeout(() => {
            router.push(result.redirectUrl!);
          }, 3000);
        } else if (paymentLink.settings.redirectUrl) {
          setTimeout(() => {
            router.push(paymentLink.settings.redirectUrl!);
          }, 3000);
        }
      } else {
        throw new Error(result.error || "Payment failed. Please try again.");
      }
    } catch (err: any) {
      alert("Payment failed: " + (err.message || "Unknown error"));
    } finally {
      setProcessing(false);
    }
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
          <p className="text-muted-foreground">Powered by PayDeck</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Payment Details */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Item</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{paymentLink.title}</p>
                  <Badge variant={paymentLink.status === 'active' ? 'default' : paymentLink.status === 'expired' ? 'destructive' : 'secondary'}>
                    {paymentLink.status}
                  </Badge>
                </div>
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
                <Alert>
                  <AlertDescription className="text-xs">
                    <strong>Limited:</strong>{" "}
                    {paymentLink.maxUses - paymentLink.currentUses} uses
                    remaining
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Enter your details to complete payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Customer Details */}
                <div className="space-y-4">
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
                    />
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
                      />
                    </div>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <Label>Payment Method</Label>
                  <Tabs
                    value={selectedMethod}
                    onValueChange={setSelectedMethod}
                  >
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="card" className="gap-2">
                        <CreditCard className="w-4 h-4" />
                        Card
                      </TabsTrigger>
                      <TabsTrigger value="bank" className="gap-2">
                        <Building2 className="w-4 h-4" />
                        Bank
                      </TabsTrigger>
                      <TabsTrigger value="ussd" className="gap-2">
                        <Smartphone className="w-4 h-4" />
                        USSD
                      </TabsTrigger>
                      <TabsTrigger value="crypto" className="gap-2">
                        <Bitcoin className="w-4 h-4" />
                        Crypto
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          You'll be redirected to complete your card payment
                          securely
                        </AlertDescription>
                      </Alert>
                    </TabsContent>

                    <TabsContent value="bank" className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          You'll receive bank account details to transfer to
                        </AlertDescription>
                      </Alert>
                    </TabsContent>

                    <TabsContent value="ussd" className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          You'll receive a USSD code to dial from your phone
                        </AlertDescription>
                      </Alert>
                    </TabsContent>

                    <TabsContent value="crypto" className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          You'll receive a crypto wallet address and QR code
                        </AlertDescription>
                      </Alert>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      Pay {paymentLink.currency}{" "}
                      {paymentLink.amount.toLocaleString()}
                    </>
                  )}
                </Button>

                {/* Security Badge */}
                <div className="text-center">
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Secured by PayDeck • SSL Encrypted
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Powered by <strong>PayDeck</strong> Payment Gateway
          </p>
        </div>
      </div>
    </div>
  );
}
