"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TransactionTable } from "@/components/transactions/transaction-table"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function Transactions() {
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                <p className="text-muted-foreground mt-1">View and manage all your payment transactions</p>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>

            <TransactionFilters />
            <TransactionTable selectedTransactions={selectedTransactions} onSelectionChange={setSelectedTransactions} />
          </div>
        </main>
      </div>
    </div>
  )
}
