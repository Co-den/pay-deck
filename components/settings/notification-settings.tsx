"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { useState } from "react"

export function NotificationSettings() {
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({
    paymentCompleted: true,
    paymentFailed: true,
    paymentRefunded: true,
    weeklyReport: true,
    monthlyReport: true,
    accountAlerts: true,
  })

  const handleToggle = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    })
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Notification Settings</h2>
        <p className="text-muted-foreground">Manage how and when you receive notifications about your account.</p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-6">Email Notifications</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
            <div>
              <Label className="text-base font-medium">Payment Completed</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Get notified when a payment is successfully processed
              </p>
            </div>
            <input
              type="checkbox"
              checked={notifications.paymentCompleted}
              onChange={() => handleToggle("paymentCompleted")}
              className="w-5 h-5 rounded border-border"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
            <div>
              <Label className="text-base font-medium">Payment Failed</Label>
              <p className="text-sm text-muted-foreground mt-1">Get notified when a payment attempt fails</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.paymentFailed}
              onChange={() => handleToggle("paymentFailed")}
              className="w-5 h-5 rounded border-border"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
            <div>
              <Label className="text-base font-medium">Payment Refunded</Label>
              <p className="text-sm text-muted-foreground mt-1">Get notified when a payment is refunded</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.paymentRefunded}
              onChange={() => handleToggle("paymentRefunded")}
              className="w-5 h-5 rounded border-border"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-semibold mb-4">Reports</h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div>
                <Label className="text-base font-medium">Weekly Report</Label>
                <p className="text-sm text-muted-foreground mt-1">Receive a summary of your weekly transactions</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.weeklyReport}
                onChange={() => handleToggle("weeklyReport")}
                className="w-5 h-5 rounded border-border"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div>
                <Label className="text-base font-medium">Monthly Report</Label>
                <p className="text-sm text-muted-foreground mt-1">Receive a detailed monthly payment report</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.monthlyReport}
                onChange={() => handleToggle("monthlyReport")}
                className="w-5 h-5 rounded border-border"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-semibold mb-4">Account</h4>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
            <div>
              <Label className="text-base font-medium">Account Alerts</Label>
              <p className="text-sm text-muted-foreground mt-1">Important alerts about your account security</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.accountAlerts}
              onChange={() => handleToggle("accountAlerts")}
              className="w-5 h-5 rounded border-border"
              disabled
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            {saved ? "Preferences Saved!" : "Save Preferences"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
