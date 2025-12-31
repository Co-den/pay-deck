"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Users,
  Calendar,
} from "lucide-react";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("30d");

  const metrics = {
    revenue: {
      current: 45892.34,
      previous: 38721.45,
      change: 18.5,
      trend: "up",
    },
    transactions: {
      current: 1247,
      previous: 1089,
      change: 14.5,
      trend: "up",
    },
    customers: {
      current: 423,
      previous: 398,
      change: 6.3,
      trend: "up",
    },
    avgTransaction: {
      current: 36.79,
      previous: 35.56,
      change: 3.5,
      trend: "up",
    },
  };

  const topProducts = [
    { name: "Premium Plan - Annual", sales: 45, revenue: 13455.0 },
    { name: "Pro Plan - Monthly", sales: 234, revenue: 11700.0 },
    { name: "Starter Plan", sales: 456, revenue: 9120.0 },
    { name: "Enterprise Plan", sales: 12, revenue: 7188.0 },
    { name: "Consultation Fee", sales: 89, revenue: 4450.0 },
  ];

  const paymentMethods = [
    {
      method: "Credit Card",
      transactions: 812,
      percentage: 65,
      revenue: 29829.22,
    },
    {
      method: "Apple Pay",
      transactions: 249,
      percentage: 20,
      revenue: 9178.47,
    },
    {
      method: "Google Pay",
      transactions: 125,
      percentage: 10,
      revenue: 4589.23,
    },
    {
      method: "Cryptocurrency",
      transactions: 61,
      percentage: 5,
      revenue: 2295.42,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your payment performance
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.revenue.current.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm mt-1">
              {metrics.revenue.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={
                  metrics.revenue.trend === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {metrics.revenue.change}%
              </span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transactions
            </CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.transactions.current.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">
                {metrics.transactions.change}%
              </span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customers
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.customers.current.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">
                {metrics.customers.change}%
              </span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Transaction
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.avgTransaction.current.toFixed(2)}
            </div>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">
                {metrics.avgTransaction.change}%
              </span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue Trend */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>
              Daily revenue over the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-1">
              {Array.from({ length: 30 }, (_, i) => {
                const height = 40 + Math.random() * 60;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-primary/20 rounded-t hover:bg-primary/30 transition-colors cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`Day ${i + 1}: $${(
                      1200 +
                      Math.random() * 800
                    ).toFixed(2)}`}
                  >
                    <div
                      className="h-full bg-primary rounded-t"
                      style={{ height: "70%" }}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>Payment success vs failure rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray={`${97.2 * 2.51} ${(100 - 97.2) * 2.51}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">97.2%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">Successful</span>
                  </div>
                  <span className="font-medium">1,212</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">Failed</span>
                  </div>
                  <span className="font-medium">35</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best performing products by revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${product.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {((product.revenue / 45892.34) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Transaction breakdown by payment method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium">{method.method}</p>
                      <p className="text-sm text-muted-foreground">
                        {method.transactions} transactions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${method.revenue.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {method.percentage}%
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>Revenue by country/region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              { country: "United States", revenue: 25123.45, percentage: 54.7 },
              { country: "United Kingdom", revenue: 8934.23, percentage: 19.5 },
              { country: "Canada", revenue: 5678.12, percentage: 12.4 },
              { country: "Australia", revenue: 3456.78, percentage: 7.5 },
              { country: "Germany", revenue: 1890.34, percentage: 4.1 },
              { country: "France", revenue: 809.42, percentage: 1.8 },
            ].map((location, i) => (
              <div key={i} className="p-4 border border-border rounded-lg">
                <p className="font-medium mb-1">{location.country}</p>
                <p className="text-2xl font-bold mb-1">
                  ${location.revenue.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {location.percentage}% of total
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
