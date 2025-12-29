"use client"

import { Button } from "@/components/ui/button"
import { Building2, Key, LinkIcon, CreditCard, Bell } from "lucide-react"

interface SettingsNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function SettingsNav({ activeSection, onSectionChange }: SettingsNavProps) {
  const sections = [
    { id: "profile", label: "Business Profile", icon: Building2 },
    { id: "api", label: "API Keys", icon: Key },
    { id: "webhooks", label: "Webhooks", icon: LinkIcon },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <div className="space-y-1">
      {sections.map((section) => {
        const Icon = section.icon
        return (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
            className={`w-full justify-start gap-3 ${activeSection === section.id ? "" : "text-muted-foreground"}`}
            onClick={() => onSectionChange(section.id)}
          >
            <Icon className="w-4 h-4" />
            {section.label}
          </Button>
        )
      })}
    </div>
  )
}
