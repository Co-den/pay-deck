"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data - in production, fetch from API
  const stats = {
    revenue: {
      current: 12458.32,
      change: 15,
      trend: "up",
    },
    transactions: {
      current: 284,
      change: 8,
      trend: "up",
    },
    successRate: {
      current: 97.2,
      change: 0.3,
      trend: "down",
    },
    avgOrder: {
      current: 43.87,
      change: 12,
      trend: "up",
    },
  }

  const recentTransactions = [
    {
      id: "txn_abc123",
      customer: "John Doe",
      email: "john@example.com",
      amount: 99.99,
      status: "success",
      date: "2 minutes ago",
    },
    {
      id: "txn_abc124",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: 149.99,
      status: "success",
      date: "15 minutes ago",
    },
    {
      id: "txn_abc125",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: 29.99,
      status: "failed",
      date: "1 hour ago",
    },
    {
      id: "txn_abc126",
      customer: "Alice Brown",
      email: "alice@example.com",
      amount: 199.99,
      status: "success",
      date: "2 hours ago",
    },
    {
      id: "txn_abc127",
      customer: "Charlie Wilson",
      email: "charlie@example.com",
      amount: 79.99,
      status: "success",
      date: "3 hours ago",
    },
  ]

  const paymentMethods = [
    { name: "Credit Card", percentage: 65, color: "bg-blue-500" },
    { name: "Apple Pay", percentage: 20, color: "bg-gray-800" },
    { name: "Google Pay", percentage: 10, color: "bg-green-500" },
    { name: "Cryptocurrency", percentage: 5, color: "bg-orange-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
        </div>
        <Link href="/dashboard/payment-link">
          <Button className="gap-2">
            <CreditCard className="w-4 h-4" />
            Create Payment Link
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.current.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-sm">
              {stats.revenue.trend === "up" ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={stats.revenue.trend === "up" ? "text-green-500" : "text-red-500"}>
                {stats.revenue.change}%
              </span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transactions</CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.transactions.current}</div>
            <div className="flex items-center gap-1 text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-green-500">{stats.transactions.change}%</span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate.current}%</div>
            <div className="flex items-center gap-1 text-sm">
              <ArrowDownRight className="w-4 h-4 text-red-500" />
              <span className="text-red-500">{stats.successRate.change}%</span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Order</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgOrder.current}</div>
            <div className="flex items-center gap-1 text-sm">
              <ArrowUpRight className="w-4 h-4 text-green-500" />
              <span className="text-green-500">{stats.avgOrder.change}%</span>
              <span className="text-muted-foreground">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-2">
              {[65, 45, 80, 55, 70, 85, 60, 75, 90, 70, 85, 95, 100, 85].map((height, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${height}%` }}>
                  <div className="h-full bg-primary rounded-t" style={{ height: "70%" }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{method.name}</span>
                  <span className="text-sm text-muted-foreground">{method.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`${method.color} h-2 rounded-full`} style={{ width: `${method.percentage}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Link href="/dashboard/transactions">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.customer}</p>
                    <p className="text-sm text-muted-foreground">{transaction.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${transaction.amount}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        transaction.status === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {transaction.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{transaction.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
