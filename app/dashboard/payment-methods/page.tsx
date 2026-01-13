"use client";

import { useState, useEffect } from "react";
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
} from "@/components/ui/dialog";
import {
  CreditCard,
  Smartphone,
  Building2,
  Bitcoin,
  CheckCircle,
  Settings as SettingsIcon,
  Loader2,
  AlertCircle,
  Zap,
  Hash,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  getPaymentMethods,
  updatePaymentMethod,
  enablePaymentMethod,
  disablePaymentMethod,
  testPaymentMethod,
  getPaymentMethodStats,
  initializePaymentMethods,
  type PaymentMethod,
  type PaymentMethodStats,
} from "@/lib/api/payment-methods";

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [stats, setStats] = useState<PaymentMethodStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuration form state
  const [configForm, setConfigForm] = useState({
    publicKey: "",
    secretKey: "",
    apiKey: "",
    merchantId: "",
    webhookSecret: "",
    testMode: true,
  });

  useEffect(() => {
    loadPaymentMethods();
    loadStats();
  }, []);

  async function loadPaymentMethods() {
    try {
      setLoading(true);
      setError(null);
      const methods = await getPaymentMethods();
      setPaymentMethods(methods);

      // If no payment methods, initialize defaults
      if (methods.length === 0) {
        await handleInitialize();
      }
    } catch (err: any) {
      console.error("Failed to load payment methods:", err);
      setError(err.message || "Failed to load payment methods");
    } finally {
      setLoading(false);
    }
  }

  async function loadStats() {
    try {
      const statsData = await getPaymentMethodStats();
      setStats(statsData);
    } catch (err: any) {
      console.error("Failed to load stats:", err);
    }
  }

  async function handleInitialize() {
    try {
      const methods = await initializePaymentMethods();
      setPaymentMethods(methods);
    } catch (err: any) {
      console.error("Failed to initialize payment methods:", err);
    }
  }

  async function handleToggle(method: PaymentMethod) {
    try {
      const updatedMethod = method.enabled
        ? await disablePaymentMethod(method.id || method._id!)
        : await enablePaymentMethod(method.id || method._id!);

      setPaymentMethods(
        paymentMethods.map((m) =>
          (m.id || m._id) === (method.id || method._id) ? updatedMethod : m
        )
      );

      await loadStats();
    } catch (err: any) {
      alert(err.message || "Failed to toggle payment method");
    }
  }

  async function handleConfigure(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedMethod) return;

    try {
      setConfiguring(true);

      const updatedMethod = await updatePaymentMethod(
        selectedMethod.id || selectedMethod._id!,
        {
          configuration: configForm,
        }
      );

      setPaymentMethods(
        paymentMethods.map((m) =>
          (m.id || m._id) === (selectedMethod.id || selectedMethod._id)
            ? updatedMethod
            : m
        )
      );

      setShowConfigDialog(false);
      setSelectedMethod(null);
      setConfigForm({
        publicKey: "",
        secretKey: "",
        apiKey: "",
        merchantId: "",
        webhookSecret: "",
        testMode: true,
      });

      alert("Payment method configured successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to configure payment method");
    } finally {
      setConfiguring(false);
    }
  }

  async function handleTest(method: PaymentMethod) {
    try {
      setTesting(true);

      const result = await testPaymentMethod(method.id || method._id!);

      if (result.success) {
        alert(`✅ ${result.message}`);
      } else {
        alert(`❌ ${result.message}`);
      }
    } catch (err: any) {
      alert("Test failed: " + (err.message || "Unknown error"));
    } finally {
      setTesting(false);
    }
  }

  function openConfigDialog(method: PaymentMethod) {
    setSelectedMethod(method);
    setConfigForm({
      publicKey: method.configuration.publicKey || "",
      secretKey: "",
      apiKey: method.configuration.apiKey || "",
      merchantId: method.configuration.merchantId || "",
      webhookSecret: "",
      testMode: method.configuration.testMode ?? true,
    });
    setShowConfigDialog(true);
  }

  function getMethodIcon(type: string) {
    switch (type) {
      case "card":
        return CreditCard;
      case "mobile_money":
        return Smartphone;
      case "bank_transfer":
        return Building2;
      case "crypto":
        return Bitcoin;
      case "ussd":
        return Hash;
      default:
        return CreditCard;
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">
            Loading payment methods...
          </p>
        </div>
      </div>
    );
  }

  if (error && paymentMethods.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  Failed to Load Payment Methods
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  {error}
                </p>
                <Button
                  onClick={loadPaymentMethods}
                  className="w-full sm:w-auto"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Payment Methods</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Configure payment providers for your customers
          </p>
        </div>
        {paymentMethods.length === 0 && (
          <Button onClick={handleInitialize} className="gap-2 w-full sm:w-auto">
            <Zap className="w-4 h-4" />
            Initialize Payment Methods
          </Button>
        )}
      </div>

      {/* Summary */}
      {stats && (
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                Active Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {stats.activeMethods}
              </div>
              <p className="text-xs text-muted-foreground">
                of {stats.totalMethods} available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                Test Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                Using test credentials
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                Avg Processing Fee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {stats.averageFee.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Across all methods
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {paymentMethods.length === 0 && (
        <Card>
          <CardContent className="py-8 sm:py-12 text-center">
            <CreditCard className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              No Payment Methods Yet
            </h3>
            <p className="text-sm text-muted-foreground mb-4 px-4">
              Initialize default payment methods to get started
            </p>
            <Button
              onClick={handleInitialize}
              className="gap-2 w-full sm:w-auto"
            >
              <Zap className="w-4 h-4" />
              Initialize Payment Methods
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods List */}
      {paymentMethods.length > 0 && (
        <div className="space-y-4">
          {paymentMethods.map((method) => {
            const Icon = getMethodIcon(method.type);
            const methodId = method.id || method._id!;

            return (
              <Card key={methodId}>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex gap-3 sm:gap-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 ${
                          method.enabled
                            ? "bg-green-100 dark:bg-green-900"
                            : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            method.enabled
                              ? "text-purple-600 dark:text-green-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <CardTitle className="text-base sm:text-lg">
                            {method.name}
                          </CardTitle>
                          {method.enabled && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          )}
                          {method.setupComplete && (
                            <Badge variant="outline" className="text-xs">
                              Configured
                            </Badge>
                          )}
                          {method.configuration.testMode && (
                            <Badge variant="secondary" className="text-xs">
                              Test Mode
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-xs sm:text-sm">
                          {method.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={method.enabled}
                      onCheckedChange={() => handleToggle(method)}
                      disabled={!method.setupComplete}
                      className="shrink-0"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Provider</p>
                      <p className="text-sm font-medium truncate">
                        {method.provider}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Processing Fee
                      </p>
                      <p className="text-sm font-medium">
                        {method.fees.percentage}%
                        {method.fees.fixedAmount > 0 &&
                          ` + ₦${method.fees.fixedAmount}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Setup Status
                      </p>
                      <p className="text-sm font-medium">
                        {method.setupComplete ? "Complete" : "Not configured"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Settlement
                      </p>
                      <p className="text-sm font-medium">
                        {method.settlementPeriod}
                      </p>
                    </div>
                  </div>

                  {/* Limits */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Transaction Limits
                    </p>
                    <p className="text-xs sm:text-sm">
                      ₦{method.limits.min.toLocaleString()} - ₦
                      {method.limits.max.toLocaleString()}
                    </p>
                  </div>

                  {/* Supported Currencies */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Supported Currencies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {method.supportedCurrencies.map((currency) => (
                        <Badge
                          key={currency}
                          variant="outline"
                          className="text-xs"
                        >
                          {currency}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {method.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 w-full sm:w-auto text-sm"
                      onClick={() => openConfigDialog(method)}
                    >
                      <SettingsIcon className="w-4 h-4" />
                      {method.setupComplete ? "Reconfigure" : "Setup"}
                    </Button>

                    {method.setupComplete && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTest(method)}
                        disabled={testing}
                        className="w-full sm:w-auto text-sm"
                      >
                        {testing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Testing...
                          </>
                        ) : (
                          "Test Connection"
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Configuration Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Configure {selectedMethod?.name}
            </DialogTitle>
            <DialogDescription className="text-sm">
              Enter your {selectedMethod?.provider} credentials
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfigure} className="space-y-4 sm:space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs sm:text-sm">
                Get your API keys from your {selectedMethod?.provider}{" "}
                dashboard.
                {selectedMethod?.provider === "Paystack" && (
                  <>
                    {" "}
                    Visit: https://dashboard.paystack.com/#/settings/developer
                  </>
                )}
                {selectedMethod?.provider === "Flutterwave" && (
                  <> Visit: https://dashboard.flutterwave.com/settings/apis</>
                )}
                {selectedMethod?.provider === "Coinbase Commerce" && (
                  <> Visit: https://commerce.coinbase.com/dashboard/settings</>
                )}
                {selectedMethod?.provider === "Yellow Card" && (
                  <> Visit: https://business.yellowcard.io/settings/api</>
                )}
                {selectedMethod?.provider === "Binance Pay" && (
                  <>
                    {" "}
                    Visit:
                    https://merchant.binance.com/en/dashboard/account-management/api-management
                  </>
                )}
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {/* Card/Bank providers (Paystack, Flutterwave) */}
              {(selectedMethod?.type === "card" ||
                selectedMethod?.type === "bank_transfer" ||
                selectedMethod?.type === "ussd" ||
                selectedMethod?.type === "mobile_money") && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="publicKey" className="text-sm">
                      Public Key *
                    </Label>
                    <Input
                      id="publicKey"
                      placeholder="pk_test_..."
                      value={configForm.publicKey}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          publicKey: e.target.value,
                        })
                      }
                      required
                      disabled={configuring}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secretKey" className="text-sm">
                      Secret Key *
                    </Label>
                    <Input
                      id="secretKey"
                      type="password"
                      placeholder="sk_test_..."
                      value={configForm.secretKey}
                      onChange={(e) =>
                        setConfigForm({
                          ...configForm,
                          secretKey: e.target.value,
                        })
                      }
                      required
                      disabled={configuring}
                      className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">
                      Your secret key is encrypted and stored securely
                    </p>
                  </div>
                </>
              )}

              {/* Crypto providers */}
              {selectedMethod?.type === "crypto" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey" className="text-sm">
                      API Key *
                    </Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Enter your API key..."
                      value={configForm.apiKey}
                      onChange={(e) =>
                        setConfigForm({ ...configForm, apiKey: e.target.value })
                      }
                      required
                      disabled={configuring}
                      className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">
                      Your API key is encrypted and stored securely
                    </p>
                  </div>

                  {(selectedMethod?.provider === "Yellow Card" ||
                    selectedMethod?.provider === "Binance Pay") && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="secretKey" className="text-sm">
                          Secret Key *
                        </Label>
                        <Input
                          id="secretKey"
                          type="password"
                          placeholder="Enter your secret key..."
                          value={configForm.secretKey}
                          onChange={(e) =>
                            setConfigForm({
                              ...configForm,
                              secretKey: e.target.value,
                            })
                          }
                          required
                          disabled={configuring}
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="merchantId" className="text-sm">
                          Merchant ID
                        </Label>
                        <Input
                          id="merchantId"
                          placeholder="Your merchant ID..."
                          value={configForm.merchantId}
                          onChange={(e) =>
                            setConfigForm({
                              ...configForm,
                              merchantId: e.target.value,
                            })
                          }
                          disabled={configuring}
                          className="h-11"
                        />
                      </div>
                    </>
                  )}

                  {selectedMethod?.provider === "Coinbase Commerce" && (
                    <div className="space-y-2">
                      <Label htmlFor="webhookSecret" className="text-sm">
                        Webhook Secret
                      </Label>
                      <Input
                        id="webhookSecret"
                        type="password"
                        placeholder="Optional - for webhook verification"
                        value={configForm.webhookSecret}
                        onChange={(e) =>
                          setConfigForm({
                            ...configForm,
                            webhookSecret: e.target.value,
                          })
                        }
                        disabled={configuring}
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">
                        Used to verify webhook signatures
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Test Mode Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Test Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    {selectedMethod?.type === "crypto"
                      ? "Use testnet/sandbox for crypto testing"
                      : "Use test credentials for development"}
                  </p>
                </div>
                <Switch
                  checked={configForm.testMode}
                  onCheckedChange={(checked) =>
                    setConfigForm({ ...configForm, testMode: checked })
                  }
                  disabled={configuring}
                />
              </div>

              {/* Crypto Info Alert */}
              {selectedMethod?.type === "crypto" && (
                <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200 text-xs sm:text-sm">
                    <strong>Crypto Payment Benefits:</strong>
                    <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                      <li>Instant settlement (T+0)</li>
                      <li>Low fees (0-1%)</li>
                      <li>Global payments</li>
                      <li>No chargebacks</li>
                      <li>
                        Auto-convert to{" "}
                        {selectedMethod?.provider === "Yellow Card"
                          ? "NGN"
                          : "fiat"}
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowConfigDialog(false)}
                disabled={configuring}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={configuring}>
                {configuring ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Configuration"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Payment Settings
          </CardTitle>
          <CardDescription className="text-sm">
            Configure global payment behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm">Save Customer Payment Methods</Label>
              <p className="text-xs text-muted-foreground">
                Allow customers to save cards for future payments
              </p>
            </div>
            <Switch defaultChecked className="shrink-0" />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm">
                Automatic Retry for Failed Payments
              </Label>
              <p className="text-xs text-muted-foreground">
                Retry failed payments automatically
              </p>
            </div>
            <Switch defaultChecked className="shrink-0" />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <Label className="text-sm">Send Payment Receipts</Label>
              <p className="text-xs text-muted-foreground">
                Automatically email receipts to customers
              </p>
            </div>
            <Switch defaultChecked className="shrink-0" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
