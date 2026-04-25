import { Plus, MessageSquare, Trash2 } from "lucide-react";
import GIALogo from "./GIALogo";

export default function ConversationSidebar({ conversations, activeId, onSelect, onCreate, onDelete }) {
  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <GIALogo size={36} showText={true} />
      </div>

      <div className="p-3">
        <button
          onClick={onCreate}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl gia-gradient-bg text-white text-sm font-medium transition-all hover:opacity-90 shadow-md"
        >
          <Plus className="w-4 h-4" />
          Nouvelle conversation
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
        {conversations.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-6 px-4">
            Aucune conversation.<br />Commencez à discuter !
          </p>
        )}
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
              activeId === conv.id
                ? "bg-indigo-500/20 border border-indigo-500/30"
                : "hover:bg-muted border border-transparent"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <span className="flex-1 text-xs truncate text-foreground">{conv.title || "Nouvelle conversation"}</span>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">Samald · Mémoire persistante</p>
      </div>
    </div>
  );
}
