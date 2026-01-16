import { CheckCircle2 } from "lucide-react";

export function ChatbotStatus() {
  const currentTime = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  return (
    <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 rounded-lg p-3 flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-sm text-purple-900 dark:text-purple-200">
          Status: All Systems Operational
        </p>
        <p className="text-xs text-purple-700 dark:text-purple-300">
          Updated {currentTime} UTC
        </p>
      </div>
    </div>
  );
}
