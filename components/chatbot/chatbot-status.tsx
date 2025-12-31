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
    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-3 flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-sm text-green-900 dark:text-green-200">
          Status: All Systems Operational
        </p>
        <p className="text-xs text-green-700 dark:text-green-300">
          Updated {currentTime} UTC
        </p>
      </div>
    </div>
  );
}
