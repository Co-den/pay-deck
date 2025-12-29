import { Lock, Shield, CheckCircle2 } from "lucide-react"

export function SecurityBadges() {
  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <Lock className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs font-semibold text-muted-foreground">Bank-level SSL</p>
          <p className="text-xs text-muted-foreground">256-bit encryption</p>
        </div>
        <div className="text-center">
          <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs font-semibold text-muted-foreground">PCI DSS</p>
          <p className="text-xs text-muted-foreground">Level 1 certified</p>
        </div>
        <div className="text-center">
          <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs font-semibold text-muted-foreground">Verified</p>
          <p className="text-xs text-muted-foreground">Safe & secure</p>
        </div>
      </div>
    </div>
  )
}
