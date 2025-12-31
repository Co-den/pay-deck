import { Button } from "@/components/ui/button";
import { Download, Settings, FileText } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/dashboard/create-payment-link" >
      <Button className="gap-2">
        Create Payment Link
      </Button>
      </Link>
      <Link href="/dashboard/create-invoice" >
      <Button variant="outline" className="gap-2 bg-transparent">
        <Download className="w-4 h-4" />
        Export Data
      </Button>
      </Link>
      <Link href="/dashboard/reports">
      <Button variant="outline" className="gap-2 bg-transparent">
        <FileText className="w-4 h-4" />
        View Reports
      </Button>
      </Link>
      <Link href="/dashboard/settings">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </Link>
    </div>
  );
}
