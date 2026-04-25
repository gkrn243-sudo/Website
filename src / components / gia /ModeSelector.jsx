import { Search, Brain, MessageSquare } from "lucide-react";

const modeOptions = [
  { id: "search", label: "🔍 Recherche", icon: Search, desc: "Recherche Internet en temps réel" },
  { id: "deep_think", label: "🧠 Réflexion", icon: Brain, desc: "Analyse profonde et détaillée" },
];

// activeModes is now a Set of active mode ids
export default function ModeSelector({ activeModes, onChange }) {
  const toggle = (id) => {
    const next = new Set(activeModes);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(next);
  };

  return (
    <div className="flex gap-1.5 p-1 rounded-xl bg-muted/50 border border-border">
      {modeOptions.map((m) => {
        const isActive = activeModes.has(m.id);
        return (
          <button
            key={m.id}
            onClick={() => toggle(m.id)}
            title={m.desc}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive
                ? "gia-gradient-bg text-white shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <m.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:block">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
