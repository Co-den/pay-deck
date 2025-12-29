import { Button } from "@/components/ui/button"
import { Link, Download, Settings, FileText } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button className="gap-2">
        <Link className="w-4 h-4" />
        Create Payment Link
      </Button>
      <Button variant="outline" className="gap-2 bg-transparent">
        <Download className="w-4 h-4" />
        Export Data
      </Button>
      <Button variant="outline" className="gap-2 bg-transparent">
        <FileText className="w-4 h-4" />
        View Reports
      </Button>
      <Button variant="outline" className="gap-2 bg-transparent">
        <Settings className="w-4 h-4" />
        Settings
      </Button>
    </div>
  )
}
