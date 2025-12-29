import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8 space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back! Here's your payment overview.</p>
            </div>

            <QuickActions />
            <OverviewCards />

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RevenueChart />
              </div>
              <div>
                <RecentTransactions limit={5} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
