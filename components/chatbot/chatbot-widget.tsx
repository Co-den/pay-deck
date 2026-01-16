"use client";

import { useState } from "react";
import {
  MessageCircle,
  X,
  Search,
  Home,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChatbotMessages } from "./chatbot-messages";
import { ChatbotQuickLinks } from "./chatbot-quick-links";
import { ChatbotStatus } from "./chatbot-status";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "messages" | "help">(
    "home"
  );
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-purple-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110 duration-200"
        aria-label="Open chat support"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-20 md:bottom-24 md:right-6 md:left-auto md:w-[400px] h-[500px] md:h-[600px] bg-background rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-border">
          {/* Header */}
          <div className="p-4 border-b border-border bg-purple-600 text-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">
                P
              </div>
              <h3 className="font-semibold">PayDeck Support</h3>
            </div>
            <p className="text-sm text-purple-100">Hello! How can we help?</p>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto bg-background">
            {activeTab === "home" && (
              <div className="p-4 space-y-4">
                <ChatbotStatus />

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for help"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-muted border-0"
                  />
                </div>

                {/* Quick Links */}
                <ChatbotQuickLinks />
              </div>
            )}

            {activeTab === "messages" && <ChatbotMessages />}

            {activeTab === "help" && (
              <div className="p-4 space-y-3">
                <div className="text-sm text-muted-foreground space-y-3">
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Getting Started?
                    </p>
                    <p>
                      Check our documentation to learn how to integrate PayDeck
                      with your website.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Need API Help?
                    </p>
                    <p>
                      View our comprehensive API reference with code examples in
                      your preferred language.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Security Questions?
                    </p>
                    <p>
                      Learn about our PCI compliance, encryption standards, and
                      security practices.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="border-t border-border bg-muted/30 grid grid-cols-3">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium transition-colors ${
                activeTab === "home"
                  ? "text-purple-600 border-t-2 border-purple-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium transition-colors ${
                activeTab === "messages"
                  ? "text-purple-600 border-t-2 border-purple-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Messages</span>
            </button>
            <button
              onClick={() => setActiveTab("help")}
              className={`flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium transition-colors ${
                activeTab === "help"
                  ? "text-purple-600 border-t-2 border-purple-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
