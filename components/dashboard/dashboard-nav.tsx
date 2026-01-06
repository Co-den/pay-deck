"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Settings, LogOut, Menu, X, CreditCard, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const [open, setOpen] = useState(true)

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-40 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <nav
        className={`${
          open ? "translate-x-0" : "-translate-x-full"
        } fixed md:static md:translate-x-0 left-0 top-0 z-30 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-out`}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500 text-primary-foreground flex items-center justify-center font-bold">
              S
            </div>
            <span className="font-bold text-lg">SettleMe</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-primary/10">
              <BarChart3 className="w-5 h-5" />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/transactions">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-primary/10">
              <CreditCard className="w-5 h-5" />
              Transactions
            </Button>
          </Link>
          <Link href="/dashboard/reports">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-primary/10">
              <FileText className="w-5 h-5" />
              Reports
            </Button>
          </Link>
        </div>

        <div className="border-t border-border p-4 space-y-2">
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-primary/10">
              <Settings className="w-5 h-5" />
              Settings
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:bg-destructive/10">
            <LogOut className="w-5 h-5" />
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setOpen(false)} />}
    </>
  )
}
