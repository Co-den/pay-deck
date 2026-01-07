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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Copy,
  Check,
  Link2,
  QrCode,
  Eye,
  Trash2,
  Plus,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  getPaymentLinks,
  createPaymentLink,
  deletePaymentLink,
  disablePaymentLink,
  enablePaymentLink,
  getPaymentLinkStats,
  getPaymentLinkQR,
  type PaymentLink,
  type PaymentLinkStats,
  type CreatePaymentLinkRequest,
} from "@/lib/api/paymentLinks";

export default function PaymentLinksPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [showNewLinkDialog, setShowNewLinkDialog] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
  const [stats, setStats] = useState<PaymentLinkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<CreatePaymentLinkRequest>({
    title: "",
    description: "",
    amount: 0,
    currency: "NGN",
    expiresAt: null,
    maxUses: null,
    settings: {
      collectShipping: false,
      collectPhone: true,
      allowQuantity: false,
      redirectUrl: "",
      successMessage: "",
    },
  });

  useEffect(() => {
    loadPaymentLinks();
    loadStats();
  }, []);

  async function loadPaymentLinks() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPaymentLinks();
      setPaymentLinks(data.paymentLinks);
    } catch (err: any) {
      console.error("Failed to load payment links:", err);
      setError(err.message || "Failed to load payment links");
    } finally {
      setLoading(false);
    }
  }

  async function loadStats() {
    try {
      const statsData = await getPaymentLinkStats();
      setStats(statsData);
    } catch (err: any) {
      console.error("Failed to load stats:", err);
    }
  }

  async function handleCreateLink(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.title || formData.amount <= 0) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setCreating(true);

      const newLink = await createPaymentLink(formData);

      setPaymentLinks([newLink, ...paymentLinks]);
      setShowNewLinkDialog(false);

      // Reset form
      setFormData({
        title: "",
        description: "",
        amount: 0,
        currency: "NGN",
        expiresAt: null,
        maxUses: null,
        settings: {
          collectShipping: false,
          collectPhone: true,
          allowQuantity: false,
          redirectUrl: "",
          successMessage: "",
        },
      });

      await loadStats();

      // Show success with link
      alert(
        `✅ Payment link created!\n\nURL: ${newLink.url}\n\nClick "Copy" to share with customers.`
      );
    } catch (err: any) {
      alert(
        "Failed to create payment link: " + (err.message || "Unknown error")
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(link: PaymentLink) {
    if (!confirm(`Are you sure you want to delete "${link.title}"?`)) {
      return;
    }

    try {
      await deletePaymentLink(link.id || link._id!);
      setPaymentLinks(
        paymentLinks.filter((l) => (l.id || l._id) !== (link.id || link._id))
      );
      await loadStats();
    } catch (err: any) {
      alert(
        "Failed to delete payment link: " + (err.message || "Unknown error")
      );
    }
  }

  async function handleToggleStatus(link: PaymentLink) {
    try {
      const updatedLink =
        link.status === "active"
          ? await disablePaymentLink(link.id || link._id!)
          : await enablePaymentLink(link.id || link._id!);

      setPaymentLinks(
        paymentLinks.map((l) =>
          (l.id || l._id) === (link.id || link._id) ? updatedLink : l
        )
      );
      await loadStats();
    } catch (err: any) {
      alert(
        "Failed to update payment link: " + (err.message || "Unknown error")
      );
    }
  }

  async function handleShowQR(link: PaymentLink) {
    try {
      const qrCode = await getPaymentLinkQR(link.id || link._id!);
      setSelectedQR(qrCode);
      setShowQRDialog(true);
    } catch (err: any) {
      alert("Failed to generate QR code: " + (err.message || "Unknown error"));
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      expired: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      disabled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return variants[status] || variants.active;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading payment links...</p>
        </div>
      </div>
    );
  }

  if (error && paymentLinks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Failed to Load Payment Links
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={loadPaymentLinks}>Try Again</Button>
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Links</h1>
          <p className="text-muted-foreground">
            Create shareable payment links for quick transactions
          </p>
        </div>
        <Dialog open={showNewLinkDialog} onOpenChange={setShowNewLinkDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Payment Link
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Payment Link</DialogTitle>
              <DialogDescription>
                Generate a shareable payment link for your customers
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateLink} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="5000"
                    step="0.01"
                    min="0"
                    value={formData.amount || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                    required
                    disabled={creating}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency *</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) =>
                      setFormData({ ...formData, currency: value })
                    }
                    disabled={creating}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NGN">NGN - Nigerian Naira</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                      <SelectItem value="USDT">USDT - Tether</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Premium Plan - Annual"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  disabled={creating}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Optional description for customers"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  disabled={creating}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="expires">Expiration</Label>
                  <Select
                    value={formData.expiresAt ? "custom" : "never"}
                    onValueChange={(value) => {
                      if (value === "never") {
                        setFormData({ ...formData, expiresAt: null });
                      } else {
                        const date = new Date();
                        if (value === "24h")
                          date.setHours(date.getHours() + 24);
                        else if (value === "7d")
                          date.setDate(date.getDate() + 7);
                        else if (value === "30d")
                          date.setDate(date.getDate() + 30);
                        setFormData({
                          ...formData,
                          expiresAt: date.toISOString(),
                        });
                      }
                    }}
                    disabled={creating}
                  >
                    <SelectTrigger id="expires">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never expires</SelectItem>
                      <SelectItem value="24h">24 hours</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxUses">Max Uses</Label>
                  <Input
                    id="maxUses"
                    type="number"
                    placeholder="Unlimited"
                    min="1"
                    value={formData.maxUses || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxUses: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                      })
                    }
                    disabled={creating}
                  />
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your payment link will be accessible at:{" "}
                  <strong>yoursite.com/pay/XXXXXXXX</strong>
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1" disabled={creating}>
                  {creating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Generate Link"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewLinkDialog(false)}
                  disabled={creating}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLinks}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeLinks} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Uses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUses}</div>
              <p className="text-xs text-muted-foreground">
                Successful payments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₦{stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                From payment links
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₦
                {stats.averageOrderValue.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
              <p className="text-xs text-muted-foreground">Per transaction</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {paymentLinks.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Link2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Payment Links Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first payment link to start accepting payments
            </p>
            <Button
              onClick={() => setShowNewLinkDialog(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Payment Link
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Payment Links List */}
      {paymentLinks.length > 0 && (
        <div className="space-y-4">
          {paymentLinks.map((link) => {
            const linkId = link.id || link._id!;

            return (
              <Card key={linkId}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{link.title}</CardTitle>
                        <Badge className={getStatusBadge(link.status)}>
                          {link.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {link.currency} {link.amount.toLocaleString()} • Created{" "}
                        {new Date(link.createdAt).toLocaleDateString()}
                        {link.expiresAt &&
                          ` • Expires ${new Date(
                            link.expiresAt
                          ).toLocaleDateString()}`}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Link URL */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-3 py-2 bg-muted rounded-lg font-mono text-sm truncate">
                      {link.url}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(link.url, linkId)}
                      className="shrink-0"
                    >
                      {copied === linkId ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Uses</p>
                      <p className="text-lg font-semibold">
                        {link.currentUses}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-lg font-semibold">
                        ₦{link.stats.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Views</p>
                      <p className="text-lg font-semibold">
                        {link.stats.totalViews}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Conversion
                      </p>
                      <p className="text-lg font-semibold">
                        {link.stats.conversionRate.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => window.open(link.url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleShowQR(link)}
                    >
                      <QrCode className="w-4 h-4" />
                      QR Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleToggleStatus(link)}
                    >
                      {link.status === "active" ? "Disable" : "Enable"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(link)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* QR Code Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Link QR Code</DialogTitle>
            <DialogDescription>
              Customers can scan this QR code to access the payment link
            </DialogDescription>
          </DialogHeader>
          {selectedQR && (
            <div className="flex flex-col items-center space-y-4">
              <img
                src={selectedQR}
                alt="Payment Link QR Code"
                className="w-64 h-64 border-2 border-border rounded-lg"
              />
              <Button
                onClick={() => {
                  // Download QR code
                  const link = document.createElement("a");
                  link.download = "payment-link-qr.png";
                  link.href = selectedQR;
                  link.click();
                }}
                className="w-full"
              >
                Download QR Code
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
