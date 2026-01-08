"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
      <div className="container-centered flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-green-500 text-primary-foreground flex items-center justify-center font-bold text-lg">
            S
          </div>
          <span className="font-bold text-lg">SettleMe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/guides"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Guides
          </Link>
          <Link
            href="/integrations"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Integrations
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/status"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Status
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="hidden md:block">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup" className="hidden md:block">
            <Button size="sm">Get Started</Button>
          </Link>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-xl animate-in slide-in-from-right duration-300 flex flex-col">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-500 text-primary-foreground flex items-center justify-center font-bold text-lg">
                  S
                </div>
                <span className="font-bold text-lg">SettleMe</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Scrollable Navigation Links */}
            <nav className="flex-1 overflow-y-auto p-6">
              <div className="space-y-1">
                <Link
                  href="/#features"
                  className="block text-base font-medium hover:text-primary hover:bg-accent transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/#pricing"
                  className="block text-base font-medium hover:text-primary hover:bg-accent transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/docs"
                  className="block text-base font-medium hover:text-primary hover:bg-accent transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Docs
                </Link>
                <Link
                  href="/guides"
                  className="block text-base font-medium hover:text-primary hover:bg-accent transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Guides
                </Link>
                <Link
                  href="/integrations"
                  className="block text-base font-medium hover:text-primary hover:bg-accent transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Integrations
                </Link>
                <Link
                  href="/blog"
                  className="block text-base font-medium hover:text-primary hover:bg-accent transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/status"
                  className="block text-base font-medium hover:text-primary hover:bg-accent transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Status
                </Link>
              </div>
            </nav>

            {/* Fixed Bottom Buttons */}
            <div className="border-t border-border p-6 space-y-3 shrink-0 bg-background">
              <Link 
                href="/auth/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-base font-medium"
                >
                  Sign In
                </Button>
              </Link>
              <Link 
                href="/auth/signup" 
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button className="w-full h-12 text-base font-medium">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
