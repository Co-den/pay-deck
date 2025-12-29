"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Copy, CheckCircle2, AlertCircle } from "lucide-react"

export function WebhookSettings() {
  const [webhooks] = useState([
    {
      id: 1,
      url: "https://yourapp.com/webhooks/payment",
      events: ["payment.completed", "payment.failed"],
      status: "active",
      lastTriggered: "2 hours ago",
    },
    {
      id: 2,
      url: "https://yourapp.com/webhooks/refund",
      events: ["payment.refunded"],
      status: "active",
      lastTriggered: "1 day ago",
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Webhooks</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure webhooks to receive real-time notifications about payment events.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Webhook
        </Button>
      </div>

      {webhooks.map((webhook) => (
        <Card key={webhook.id} className="p-6">
          <div className="mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold break-all">{webhook.url}</h3>
                <div className="flex items-center gap-2 mt-2">
                  {webhook.status === "active" ? (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Active
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-yellow-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Inactive
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="bg-transparent">
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-transparent text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Events</p>
                <div className="flex flex-wrap gap-2">
                  {webhook.events.map((event) => (
                    <Badge key={event} variant="secondary" className="text-xs">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Last Triggered</p>
                <p className="text-sm">{webhook.lastTriggered}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              View Deliveries
            </Button>
          </div>
        </Card>
      ))}

      <Card className="p-6 border-primary/20 bg-primary/5">
        <h3 className="font-semibold mb-3">Webhook Events</h3>
        <p className="text-sm text-muted-foreground mb-4">
          PayDeck sends webhooks for payment events like completed, failed, or refunded payments.
        </p>
        <Button variant="outline" className="bg-transparent">
          View Event Types
        </Button>
      </Card>
    </div>
  )
}
