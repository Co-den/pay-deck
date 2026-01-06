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
  DialogTrigger,
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
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Configuration form state
  const [configForm, setConfigForm] = useState({
    publicKey: "",
    secretKey: "",
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
      setConfigForm({ publicKey: "", secretKey: "", testMode: true });
      
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading payment methods...</p>
        </div>
      </div>
    );
  }

  if (error && paymentMethods.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Failed to Load Payment Methods
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={loadPaymentMethods}>Try Again</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Methods</h1>
          <p className="text-muted-foreground">
            Configure payment providers for your customers
          </p>
        </div>
        {paymentMethods.length === 0 && (
          <Button onClick={handleInitialize} className="gap-2">
            <Zap className="w-4 h-4" />
            Initialize Payment Methods
          </Button>
        )}
      </div>

      {/* Summary */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeMethods}</div>
              <p className="text-xs text-muted-foreground">
                of {stats.totalMethods} available
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
                Using test credentials
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
              <div className="text-2xl font-bold">
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
          <CardContent className="py-12 text-center">
            <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No Payment Methods Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Initialize default payment methods to get started
            </p>
            <Button onClick={handleInitialize} className="gap-2">
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
                          {method.setupComplete && (
                            <Badge variant="outline">Configured</Badge>
                          )}
                          {method.configuration.testMode && (
                            <Badge variant="secondary">Test Mode</Badge>
                          )}
                        </div>
                        <CardDescription>{method.description}</CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={method.enabled}
                      onCheckedChange={() => handleToggle(method)}
                      disabled={!method.setupComplete}
                    />
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
                      <p className="font-medium">
                        {method.fees.percentage}%
                        {method.fees.fixedAmount > 0 &&
                          ` + ₦${method.fees.fixedAmount}`}
                        {method.fees.cap && ` (cap ₦${method.fees.cap})`}
                      </p>
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
                      <p className="font-medium">{method.settlementPeriod}</p>
                    </div>
                  </div>

                  {/* Limits */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Transaction Limits
                    </p>
                    <p className="text-sm">
                      ₦{method.limits.min.toLocaleString()} - ₦
                      {method.limits.max.toLocaleString()}
                    </p>
                  </div>

                  {/* Supported Currencies */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Supported Currencies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {method.supportedCurrencies.map((currency) => (
                        <Badge key={currency} variant="outline">
                          {currency}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {method.features.map((feature) => (
                        <Badge key={feature} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure {selectedMethod?.name}</DialogTitle>
            <DialogDescription>
              Enter your {selectedMethod?.provider} credentials
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfigure} className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Get your API keys from your {selectedMethod?.provider} dashboard.
                {selectedMethod?.provider === "Paystack" && (
                  <> Visit: https://dashboard.paystack.com/#/settings/developer</>
                )}
                {selectedMethod?.provider === "Flutterwave" && (
                  <> Visit: https://dashboard.flutterwave.com/settings/apis</>
                )}
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="publicKey">Public Key *</Label>
                <Input
                  id="publicKey"
                  placeholder="pk_test_..."
                  value={configForm.publicKey}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, publicKey: e.target.value })
                  }
                  required
                  disabled={configuring}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secretKey">Secret Key *</Label>
                <Input
                  id="secretKey"
                  type="password"
                  placeholder="sk_test_..."
                  value={configForm.secretKey}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, secretKey: e.target.value })
                  }
                  required
                  disabled={configuring}
                />
                <p className="text-xs text-muted-foreground">
                  Your secret key is encrypted and stored securely
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Test Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use test credentials for development
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
            </div>

            <div className="flex gap-3">
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowConfigDialog(false)}
                disabled={configuring}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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