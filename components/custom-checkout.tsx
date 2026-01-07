"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mock payment link data
  const paymentInfo = {
    merchant: "TechStore Inc",
    title: "Premium Plan - Annual",
    description: "Access to all premium features for 12 months",
    amount: 299.99,
    currency: "USD",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

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
                Your payment has been processed successfully.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg text-left">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Amount Paid</span>
                <span className="font-semibold">
                  ${paymentInfo.amount} {paymentInfo.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Receipt sent to</span>
                <span className="font-semibold">john@example.com</span>
              </div>
            </div>
            <Button className="w-full">Return to Merchant</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid gap-6 md:grid-cols-5">
        {/* Order Summary */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary-foreground">
                P
              </span>
            </div>
            <CardTitle>{paymentInfo.merchant}</CardTitle>
            <CardDescription>
              Secure checkout powered by PayDeck
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                {paymentInfo.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {paymentInfo.description}
              </p>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>${paymentInfo.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Processing Fee</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>
                  ${paymentInfo.amount.toFixed(2)} {paymentInfo.currency}
                </span>
              </div>
            </div>

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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <CreditCard className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Credit Card</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="wallet"
                      id="wallet"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="wallet"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Smartphone className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">
                        Digital Wallet
                      </span>
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
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Building2 className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Bank Transfer</span>
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
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Bitcoin className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">
                        Cryptocurrency
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === "card" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM / YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                </>
              )}

              {/* Digital Wallet */}
              {paymentMethod === "wallet" && (
                <div className="space-y-4 py-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 gap-2"
                  >
                    <div className="w-6 h-6 bg-black dark:bg-white rounded flex items-center justify-center">
                      <span className="text-white dark:text-black text-xs font-bold"></span>
                    </div>
                    Pay with Apple Pay
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 gap-2"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span className="text-xs font-bold">G</span>
                    </div>
                    Pay with Google Pay
                  </Button>
                </div>
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
                        <span className="font-medium">PayDeck Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Account Number:
                        </span>
                        <span className="font-medium">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Routing Number:
                        </span>
                        <span className="font-medium">021000021</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Reference:
                        </span>
                        <span className="font-medium">PAY-123456</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Cryptocurrency */}
              {paymentMethod === "crypto" && (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <div className="w-48 h-48 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">QR Code</p>
                    </div>
                    <p className="font-mono text-sm break-all">
                      bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Send exactly 0.00754 BTC to this address
                    </p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12"
                disabled={processing}
              >
                {processing
                  ? "Processing..."
                  : `Pay $${paymentInfo.amount.toFixed(2)}`}
              </Button>

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
