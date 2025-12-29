import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface RecentTransactionsProps {
  limit?: number
}

export function RecentTransactions({ limit = 5 }: RecentTransactionsProps) {
  const transactions = [
    {
      id: "TXN001",
      customer: "Acme Corp",
      amount: "$2,500",
      status: "completed",
      date: "2 hours ago",
    },
    {
      id: "TXN002",
      customer: "Design Studio",
      amount: "$1,250",
      status: "completed",
      date: "4 hours ago",
    },
    {
      id: "TXN003",
      customer: "Tech Startup",
      amount: "$5,000",
      status: "pending",
      date: "6 hours ago",
    },
    {
      id: "TXN004",
      customer: "E-commerce Shop",
      amount: "$750",
      status: "completed",
      date: "8 hours ago",
    },
    {
      id: "TXN005",
      customer: "Service Co",
      amount: "$3,200",
      status: "completed",
      date: "1 day ago",
    },
  ]

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
      </div>
      <div className="space-y-4">
        {transactions.slice(0, limit).map((txn) => (
          <Link key={txn.id} href={`/dashboard/transactions/${txn.id}`}>
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
              <div className="min-w-0">
                <p className="font-medium truncate">{txn.customer}</p>
                <p className="text-xs text-muted-foreground">{txn.id}</p>
              </div>
              <div className="flex items-center gap-3 ml-3">
                <p className="font-semibold whitespace-nowrap">{txn.amount}</p>
                <Badge variant={txn.status === "completed" ? "default" : "secondary"}>{txn.status}</Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/dashboard/transactions">
        <div className="mt-4 pt-4 border-t border-border text-center text-sm text-primary hover:text-primary/80 cursor-pointer font-medium">
          View All Transactions
        </div>
      </Link>
    </Card>
  )
}
