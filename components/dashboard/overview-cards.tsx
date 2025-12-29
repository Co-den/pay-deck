import { TrendingUp, Activity, Clock, CheckCircle2 } from "lucide-react"

export function OverviewCards() {
  const cards = [
    {
      title: "Total Transactions",
      value: "$2,543,200",
      change: "+12.5%",
      icon: Activity,
      trend: "up",
    },
    {
      title: "This Month Revenue",
      value: "$127,500",
      change: "+8.2%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Pending Payments",
      value: "$18,300",
      change: "-2.1%",
      icon: Clock,
      trend: "down",
    },
    {
      title: "Success Rate",
      value: "99.2%",
      change: "+0.3%",
      icon: CheckCircle2,
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div key={idx} className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{card.title}</p>
                <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
              </div>
              <div className="p-2.5 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div
              className={`flex items-center gap-1 text-xs font-medium ${card.trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              <TrendingUp className="w-3 h-3" />
              {card.change} from last month
            </div>
          </div>
        )
      })}
    </div>
  )
}
