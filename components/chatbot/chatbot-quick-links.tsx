import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  {
    title: "Are my Atlas credits valid if I use the Marketplace?",
    href: "/docs#billing",
  },
  {
    title: "How do I enable API access for my account?",
    href: "/docs#api",
  },
  {
    title: "Reset Your Password",
    href: "/auth/forgot-password",
  },
];

export function ChatbotQuickLinks() {
  return (
    <div className="space-y-2">
      {quickLinks.map((link, index) => (
        <a key={index} href={link.href}>
          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-3 px-3 text-left hover:bg-muted rounded-lg"
          >
            <span className="text-sm text-muted-foreground">{link.title}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </Button>
        </a>
      ))}
    </div>
  );
}
