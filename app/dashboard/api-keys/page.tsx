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
  const [accountStatusError, setAccountStatusError] = useState<string | null>(
    null
  );
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

  async function loadApiKeys() {
    try {
      setLoading(true);
      setError(null);
      setAccountStatusError(null);
      const keys = await getApiKeys();
      setApiKeys(keys);
    } catch (err: any) {
      console.error("Failed to load API keys:", err);

      const errorMessage = err.message || "Failed to load API keys";
      if (
        errorMessage.toLowerCase().includes("account") &&
        (errorMessage.toLowerCase().includes("not active") ||
          errorMessage.toLowerCase().includes("pending") ||
          errorMessage.toLowerCase().includes("suspended") ||
          errorMessage.toLowerCase().includes("closed"))
      ) {
        setAccountStatusError(errorMessage);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

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
      setNewKeyData(response);

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

      setFormData({
        name: "",
        type: "test",
        permissions: ["read", "write"],
      });

      showToast("API key created successfully!", "success");
    } catch (err: any) {
      console.error("Failed to create API key:", err);

      const errorMessage = err.message || "Failed to create API key";
      if (
        errorMessage.toLowerCase().includes("account") &&
        (errorMessage.toLowerCase().includes("not active") ||
          errorMessage.toLowerCase().includes("pending") ||
          errorMessage.toLowerCase().includes("suspended") ||
          errorMessage.toLowerCase().includes("closed"))
      ) {
        setAccountStatusError(errorMessage);
        setShowNewKeyDialog(false);
      } else {
        setError(errorMessage);
      }

      showToast(errorMessage, "error");
    } finally {
      setCreating(false);
    }
  }

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
      setNewKeyData(response);
      setShowNewKeyDialog(true);

      setApiKeys(
        apiKeys.map((key) =>
          key.id === id || key._id === id
            ? { ...key, keyPrefix: response.apiKey.keyPrefix, usageCount: 0 }
            : key
        )
      );

      showToast("API key rotated successfully!", "success");
    } catch (err: any) {
      console.error("Failed to rotate API key:", err);
      showToast(err.message || "Failed to rotate API key", "error");
    }
  }

  function handleCopy(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    showToast("Copied to clipboard!", "success");
  }

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

  function handlePermissionChange(permission: string, checked: boolean) {
    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? [...(prev.permissions || []), permission]
        : (prev.permissions || []).filter((p) => p !== permission),
    }));
  }

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

  function showToast(message: string, type: "success" | "error") {
    console.log(`[${type.toUpperCase()}]:`, message);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">Loading API keys...</p>
        </div>
      </div>
    );
  }

  if (accountStatusError && apiKeys.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-orange-500 mx-auto" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  Account Verification Required
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  {accountStatusError}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Please contact support if you believe this is an error.
                </p>
                <Button
                  onClick={loadApiKeys}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Check Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && apiKeys.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  Failed to Load API Keys
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  {error}
                </p>
                <Button onClick={loadApiKeys} className="w-full sm:w-auto">
                  Try Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredKeys = showLive
    ? apiKeys.filter((key) => key.type === "live")
    : apiKeys.filter((key) => key.type === "test");

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">API Keys</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage your API keys for integrating with SettleMe
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Label htmlFor="live-mode" className="text-sm">
              Live Mode
            </Label>
            <Switch
              id="live-mode"
              checked={showLive}
              onCheckedChange={setShowLive}
            />
          </div>
          <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2 w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Create API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl">
                  Create New API Key
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Generate a new API key to authenticate your requests to
                  SettleMe
                </DialogDescription>
              </DialogHeader>

              {newKeyData ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <strong>Important:</strong> Copy your API key now. You
                      won't be able to see it again!
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label className="text-sm">Your New API Key</Label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="flex-1 px-3 py-2 bg-muted rounded-lg font-mono text-xs sm:text-sm break-all">
                        {newKeyData.key}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(newKeyData.key, "new-key")}
                        className="shrink-0 w-full sm:w-auto"
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
                    <Label className="text-sm">Key Details</Label>
                    <div className="p-3 sm:p-4 bg-muted rounded-lg space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium text-right">
                          {newKeyData.apiKey.name}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Type:</span>
                        <Badge
                          variant={
                            newKeyData.apiKey.type === "live"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {newKeyData.apiKey.type}
                        </Badge>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">
                          Permissions:
                        </span>
                        <span className="font-medium text-right">
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
                <form
                  onSubmit={handleCreateKey}
                  className="space-y-4 sm:space-y-6"
                >
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="keyName" className="text-sm">
                      Key Name *
                    </Label>
                    <Input
                      id="keyName"
                      placeholder="e.g., Production API Key"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">
                      A descriptive name to help you identify this key
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keyType" className="text-sm">
                      Key Type *
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: "test" | "live") =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger id="keyType" className="h-11">
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
                    <Label className="text-sm">Permissions</Label>
                    <div className="space-y-2">
                      {[
                        {
                          id: "read",
                          label: "Read - View transactions and data",
                        },
                        {
                          id: "write",
                          label: "Write - Create payments and charges",
                        },
                        { id: "refund", label: "Refund - Process refunds" },
                        { id: "webhook", label: "Webhook - Manage webhooks" },
                      ].map((perm) => (
                        <label
                          key={perm.id}
                          className="flex items-start gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={(formData.permissions ?? []).includes(
                              perm.id
                            )}
                            onChange={(e) =>
                              handlePermissionChange(perm.id, e.target.checked)
                            }
                            className="rounded mt-0.5"
                          />
                          <span className="text-sm">{perm.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeDialog}
                      disabled={creating}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={creating}
                    >
                      {creating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Generate Key"
                      )}
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
        <AlertDescription className="text-xs sm:text-sm">
          Keep your API keys secure. Never share them publicly or commit them to
          version control.
        </AlertDescription>
      </Alert>

      {/* Empty State */}
      {filteredKeys.length === 0 ? (
        <Card>
          <CardContent className="py-8 sm:py-12">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  {showLive
                    ? "No Live API Keys Found"
                    : "No Test API Keys Found"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 px-4">
                  {showLive
                    ? "Switch to test mode or create a new live API key to get started."
                    : "Switch to live mode or create a new test API key to get started."}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center px-4">
                  <Button
                    onClick={() => setShowNewKeyDialog(true)}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create API Key
                  </Button>
                  <Button
                    variant="outline"
                    onClick={loadApiKeys}
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
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
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <CardTitle className="text-base sm:text-lg truncate">
                          {key.name}
                        </CardTitle>
                        <Badge
                          variant={
                            key.type === "live" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {key.type}
                        </Badge>
                        {!key.isActive && (
                          <Badge variant="destructive" className="text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-xs sm:text-sm">
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
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="flex-1 px-3 py-2 bg-muted rounded-lg font-mono text-xs sm:text-sm break-all">
                        {`${key.keyPrefix}${"•".repeat(40)}`}
                      </div>
                      <div className="flex gap-2 sm:flex-col">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleVisibility(keyId)}
                          title="Full key cannot be displayed"
                          className="flex-1 sm:flex-none"
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
                          className="flex-1 sm:flex-none"
                        >
                          {copied === keyId ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The full key cannot be displayed. Rotate the key to
                      generate a new one.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Usage</p>
                      <p className="text-base sm:text-lg font-semibold">
                        {key.usageCount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">requests</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Permissions
                      </p>
                      <p className="text-base sm:text-lg font-semibold">
                        {key.permissions.length}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {key.permissions.join(", ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p
                        className={`text-base sm:text-lg font-semibold ${
                          key.isActive ? "text-purple-600" : "text-red-600"
                        }`}
                      >
                        {key.isActive ? "Active" : "Inactive"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {key.isActive ? "No issues" : "Disabled"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expires</p>
                      <p className="text-base sm:text-lg font-semibold">
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 w-full sm:w-auto text-sm"
                      onClick={() => handleRotateKey(keyId, key.name)}
                    >
                      <RefreshCcw className="w-4 h-4" />
                      Rotate Key
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 w-full sm:w-auto text-sm text-red-600 hover:text-red-700"
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
          <CardTitle className="text-base sm:text-lg">Need Help?</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Learn how to integrate SettleMe into your application
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            asChild
            className="w-full sm:w-auto text-sm"
          >
            <a href="/docs" target="_blank">
              View Documentation
            </a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="w-full sm:w-auto text-sm"
          >
            <a href="/api-reference" target="_blank">
              API Reference
            </a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="w-full sm:w-auto text-sm"
          >
            <a
              href="https://github.com/settleme/examples"
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
