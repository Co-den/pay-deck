"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Key,
  Webhook,
  Settings,
  Bell,
  Building2,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getMerchantData, clearAuthToken } from "@/lib/api/client"
import { logout } from "@/lib/api/auth"

interface Merchant {
  id: string
  businessName: string
  email: string
  tier: string
  accountStatus: string
  businessType: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
  { name: "Payment Links", href: "/dashboard/payment-links", icon: FileText },
  { name: "Reports", href: "/dashboard/reports-page", icon: BarChart3 },
  { name: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { name: "Webhooks", href: "/dashboard/webhooks", icon: Webhook },
  { name: "Payment Methods", href: "/dashboard/payment-methods", icon: Building2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [merchant, setMerchant] = useState<Merchant | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)

  // Load merchant data and check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const merchantData = getMerchantData()
      const token = localStorage.getItem("paydeck_token")
      
      if (!token || !merchantData) {
        // Not authenticated, redirect to login
        router.push('/auth/login')
        return
      }
      
      setMerchant(merchantData)
      setAuthChecking(false)
    }

    checkAuth()
  }, [router])

  // Show loading while checking authentication
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      await logout()
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails, clear local data and redirect
      clearAuthToken()
      if (typeof window !== "undefined") {
        localStorage.removeItem("paydeck_merchant")
      }
      router.push('/auth/login')
    } finally {
      setLoggingOut(false)
    }
  }

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center font-bold">
                P
              </div>
              <span className="font-bold text-lg">PayDeck</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-green-500 text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarFallback>
                  {merchant?.businessName ? getUserInitials(merchant.businessName) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {merchant?.businessName || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {merchant?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-2"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              <LogOut className="w-4 h-4" />
              {loggingOut ? 'Signing Out...' : 'Sign Out'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex-1" />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          {children}
          <ChatbotWidget />
        </main>
      </div>
    </div>
  )
}
