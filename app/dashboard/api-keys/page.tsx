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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Copy,
  Check,
  Eye,
  EyeOff,
  Plus,
  RefreshCcw,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import {
  createApiKey,
  getApiKeys,
  deleteApiKey,
  rotateApiKey,
  type ApiKey,
  type CreateApiKeyRequest,
  type CreateApiKeyResponse,
} from "@/lib/api/apiKeys";

export default function APIKeysPage() {
  // State
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [newKeyData, setNewKeyData] = useState<CreateApiKeyResponse | null>(
    null
  );
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountStatusError, setAccountStatusError] = useState<string | null>(null);
  const [showLive, setShowLive] = useState(false);

  // Form state
  const [formData, setFormData] = useState<CreateApiKeyRequest>({
    name: "",
    type: "test",
    permissions: ["read", "write"],
  });

  // Load API keys on mount
  useEffect(() => {
    loadApiKeys();
  }, []);

  /**
   * Load all API keys from backend
   */
  async function loadApiKeys() {
    try {
      setLoading(true);
      setError(null);
      setAccountStatusError(null);
      const keys = await getApiKeys();
      setApiKeys(keys);
    } catch (err: any) {
      console.error("Failed to load API keys:", err);
      
      // Check if this is an account status error
      const errorMessage = err.message || "Failed to load API keys";
      if (errorMessage.toLowerCase().includes("account") && 
          (errorMessage.toLowerCase().includes("not active") || 
           errorMessage.toLowerCase().includes("pending") || 
           errorMessage.toLowerCase().includes("suspended") ||
           errorMessage.toLowerCase().includes("closed"))) {
        setAccountStatusError(errorMessage);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  /**
   * Create new API key
   */
  async function handleCreateKey(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter a key name");
      return;
    }

    try {
      setCreating(true);
      setError(null);
      setAccountStatusError(null);

      const response = await createApiKey(formData);

      // Store the full key (only shown once)
      setNewKeyData(response);

      // Add to list (use id or _id from backend)
      const newKey: ApiKey = {
        id: response.apiKey.id,
        _id: response.apiKey.id,
        name: response.apiKey.name,
        keyPrefix: response.apiKey.keyPrefix,
        type: response.apiKey.type,
        permissions: response.apiKey.permissions,
        isActive: true,
        usageCount: 0,
        lastUsed: null,
        expiresAt: response.apiKey.expiresAt,
        ipWhitelist: [],
        createdAt: response.apiKey.createdAt,
        updatedAt: response.apiKey.createdAt,
      };

      setApiKeys([newKey, ...apiKeys]);

      // Reset form
      setFormData({
        name: "",
        type: "test",
        permissions: ["read", "write"],
      });

      showToast("API key created successfully!", "success");
    } catch (err: any) {
      console.error("Failed to create API key:", err);
      
      // Check if this is an account status error
      const errorMessage = err.message || "Failed to create API key";
      if (errorMessage.toLowerCase().includes("account") && 
          (errorMessage.toLowerCase().includes("not active") || 
           errorMessage.toLowerCase().includes("pending") || 
           errorMessage.toLowerCase().includes("suspended") ||
           errorMessage.toLowerCase().includes("closed"))) {
        setAccountStatusError(errorMessage);
        setShowNewKeyDialog(false); // Close the dialog
      } else {
        setError(errorMessage);
      }
      
      showToast(errorMessage, "error");
    } finally {
      setCreating(false);
    }
  }

  /**
   * Delete API key
   */
  async function handleDeleteKey(id: string, name: string) {
    if (
      !confirm(
        `Are you sure you want to delete "${name}"?\n\nThis action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await deleteApiKey(id);
      setApiKeys(apiKeys.filter((key) => key.id !== id && key._id !== id));
      showToast("API key deleted successfully", "success");
    } catch (err: any) {
      console.error("Failed to delete API key:", err);
      showToast(err.message || "Failed to delete API key", "error");
    }
  }

  /**
   * Rotate API key
   */
  async function handleRotateKey(id: string, name: string) {
    if (
      !confirm(
        `Rotate API key "${name}"?\n\nThe old key will stop working immediately and you'll receive a new key.`
      )
    ) {
      return;
    }

    try {
      const response = await rotateApiKey(id);

      // Show new key in dialog
      setNewKeyData(response);
      setShowNewKeyDialog(true);

      // Update key in list
      setApiKeys(
        apiKeys.map((key) =>
          key.id === id || key._id === id
            ? {
                ...key,
                keyPrefix: response.apiKey.keyPrefix,
                usageCount: 0,
              }
            : key
        )
      );

      showToast("API key rotated successfully!", "success");
    } catch (err: any) {
      console.error("Failed to rotate API key:", err);
      showToast(err.message || "Failed to rotate API key", "error");
    }
  }

  /**
   * Copy to clipboard
   */
  function handleCopy(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    showToast("Copied to clipboard!", "success");
  }

  /**
   * Toggle key visibility
   */
  function toggleVisibility(id: string) {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  /**
   * Handle permission checkbox change
   */
  function handlePermissionChange(permission: string, checked: boolean) {
    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? [...(prev.permissions || []), permission]
        : (prev.permissions || []).filter((p) => p !== permission),
    }));
  }

  /**
   * Close dialog and reset
   */
  function closeDialog() {
    setShowNewKeyDialog(false);
    setNewKeyData(null);
    setFormData({
      name: "",
      type: "test",
      permissions: ["read", "write"],
    });
    setError(null);
  }

  /**
   * Show toast notification (simple implementation)
   */
  function showToast(message: string, type: "success" | "error") {
    // You can replace this with a proper toast library
    console.log(`[${type.toUpperCase()}]:`, message);
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading API keys...</p>
        </div>
      </div>
    );
  }

  // Account Status Error state
  if (accountStatusError && apiKeys.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-orange-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Account Verification Required
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {accountStatusError}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Please contact support if you believe this is an error.
                </p>
                <Button onClick={loadApiKeys} variant="outline">
                  Check Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error && apiKeys.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Failed to Load API Keys
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={loadApiKeys}>Try Again</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredKeys = showLive ? apiKeys.filter(key => key.type === "live") : apiKeys.filter(key => key.type === "test");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-muted-foreground">
            Manage your API keys for integrating with PayDeck
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="live-mode">Live Mode</Label>
            <Switch id="live-mode" checked={showLive} onCheckedChange={setShowLive} />
          </div>
          <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Generate a new API key to authenticate your requests to PayDeck
                </DialogDescription>
              </DialogHeader>

              {newKeyData ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> Copy your API key now. You won't
                      be able to see it again!
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label>Your New API Key</Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-3 py-2 bg-muted rounded-lg font-mono text-sm break-all">
                        {newKeyData.key}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(newKeyData.key, "new-key")}
                        className="shrink-0"
                      >
                        {copied === "new-key" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Key Details</Label>
                    <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">
                          {newKeyData.apiKey.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <Badge
                          variant={
                            newKeyData.apiKey.type === "live"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {newKeyData.apiKey.type}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Permissions:
                        </span>
                        <span className="font-medium">
                          {newKeyData.apiKey.permissions.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={closeDialog}>
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleCreateKey} className="space-y-6">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="keyName">Key Name *</Label>
                    <Input
                      id="keyName"
                      placeholder="e.g., Production API Key"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      A descriptive name to help you identify this key
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keyType">Key Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "test" | "live") =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger id="keyType">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test">
                          Test Key (for development)
                        </SelectItem>
                        <SelectItem value="live">
                          Live Key (for production)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(formData.permissions ?? []).includes("read")}
                          onChange={(e) =>
                            handlePermissionChange("read", e.target.checked)
                          }
                          className="rounded"
                        />
                        <span className="text-sm">
                          Read - View transactions and data
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(formData.permissions ?? []).includes("write")}
                          onChange={(e) =>
                            handlePermissionChange("write", e.target.checked)
                          }
                          className="rounded"
                        />
                        <span className="text-sm">
                          Write - Create payments and charges
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(formData.permissions ?? []).includes("refund")}
                          onChange={(e) =>
                            handlePermissionChange("refund", e.target.checked)
                          }
                          className="rounded"
                        />
                        <span className="text-sm">Refund - Process refunds</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(formData.permissions ?? []).includes("webhook")}
                          onChange={(e) =>
                            handlePermissionChange("webhook", e.target.checked)
                          }
                          className="rounded"
                        />
                        <span className="text-sm">Webhook - Manage webhooks</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1" disabled={creating}>
                      {creating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Generate Key"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeDialog}
                      disabled={creating}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Warning */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Keep your API keys secure. Never share them publicly or commit them to
          version control.
        </AlertDescription>
      </Alert>

      {/* Empty State */}
      {filteredKeys.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{showLive ? "No Live API Keys Found" : "No Test API Keys Found"}</h3>
                <p className="text-muted-foreground mb-4">
                  {showLive ? "Switch to test mode or create a new live API key to get started." : "Switch to live mode or create a new test API key to get started."}
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => setShowNewKeyDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create API Key
                  </Button>
                  <Button variant="outline" onClick={loadApiKeys} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load Existing Keys"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* API Keys List */
        <div className="space-y-4">
          {filteredKeys.map((key) => {
            const keyId = key.id || key._id || "";
            return (
              <Card key={keyId}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{key.name}</CardTitle>
                        <Badge
                          variant={
                            key.type === "live" ? "default" : "secondary"
                          }
                        >
                          {key.type}
                        </Badge>
                        {!key.isActive && (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </div>
                      <CardDescription>
                        Created {new Date(key.createdAt).toLocaleDateString()} •
                        Last used{" "}
                        {key.lastUsed
                          ? new Date(key.lastUsed).toLocaleString()
                          : "Never"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* API Key */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      API Key
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-3 py-2 bg-muted rounded-lg font-mono text-sm">
                        {visibleKeys.has(keyId)
                          ? `${key.keyPrefix}${"•".repeat(40)}`
                          : `${key.keyPrefix}${"•".repeat(40)}`}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleVisibility(keyId)}
                        title="Full key cannot be displayed"
                      >
                        {visibleKeys.has(keyId) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(key.keyPrefix, keyId)}
                        title="Copy key prefix"
                      >
                        {copied === keyId ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The full key cannot be displayed. Rotate the key to
                      generate a new one.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Usage</p>
                      <p className="text-lg font-semibold">
                        {key.usageCount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">requests</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Permissions
                      </p>
                      <p className="text-lg font-semibold">
                        {key.permissions.length}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {key.permissions.join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p
                        className={`text-lg font-semibold ${
                          key.isActive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {key.isActive ? "Active" : "Inactive"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {key.isActive ? "No issues" : "Disabled"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expires</p>
                      <p className="text-lg font-semibold">
                        {key.expiresAt ? (
                          <span className="text-orange-600">
                            {new Date(key.expiresAt).toLocaleDateString()}
                          </span>
                        ) : (
                          "Never"
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {key.expiresAt ? "Expires on date" : "No expiration"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleRotateKey(keyId, key.name)}
                    >
                      <RefreshCcw className="w-4 h-4" />
                      Rotate Key
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteKey(keyId, key.name)}
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

      {/* Documentation Link */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Learn how to integrate PayDeck into your application
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button variant="outline" asChild>
            <a href="/docs" target="_blank">
              View Documentation
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/api-reference" target="_blank">
              API Reference
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/paydeck/examples"
              target="_blank"
              rel="noopener noreferrer"
            >
              Example Code
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
