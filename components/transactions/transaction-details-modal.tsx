"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Download, RotateCcw, Copy, Check } from "lucide-react"

interface Transaction {
  id: string
  customer: string
  amount: string
  status: "completed" | "pending" | "failed" | "refunded"
  method: string
  date: string
  time: string
}

interface TransactionDetailsModalProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionDetailsModal({ transaction, open, onOpenChange }: TransactionDetailsModalProps) {
  const [refunding, setRefunding] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!open || !transaction) return null

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50 transition-opacity" onClick={() => onOpenChange(false)} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="bg-card rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Transaction Details</h2>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Header Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{transaction.amount}</h3>
                  <p className="text-muted-foreground mt-1">{transaction.customer}</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-sm font-semibold">
                  {transaction.status}
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono bg-muted px-3 py-2 rounded flex-1">{transaction.id}</code>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(transaction.id)} className="gap-1">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                <p className="font-medium">{transaction.method}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                <p className="font-medium">
                  {transaction.date} at {transaction.time}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="font-medium capitalize">{transaction.status}</p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-3">Customer Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{transaction.customer}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">customer@example.com</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Country</p>
                  <p className="font-medium">United States</p>
                </div>
                <div>
                  <p className="text-muted-foreground">City</p>
                  <p className="font-medium">New York</p>
                </div>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="border-t border-border pt-6">
              <h4 className="font-semibold mb-3">Fee Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span>{transaction.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Fee (2.9%)</span>
                  <span>$72.50</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-semibold">Net Amount</span>
                  <span className="font-semibold">{transaction.amount}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Button variant="outline" className="gap-2 bg-transparent flex-1">
                <Download className="w-4 h-4" />
                Download Receipt
              </Button>
              {transaction.status === "completed" && (
                <Button
                  variant="outline"
                  className="gap-2 bg-transparent flex-1 text-destructive hover:text-destructive"
                  onClick={() => setRefunding(true)}
                  disabled={refunding}
                >
                  <RotateCcw className="w-4 h-4" />
                  {refunding ? "Processing..." : "Refund"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
