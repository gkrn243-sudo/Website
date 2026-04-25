import { Clock, ChevronRight } from "lucide-react";

export default function ChatHistory({ messages }) {
  if (!messages || messages.length === 0) return null;

  const history = messages.filter((m) => m.role === "user").slice(-10).reverse();

  return (
    <div className="border-t border-border bg-card/30 backdrop-blur-sm">
      <details className="group">
        <summary className="flex items-center gap-2 px-4 py-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors select-none">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-medium">Historique ({history.length} messages)</span>
          <ChevronRight className="w-3.5 h-3.5 ml-auto group-open:rotate-90 transition-transform" />
        </summary>
        <div className="px-4 pb-3 space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
          {history.map((m, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5 border-b border-border/50 last:border-0">
              <span className="text-indigo-400 text-xs mt-0.5 flex-shrink-0">{m.timestamp}</span>
              <p className="text-xs text-muted-foreground truncate flex-1">{m.content}</p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
