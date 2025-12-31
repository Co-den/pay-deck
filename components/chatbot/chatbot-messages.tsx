"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Send } from "lucide-react";

export function ChatbotMessages() {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "bot"; content: string }>
  >([
    {
      role: "bot",
      content:
        "Hi there! How can I assist you today? Feel free to ask about payments, integrations, or account issues.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Thanks for your message! Our support team will get back to you shortly. In the meantime, check out our docs or contact us directly.",
        },
      ]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-muted-foreground rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Textarea
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="resize-none h-10 min-h-10"
          rows={1}
        />
        <Button
          onClick={handleSend}
          size="icon"
          className="flex-shrink-0"
          disabled={!input.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
