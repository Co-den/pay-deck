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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Smartphone,
  Building2,
  Bitcoin,
  CheckCircle,
  Settings as SettingsIcon,
} from "lucide-react";

export default function PaymentMethodsPage() {
  const [showStripeDialog, setShowStripeDialog] = useState(false);

  const paymentMethods = [
    {
      id: "cards",
      name: "Credit & Debit Cards",
      icon: CreditCard,
      description: "Accept Visa, Mastercard, American Express, and more",
      enabled: true,
      provider: "Stripe",
      setupComplete: true,
      fees: "2.9% + $0.30",
      supported: ["Visa", "Mastercard", "Amex", "Discover"],
    },
    {
      id: "wallets",
      name: "Digital Wallets",
      icon: Smartphone,
      description: "Apple Pay, Google Pay, and other mobile wallets",
      enabled: true,
      provider: "PayDeck",
      setupComplete: true,
      fees: "2.9% + $0.30",
      supported: ["Apple Pay", "Google Pay", "Samsung Pay"],
    },
    {
      id: "bank",
      name: "Bank Transfers",
      icon: Building2,
      description: "ACH, SEPA, and local bank transfer methods",
      enabled: false,
      provider: "Plaid",
      setupComplete: false,
      fees: "0.8% (max $5)",
      supported: ["ACH (US)", "SEPA (EU)", "Wire Transfer"],
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: Bitcoin,
      description: "Accept Bitcoin, Ethereum, USDC, and other cryptocurrencies",
      enabled: false,
      provider: "Coinbase Commerce",
      setupComplete: false,
      fees: "1%",
      supported: ["Bitcoin", "Ethereum", "USDC", "USDT"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Payment Methods</h1>
        <p className="text-muted-foreground">
          Configure which payment methods your customers can use
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {paymentMethods.filter((m) => m.enabled).length}
            </div>
            <p className="text-xs text-muted-foreground">
              of {paymentMethods.length} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Test Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Switch to live in settings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Processing Fee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.9%</div>
            <p className="text-xs text-muted-foreground">
              + $0.30 per transaction
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Card key={method.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        method.enabled
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          method.enabled
                            ? "text-green-600 dark:text-green-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{method.name}</CardTitle>
                        {method.enabled && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        )}
                        {method.setupComplete && method.enabled && (
                          <Badge variant="outline">Configured</Badge>
                        )}
                      </div>
                      <CardDescription>{method.description}</CardDescription>
                    </div>
                  </div>
                  <Switch checked={method.enabled} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Details */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Provider</p>
                    <p className="font-medium">{method.provider}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Processing Fee
                    </p>
                    <p className="font-medium">{method.fees}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Setup Status
                    </p>
                    <p className="font-medium">
                      {method.setupComplete ? "Complete" : "Not configured"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Settlement</p>
                    <p className="font-medium">2-3 business days</p>
                  </div>
                </div>

                {/* Supported Types */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Supported
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {method.supported.map((type) => (
                      <Badge key={type} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {method.setupComplete ? (
                    <Dialog
                      open={showStripeDialog && method.id === "cards"}
                      onOpenChange={setShowStripeDialog}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <SettingsIcon className="w-4 h-4" />
                          Configure
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Configure {method.name}</DialogTitle>
                          <DialogDescription>
                            Manage your payment method settings
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Stripe Account</Label>
                              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                                <div>
                                  <p className="font-medium">
                                    Connected Account
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    acct_1234567890
                                  </p>
                                </div>
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  Connected
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>3D Secure Authentication</Label>
                                  <p className="text-sm text-muted-foreground">
                                    Additional security for card payments
                                  </p>
                                </div>
                                <Switch defaultChecked />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Accepted Card Brands</Label>
                              <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    defaultChecked
                                    className="rounded"
                                  />
                                  <span className="text-sm">Visa</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    defaultChecked
                                    className="rounded"
                                  />
                                  <span className="text-sm">Mastercard</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    defaultChecked
                                    className="rounded"
                                  />
                                  <span className="text-sm">
                                    American Express
                                  </span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    defaultChecked
                                    className="rounded"
                                  />
                                  <span className="text-sm">Discover</span>
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button className="flex-1">Save Changes</Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowStripeDialog(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button size="sm" className="gap-2">
                      Connect {method.provider}
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Configure global payment behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Save Customer Payment Methods</Label>
              <p className="text-sm text-muted-foreground">
                Allow customers to save cards for future payments
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Automatic Retry for Failed Payments</Label>
              <p className="text-sm text-muted-foreground">
                Retry failed payments automatically
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Send Payment Receipts</Label>
              <p className="text-sm text-muted-foreground">
                Automatically email receipts to customers
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
