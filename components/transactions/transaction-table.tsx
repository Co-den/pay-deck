"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TransactionDetailsModal } from "@/components/transactions/transaction-details-modal"
import { MoreHorizontal } from "lucide-react"

interface TransactionTableProps {
  selectedTransactions: string[]
  onSelectionChange: (selected: string[]) => void
}

interface Transaction {
  id: string
  customer: string
  amount: string
  status: "completed" | "pending" | "failed" | "refunded"
  method: string
  date: string
  time: string
}

export function TransactionTable({ selectedTransactions, onSelectionChange }: TransactionTableProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const transactions: Transaction[] = [
    {
      id: "TXN001",
      customer: "Acme Corporation",
      amount: "$2,500.00",
      status: "completed",
      method: "Credit Card",
      date: "Dec 15, 2024",
      time: "2:30 PM",
    },
    {
      id: "TXN002",
      customer: "Design Studio Pro",
      amount: "$1,250.50",
      status: "completed",
      method: "Debit Card",
      date: "Dec 15, 2024",
      time: "1:15 PM",
    },
    {
      id: "TXN003",
      customer: "Tech Startup Inc",
      amount: "$5,000.00",
      status: "pending",
      method: "Bank Transfer",
      date: "Dec 14, 2024",
      time: "4:45 PM",
    },
    {
      id: "TXN004",
      customer: "E-commerce Shop",
      amount: "$750.25",
      status: "completed",
      method: "Apple Pay",
      date: "Dec 14, 2024",
      time: "11:20 AM",
    },
    {
      id: "TXN005",
      customer: "Service Company",
      amount: "$3,200.00",
      status: "failed",
      method: "Credit Card",
      date: "Dec 13, 2024",
      time: "3:00 PM",
    },
    {
      id: "TXN006",
      customer: "Web Agency",
      amount: "$4,500.00",
      status: "completed",
      method: "Credit Card",
      date: "Dec 13, 2024",
      time: "10:30 AM",
    },
    {
      id: "TXN007",
      customer: "Digital Marketing",
      amount: "$1,850.00",
      status: "refunded",
      method: "Debit Card",
      date: "Dec 12, 2024",
      time: "5:15 PM",
    },
    {
      id: "TXN008",
      customer: "Retail Store",
      amount: "$6,250.75",
      status: "completed",
      method: "Google Pay",
      date: "Dec 12, 2024",
      time: "2:45 PM",
    },
  ]

  const toggleSelectAll = () => {
    if (selectedTransactions.length === transactions.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(transactions.map((t) => t.id))
    }
  }

  const toggleSelect = (id: string) => {
    onSelectionChange(
      selectedTransactions.includes(id) ? selectedTransactions.filter((t) => t !== id) : [...selectedTransactions, id],
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      case "refunded":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-foreground">
                  <Checkbox checked={selectedTransactions.length === transactions.length} onChange={toggleSelectAll} />
                </th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Transaction ID</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Customer</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Amount</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Status</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Method</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Date</th>
                <th className="px-6 py-3 text-left font-medium text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <Checkbox checked={selectedTransactions.includes(txn.id)} onChange={() => toggleSelect(txn.id)} />
                  </td>
                  <td className="px-6 py-4 font-medium text-primary cursor-pointer hover:underline">{txn.id}</td>
                  <td className="px-6 py-4 text-foreground">{txn.customer}</td>
                  <td className="px-6 py-4 font-semibold">{txn.amount}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusColor(txn.status)}>{txn.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{txn.method}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div>
                      <p>{txn.date}</p>
                      <p className="text-xs text-muted-foreground">{txn.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedTransaction(txn)
                        setDetailsOpen(true)
                      }}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionDetailsModal transaction={selectedTransaction} open={detailsOpen} onOpenChange={setDetailsOpen} />
    </>
  )
}
