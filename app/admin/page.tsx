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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  User,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  getPendingMerchants,
  verifyBusiness,
  rejectBusiness,
  getAdminStats,
  type PendingMerchant,
} from "@/lib/api/admin";

export default function AdminVerificationPage() {
  const [pendingMerchants, setPendingMerchants] = useState<PendingMerchant[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedMerchant, setSelectedMerchant] =
    useState<PendingMerchant | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    pendingVerification: 0,
    verifiedToday: 0,
    averageReviewTime: "18h",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // Load both merchants and stats in parallel
      const [merchants, adminStats] = await Promise.all([
        getPendingMerchants().catch(() => []), // Fallback to empty array if API fails
        getAdminStats().catch(() => null), // Fallback to null if API fails
      ]);

      setPendingMerchants(merchants);

      if (adminStats) {
        setStats({
          pendingVerification: adminStats.pendingVerification,
          verifiedToday: adminStats.verifiedToday,
          averageReviewTime: adminStats.averageReviewTime,
        });
      } else {
        // Fallback stats
        setStats((prev) => ({
          ...prev,
          pendingVerification: merchants.length,
        }));
      }
    } catch (err: any) {
      console.error("Failed to load admin data:", err);
      setError(err.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(merchantId: string) {
    try {
      setProcessing(true);

      await verifyBusiness(merchantId, verificationNotes);

      // Remove from pending list and refresh data
      setPendingMerchants(pendingMerchants.filter((m) => m.id !== merchantId));
      setSelectedMerchant(null);
      setVerificationNotes("");

      // Refresh stats
      loadData();

      alert("Merchant verified successfully!");
    } catch (error: any) {
      console.error("Failed to verify merchant:", error);
      alert(error.message || "Failed to verify merchant");
    } finally {
      setProcessing(false);
    }
  }

  async function handleReject(merchantId: string) {
    if (!confirm("Are you sure you want to reject this business account?")) {
      return;
    }

    try {
      setProcessing(true);

      await rejectBusiness(merchantId, verificationNotes);

      // Remove from pending list and refresh data
      setPendingMerchants(pendingMerchants.filter((m) => m.id !== merchantId));
      setSelectedMerchant(null);
      setVerificationNotes("");

      // Refresh stats
      loadData();

      alert("Merchant rejected successfully");
    } catch (error: any) {
      console.error("Failed to reject merchant:", error);
      alert(error.message || "Failed to reject merchant");
    } finally {
      setProcessing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading pending merchants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Failed to Load Admin Data
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={loadData}>Try Again</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Business Verification</h1>
        <p className="text-muted-foreground">
          Review and verify pending business accounts
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.pendingVerification}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Verified Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verifiedToday}</div>
            <p className="text-xs text-muted-foreground">Approved accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Review Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageReviewTime}</div>
            <p className="text-xs text-muted-foreground">Within 24-48h SLA</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Merchants List */}
      {pendingMerchants.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
            <p className="text-muted-foreground">
              No pending business accounts to review
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingMerchants.map((merchant) => (
            <Card key={merchant.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                      <CardTitle className="text-lg">
                        {merchant.businessName}
                      </CardTitle>
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" />
                        Pending
                      </Badge>
                    </div>
                    <CardDescription>
                      Registered {new Date(merchant.createdAt).toLocaleString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Business Info */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{merchant.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{merchant.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Business Type
                    </p>
                    <p className="font-medium capitalize">
                      {merchant.businessType.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge>{merchant.accountStatus}</Badge>
                  </div>
                </div>

                {/* Verification Documents */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Verification Documents
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">
                        RC Number (CAC)
                      </p>
                      <p className="font-mono font-semibold">
                        {merchant.businessVerification.rcNumber}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Corporate Affairs Commission
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">
                        National Identity Number
                      </p>
                      <p className="font-mono font-semibold">
                        {merchant.businessVerification.nin}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        11-digit NIN
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">
                        Tax ID (TIN)
                      </p>
                      <p className="font-mono font-semibold">
                        {merchant.businessVerification.taxId}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Federal Inland Revenue Service
                      </p>
                    </div>
                  </div>
                </div>

                {/* Verification Checklist */}
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Verification Checklist:</strong>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li>Verify RC Number with CAC database</li>
                      <li>Confirm NIN with NIMC records</li>
                      <li>Validate Tax ID with FIRS</li>
                      <li>Check business name matches registration</li>
                      <li>Verify contact information</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                {/* Actions */}
                <div className="flex gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="flex-1 gap-2"
                        onClick={() => setSelectedMerchant(merchant)}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve & Verify
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Verify Business Account</DialogTitle>
                        <DialogDescription>
                          Approve this business to activate their account
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="font-semibold mb-1">
                            {merchant.businessName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {merchant.email}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Verification Notes</Label>
                          <Textarea
                            id="notes"
                            placeholder="Add any notes about the verification..."
                            value={verificationNotes}
                            onChange={(e) =>
                              setVerificationNotes(e.target.value)
                            }
                            rows={3}
                          />
                        </div>

                        <Alert>
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            This will activate the merchant's account and allow
                            them to start processing payments.
                          </AlertDescription>
                        </Alert>

                        <div className="flex gap-3">
                          <Button
                            className="flex-1"
                            onClick={() => handleApprove(merchant.id)}
                            disabled={processing}
                          >
                            {processing ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Verifying...
                              </>
                            ) : (
                              "Confirm Verification"
                            )}
                          </Button>
                          <DialogTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogTrigger>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    className="gap-2 text-red-600 hover:text-red-700"
                    onClick={() => handleReject(merchant.id)}
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
