"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  { name: "Jan", revenue: 4000, transactions: 240 },
  { name: "Feb", revenue: 3000, transactions: 221 },
  { name: "Mar", revenue: 2000, transactions: 229 },
  { name: "Apr", revenue: 2780, transactions: 200 },
  { name: "May", revenue: 1890, transactions: 229 },
  { name: "Jun", revenue: 2390, transactions: 200 },
  { name: "Jul", revenue: 3490, transactions: 221 },
]

export function RevenueChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Revenue Trend</h3>
        <p className="text-sm text-muted-foreground">Monthly revenue over the last 7 months</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: `1px solid var(--color-border)`,
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ fill: "var(--color-primary)", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
