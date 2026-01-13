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
          <div className="w-8 h-8 rounded-lg bg-purple-500 text-primary-foreground flex items-center justify-center font-bold text-lg">
            S
          </div>
          <span className="font-bold text-lg">SettleMe</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="text-sm font-medium hover:text-purple-500 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium hover:text-purple-500 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium hover:text-purple-500 transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/guides"
            className="text-sm font-medium hover:text-purple-500 transition-colors"
          >
            Guides
          </Link>
          <Link
            href="/integrations"
            className="text-sm font-medium hover:text-purple-500 transition-colors"
          >
            Integrations
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-purple-500 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/status"
            className="text-sm font-medium hover:text-purple-500 transition-colors"
          >
            Status
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute inset-0 h-full w-full bg-background transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-bold text-lg">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="flex flex-col p-6 space-y-6">
            <Link
              href="/#features"
              className="text-lg font-medium hover:text-primary transition-colors py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-lg font-medium hover:text-primary transition-colors py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-lg font-medium hover:text-primary transition-colors py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/guides"
              className="text-lg font-medium hover:text-primary transition-colors py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Guides
            </Link>
            <Link
              href="/integrations"
              className="text-lg font-medium hover:text-primary transition-colors py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Integrations
            </Link>
            <Link
              href="/blog"
              className="text-lg font-medium hover:text-primary transition-colors py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/status"
              className="text-lg font-medium hover:text-primary transition-colors py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              Status
            </Link>
            <div className="border-t border-border pt-6 mt-6 space-y-4">
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-lg py-6">
                  Sign In
                </Button>
              </Link>
              <Link
                href="/auth/signup"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full text-lg py-6">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
