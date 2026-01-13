"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Download,
  Eye,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  // Mock data - in production, fetch from API
  const transactions = [
    {
      id: "txn_1a2b3c4d",
      customer: { name: "John Doe", email: "john@example.com" },
      amount: 99.99,
      currency: "USD",
      status: "success",
      paymentMethod: "Visa •••• 4242",
      date: "2024-12-31 10:30 AM",
      fees: 3.2,
      net: 96.79,
    },
    {
      id: "txn_2b3c4d5e",
      customer: { name: "Jane Smith", email: "jane@example.com" },
      amount: 149.99,
      currency: "USD",
      status: "success",
      paymentMethod: "Mastercard •••• 5555",
      date: "2024-12-31 10:15 AM",
      fees: 4.65,
      net: 145.34,
    },
    {
      id: "txn_3c4d5e6f",
      customer: { name: "Bob Johnson", email: "bob@example.com" },
      amount: 29.99,
      currency: "USD",
      status: "failed",
      paymentMethod: "Visa •••• 0002",
      date: "2024-12-31 09:45 AM",
      fees: 0,
      net: 0,
      failureReason: "Card declined - Insufficient funds",
    },
    {
      id: "txn_4d5e6f7g",
      customer: { name: "Alice Brown", email: "alice@example.com" },
      amount: 199.99,
      currency: "USD",
      status: "refunded",
      paymentMethod: "Apple Pay",
      date: "2024-12-31 09:30 AM",
      fees: 6.3,
      net: 0,
      refundReason: "Customer requested",
    },
    {
      id: "txn_5e6f7g8h",
      customer: { name: "Charlie Wilson", email: "charlie@example.com" },
      amount: 79.99,
      currency: "USD",
      status: "pending",
      paymentMethod: "Bank Transfer",
      date: "2024-12-31 09:00 AM",
      fees: 0,
      net: 0,
    },
  ];

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      success:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      refunded: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    };
    return variants[status] || variants.pending;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your payment transactions
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer, email, or transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredTransactions.length} Transaction
            {filteredTransactions.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors md:flex-row md:items-center md:justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-medium">
                      {transaction.id}
                    </span>
                    <Badge className={getStatusBadge(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                  <p className="font-medium">{transaction.customer.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.customer.email}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {transaction.paymentMethod}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${transaction.amount.toFixed(2)} {transaction.currency}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date}
                    </p>
                    {transaction.status === "success" && (
                      <p className="text-xs text-purple-600 dark:text-green-400">
                        Net: ${transaction.net.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {transaction.status === "success" && (
                      <Button variant="outline" size="icon">
                        <RefreshCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Detail Dialog */}
      <Dialog
        open={!!selectedTransaction}
        onOpenChange={() => setSelectedTransaction(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>{selectedTransaction?.id}</DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge className={getStatusBadge(selectedTransaction.status)}>
                    {selectedTransaction.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">{selectedTransaction.date}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Customer</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">
                      {selectedTransaction.customer.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">
                      {selectedTransaction.customer.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Payment Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">
                      ${selectedTransaction.amount.toFixed(2)}{" "}
                      {selectedTransaction.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fees</span>
                    <span className="font-medium">
                      ${selectedTransaction.fees.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Net Amount</span>
                    <span className="font-bold text-purple-600">
                      ${selectedTransaction.net.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Payment Method
                    </span>
                    <span className="font-medium">
                      {selectedTransaction.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>

              {selectedTransaction.failureReason && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2 text-red-600">
                    Failure Reason
                  </h4>
                  <p className="text-sm">{selectedTransaction.failureReason}</p>
                </div>
              )}

              {selectedTransaction.status === "success" && (
                <div className="flex gap-3">
                  <Button className="flex-1 gap-2">
                    <RefreshCcw className="w-4 h-4" />
                    Process Refund
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Send Receipt
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
