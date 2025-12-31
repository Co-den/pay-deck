"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, Check, Link2, QrCode, Eye, Trash2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function PaymentLinksPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [showNewLinkDialog, setShowNewLinkDialog] = useState(false)

  // Mock data
  const paymentLinks = [
    {
      id: "link_1a2b3c",
      title: "Premium Plan - Annual",
      amount: 299.99,
      currency: "USD",
      url: "https://pay.paydeck.io/pl_1a2b3c",
      status: "active",
      uses: 12,
      revenue: 3599.88,
      createdAt: "2024-12-25",
      expiresAt: null,
    },
    {
      id: "link_2b3c4d",
      title: "Consultation Fee",
      amount: 150.0,
      currency: "USD",
      url: "https://pay.paydeck.io/pl_2b3c4d",
      status: "active",
      uses: 5,
      revenue: 750.0,
      createdAt: "2024-12-28",
      expiresAt: "2025-01-15",
    },
    {
      id: "link_3c4d5e",
      title: "Product Purchase",
      amount: 49.99,
      currency: "USD",
      url: "https://pay.paydeck.io/pl_3c4d5e",
      status: "expired",
      uses: 8,
      revenue: 399.92,
      createdAt: "2024-12-20",
      expiresAt: "2024-12-30",
    },
  ]

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      expired: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      disabled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    }
    return variants[status] || variants.active
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment Links</h1>
          <p className="text-muted-foreground">Create and manage payment links for your customers</p>
        </div>
        <Dialog open={showNewLinkDialog} onOpenChange={setShowNewLinkDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Payment Link
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Payment Link</DialogTitle>
              <DialogDescription>Generate a shareable payment link for your customers</DialogDescription>
            </DialogHeader>

            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input id="amount" type="number" placeholder="99.99" step="0.01" min="0" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency *</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" placeholder="e.g., Premium Plan - Annual" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Optional description for customers" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expires">Expiration</Label>
                <Select defaultValue="never">
                  <SelectTrigger id="expires">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never expires</SelectItem>
                    <SelectItem value="24h">24 hours</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                    <SelectItem value="custom">Custom date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Generate Link
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowNewLinkDialog(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentLinks.length}</div>
            <p className="text-xs text-muted-foreground">
              {paymentLinks.filter((l) => l.status === "active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Uses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentLinks.reduce((sum, l) => sum + l.uses, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all links</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${paymentLinks.reduce((sum, l) => sum + l.revenue, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">From payment links</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Links List */}
      <div className="space-y-4">
        {paymentLinks.map((link) => (
          <Card key={link.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <Badge className={getStatusBadge(link.status)}>{link.status}</Badge>
                  </div>
                  <CardDescription>
                    ${link.amount.toFixed(2)} {link.currency} • Created {link.createdAt}
                    {link.expiresAt && ` • Expires ${link.expiresAt}`}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Link URL */}
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 bg-muted rounded-lg font-mono text-sm truncate">{link.url}</div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(link.url, link.id)}
                  className="shrink-0"
                >
                  {copied === link.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <p className="text-sm text-muted-foreground">Uses</p>
                  <p className="text-lg font-semibold">{link.uses}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-lg font-semibold">${link.revenue.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Order</p>
                  <p className="text-lg font-semibold">${(link.revenue / link.uses).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-lg font-semibold">
                    {link.uses > 0 ? Math.floor((link.uses / (link.uses + 2)) * 100) : 0}%
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <QrCode className="w-4 h-4" />
                  QR Code
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Link2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
