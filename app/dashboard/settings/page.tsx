"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SettingsNav } from "@/components/settings/settings-nav"
import { APIKeysSettings } from "@/components/settings/api-keys-settings"
import { WebhookSettings } from "@/components/settings/webhook-settings"
import { BusinessSettings } from "@/components/settings/business-settings"
import { PaymentMethodsSettings } from "@/components/settings/payment-methods-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your account and integration settings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <SettingsNav activeSection={activeSection} onSectionChange={setActiveSection} />

              <div className="lg:col-span-3">
                {activeSection === "profile" && <BusinessSettings />}
                {activeSection === "api" && <APIKeysSettings />}
                {activeSection === "webhooks" && <WebhookSettings />}
                {activeSection === "payment" && <PaymentMethodsSettings />}
                {activeSection === "notifications" && <NotificationSettings />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
