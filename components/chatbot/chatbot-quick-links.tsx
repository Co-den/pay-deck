import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  {
    title: "How do I get started with PayDeck?",
    href: "/docs#getting-started",
  },
  {
    title: "How do I enable API access for my account?",
    href: "/docs#api",
  },
  {
    title: "What payment methods are supported?",
    href: "/docs#payment-methods",
  },
  {
    title: "How do I reset my password?",
    href: "/auth/forgot-password",
  },
];

export function ChatbotQuickLinks() {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-foreground mb-3">
        Popular Questions
      </h4>
      {quickLinks.map((link, index) => (
        <a key={index} href={link.href}>
          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-3 px-3 text-left hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:border-purple-200 dark:hover:border-purple-800 rounded-lg border border-transparent transition-colors"
          >
            <span className="text-sm text-foreground pr-2">{link.title}</span>
            <ChevronRight className="w-4 h-4 text-purple-600 flex-shrink-0" />
          </Button>
        </a>
      ))}
    </div>
  );
}
