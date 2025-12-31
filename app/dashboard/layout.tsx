import type { ReactNode } from "react"
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ChatbotWidget />
    </>
  )
}
