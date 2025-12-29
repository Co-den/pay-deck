"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"

export function TransactionFilters() {
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<string>("")

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by transaction ID, customer, or amount..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {showFilters && (
        <div className="p-4 rounded-lg border border-border bg-card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
              >
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date From</label>
              <input type="date" className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date To</label>
              <input type="date" className="w-full px-3 py-2 rounded-lg border border-border bg-background" />
            </div>

            <div className="flex items-end gap-2">
              <Button className="flex-1">Apply</Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent"
                onClick={() => {
                  setSearch("")
                  setStatus("")
                  setShowFilters(false)
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
