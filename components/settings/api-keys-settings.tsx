"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff, RefreshCw, Trash2 } from "lucide-react"

export function APIKeysSettings() {
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)

  const apiKey = "pk_live_1234567890abcdef"
  const secretKey = "sk_live_0987654321fedcba"

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">API Keys</h2>
        <p className="text-muted-foreground mb-6">
          Your API keys are used to authenticate requests to the PayDeck API. Keep your secret key confidential.
        </p>

        {/* Publishable Key */}
        <div className="mb-6 pb-6 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Publishable Key</label>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Active</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Input value={apiKey} readOnly className="font-mono text-sm" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopyKey(apiKey)}
              className="flex-shrink-0 bg-transparent"
            >
              <Copy className={`w-4 h-4 ${copied ? "text-green-600" : ""}`} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Safe to share publicly. Use in your frontend code.</p>
        </div>

        {/* Secret Key */}
        <div className="mb-6 pb-6 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Secret Key</label>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Keep Secret</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Input
              value={showKey ? secretKey : "••••••••••••••••"}
              readOnly
              className="font-mono text-sm"
              type={showKey ? "text" : "password"}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowKey(!showKey)}
              className="flex-shrink-0 bg-transparent"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCopyKey(secretKey)}
              className="flex-shrink-0 bg-transparent"
            >
              <Copy className={`w-4 h-4 ${copied ? "text-green-600" : ""}`} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Never share this key. Use only in backend code.</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <RefreshCw className="w-4 h-4" />
            Rotate Keys
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent text-destructive hover:text-destructive">
            <Trash2 className="w-4 h-4" />
            Delete Keys
          </Button>
        </div>
      </Card>

      <Card className="p-6 border-primary/20 bg-primary/5">
        <h3 className="font-semibold mb-3">API Documentation</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Learn how to use our API to build custom payment experiences.
        </p>
        <Button variant="outline" className="bg-transparent">
          View API Docs
        </Button>
      </Card>
    </div>
  )
}
