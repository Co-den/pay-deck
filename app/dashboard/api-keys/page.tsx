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
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function APIKeysPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [newKey, setNewKey] = useState<string | null>(null);

  // Mock data
  const apiKeys = [
    {
      id: "key_1a2b3c",
      name: "Production API Key",
      keyPrefix: "pk_live_abc123",
      fullKey: "pk_live_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz",
      type: "live",
      created: "2024-12-15",
      lastUsed: "2 hours ago",
      usage: 45892,
      permissions: ["read", "write", "refund"],
    },
    {
      id: "key_2b3c4d",
      name: "Development Key",
      keyPrefix: "pk_test_xyz789",
      fullKey: "pk_test_xyz789abc123def456ghi789jkl012mno345pqr678stu901vwx234",
      type: "test",
      created: "2024-12-10",
      lastUsed: "5 minutes ago",
      usage: 1247,
      permissions: ["read", "write"],
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleCreateKey = () => {
    // Simulate API key creation
    const mockKey =
      "pk_test_new123abc456def789ghi012jkl345mno678pqr901stu234vwx";
    setNewKey(mockKey);
    // Don't close dialog immediately - show the key first
  };

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

            {newKey ? (
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Make sure to copy your API key now. You won't be able to see
                    it again!
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label>Your New API Key</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-3 py-2 bg-muted rounded-lg font-mono text-sm break-all">
                      {newKey}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCopy(newKey, "new-key")}
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

                <Button
                  className="w-full"
                  onClick={() => {
                    setShowNewKeyDialog(false);
                    setNewKey(null);
                  }}
                >
                  Done
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateKey();
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="keyName">Key Name *</Label>
                  <Input
                    id="keyName"
                    placeholder="e.g., Production API Key"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    A descriptive name to help you identify this key
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keyType">Key Type *</Label>
                  <Select defaultValue="test">
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
                        defaultChecked
                        className="rounded"
                      />
                      <span className="text-sm">
                        Read - View transactions and data
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                      <span className="text-sm">
                        Write - Create payments and charges
                      </span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Refund - Process refunds</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Webhook - Manage webhooks</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Generate Key
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewKeyDialog(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Warning */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Keep your API keys secure. Never share them publicly or commit them to
          version control.
        </AlertDescription>
      </Alert>

      {/* API Keys List */}
      <div className="space-y-4">
        {apiKeys.map((key) => (
          <Card key={key.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{key.name}</CardTitle>
                    <Badge
                      variant={key.type === "live" ? "default" : "secondary"}
                    >
                      {key.type}
                    </Badge>
                  </div>
                  <CardDescription>
                    Created {key.created} • Last used {key.lastUsed}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* API Key */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">API Key</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2 bg-muted rounded-lg font-mono text-sm">
                    {visibleKeys.has(key.id)
                      ? key.fullKey
                      : `${key.keyPrefix}${"•".repeat(40)}`}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleVisibility(key.id)}
                  >
                    {visibleKeys.has(key.id) ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(key.fullKey, key.id)}
                  >
                    {copied === key.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">Usage</p>
                  <p className="text-lg font-semibold">
                    {key.usage.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">requests</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Permissions</p>
                  <p className="text-lg font-semibold">
                    {key.permissions.length}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {key.permissions.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold text-green-600">Active</p>
                  <p className="text-xs text-muted-foreground">No issues</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rate Limit</p>
                  <p className="text-lg font-semibold">1000/min</p>
                  <p className="text-xs text-muted-foreground">
                    requests per minute
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCcw className="w-4 h-4" />
                  Rotate Key
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Documentation Link */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Learn how to integrate PayDeck into your application
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button variant="outline">View Documentation</Button>
          <Button variant="outline">API Reference</Button>
          <Button variant="outline">Example Code</Button>
        </CardContent>
      </Card>
    </div>
  );
}
