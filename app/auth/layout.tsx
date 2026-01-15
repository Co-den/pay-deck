import type React from "react"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Authentication - PayPort",
  description: "Sign in or create your PayPort account",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
        </div>
    </div>
  )
}
