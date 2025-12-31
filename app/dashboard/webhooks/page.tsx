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
  Play,
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

export default function WebhooksPage() {
  const [showNewWebhookDialog, setShowNewWebhookDialog] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<any>(null);

  // Mock data
  const webhooks = [
    {
      id: "wh_1a2b3c",
      url: "https://mystore.com/webhooks/paydeck",
      events: ["payment.success", "payment.failed", "refund.processed"],
      status: "healthy",
      successRate: 99.8,
      lastDelivery: "3 minutes ago",
      totalDeliveries: 1247,
      failedDeliveries: 3,
      created: "2024-12-15",
    },
    {
      id: "wh_2b3c4d",
      url: "https://api.example.com/webhooks",
      events: ["payment.success"],
      status: "failing",
      successRate: 45.2,
      lastDelivery: "1 hour ago",
      totalDeliveries: 89,
      failedDeliveries: 49,
      created: "2024-12-20",
    },
  ];

  const webhookLogs = [
    {
      id: "log_1",
      event: "payment.success",
      status: "success",
      statusCode: 200,
      responseTime: 145,
      timestamp: "2024-12-31 10:30 AM",
      attempts: 1,
    },
    {
      id: "log_2",
      event: "payment.failed",
      status: "success",
      statusCode: 200,
      responseTime: 198,
      timestamp: "2024-12-31 10:15 AM",
      attempts: 1,
    },
    {
      id: "log_3",
      event: "refund.processed",
      status: "failed",
      statusCode: 500,
      responseTime: 5000,
      timestamp: "2024-12-31 09:45 AM",
      attempts: 3,
      error: "Internal server error",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; icon: any }> = {
      healthy: {
        className:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        icon: CheckCircle2,
      },
      failing: {
        className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        icon: XCircle,
      },
      warning: {
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        icon: Clock,
      },
    };
    const variant = variants[status] || variants.healthy;
    const Icon = variant.icon;
    return (
      <Badge className={variant.className}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Webhooks</h1>
          <p className="text-muted-foreground">
            Receive real-time notifications about payment events
          </p>
        </div>
        <Dialog
          open={showNewWebhookDialog}
          onOpenChange={setShowNewWebhookDialog}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Webhook Endpoint
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Webhook Endpoint</DialogTitle>
              <DialogDescription>
                Configure a webhook to receive real-time event notifications
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowNewWebhookDialog(false);
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Endpoint URL *</Label>
                <Input
                  id="webhookUrl"
                  type="url"
                  placeholder="https://yourdomain.com/webhooks/paydeck"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Must be a valid HTTPS URL that can receive POST requests
                </p>
              </div>

              <div className="space-y-2">
                <Label>Events to Subscribe *</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">
                      payment.success - Payment completed successfully
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">
                      payment.failed - Payment failed or declined
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">
                      payment.cancelled - Payment cancelled
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">
                      refund.created - Refund initiated
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">
                      refund.processed - Refund completed
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">
                      settlement.completed - Settlement processed
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Create Webhook
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewWebhookDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Webhooks List */}
      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <Card key={webhook.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg font-mono text-sm">
                      {webhook.url}
                    </CardTitle>
                    {getStatusBadge(webhook.status)}
                  </div>
                  <CardDescription>
                    Created {webhook.created} • Last delivery{" "}
                    {webhook.lastDelivery}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Events */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Subscribed Events
                </p>
                <div className="flex flex-wrap gap-2">
                  {webhook.events.map((event) => (
                    <Badge key={event} variant="outline">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-lg font-semibold">
                    {webhook.successRate}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {webhook.totalDeliveries - webhook.failedDeliveries}/
                    {webhook.totalDeliveries} successful
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Deliveries
                  </p>
                  <p className="text-lg font-semibold">
                    {webhook.totalDeliveries}
                  </p>
                  <p className="text-xs text-muted-foreground">all time</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-lg font-semibold text-red-600">
                    {webhook.failedDeliveries}
                  </p>
                  <p className="text-xs text-muted-foreground">deliveries</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                  <p className="text-lg font-semibold">145ms</p>
                  <p className="text-xs text-muted-foreground">response time</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Play className="w-4 h-4" />
                  Test Webhook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setSelectedWebhook(webhook)}
                >
                  <Eye className="w-4 h-4" />
                  View Logs
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

      {/* Webhook Logs Dialog */}
      <Dialog
        open={!!selectedWebhook}
        onOpenChange={() => setSelectedWebhook(null)}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Webhook Delivery Logs</DialogTitle>
            <DialogDescription className="font-mono text-xs">
              {selectedWebhook?.url}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {webhookLogs.map((log) => (
              <div key={log.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{log.event}</Badge>
                      <Badge
                        className={
                          log.status === "success"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }
                      >
                        {log.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {log.timestamp}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Status: {log.statusCode}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {log.responseTime}ms
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Attempts:</span>
                    <span className="ml-2 font-medium">{log.attempts}</span>
                  </div>
                  {log.error && (
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Error:</span>
                      <span className="ml-2 text-red-600">{log.error}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Security</CardTitle>
          <CardDescription>
            Learn how to verify webhook signatures and secure your endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              All webhook requests include an{" "}
              <code className="bg-muted px-1 py-0.5 rounded">
                X-PayDeck-Signature
              </code>{" "}
              header that you should verify using HMAC SHA256.
            </p>
            <div className="bg-slate-900 p-4 rounded-lg">
              <code className="text-sm text-slate-300">
                {`const signature = req.headers['x-paydeck-signature'];
const payload = JSON.stringify(req.body);
const expectedSignature = crypto
  .createHmac('sha256', WEBHOOK_SECRET)
  .update(payload)
  .digest('hex');

if (signature !== expectedSignature) {
  return res.status(401).send('Invalid signature');
}`}
              </code>
            </div>
            <Button variant="outline">View Documentation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
