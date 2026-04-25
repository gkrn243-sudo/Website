import { useState, useRef } from "react";
import { Send, Mic, MicOff, MoreHorizontal, Paperclip, X } from "lucide-react";

export default function ChatInput({ onSend, onFileUpload, isLoading, isListening, onVoiceToggle }) {
  const [text, setText] = useState("");
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const fileRef = useRef();

  const handleSend = () => {
    if (!text.trim() && !pendingFile) return;
    onSend(text, pendingFile);
    setText("");
    setPendingFile(null);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingFile(file);
    setShowUploadMenu(false);
    onFileUpload && onFileUpload(file);
  };

  return (
    <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
      {pendingFile && (
        <div className="mb-2 flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-400">
          <Paperclip className="w-3.5 h-3.5" />
          <span className="flex-1 truncate">{pendingFile.name}</span>
          <button onClick={() => setPendingFile(null)} className="hover:text-white transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* Upload button */}
        <div className="relative">
          <button
            onClick={() => setShowUploadMenu(!showUploadMenu)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
              showUploadMenu
                ? "gia-gradient-bg text-white border-transparent shadow-md"
                : "bg-muted border-border text-muted-foreground hover:text-foreground hover:border-indigo-500/40"
            }`}
            title="Envoyer un fichier"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showUploadMenu && (
            <div className="absolute bottom-12 left-0 bg-card border border-border rounded-2xl shadow-2xl p-2 min-w-[160px] z-10">
              {[
                { label: "Image", accept: "image/*" },
                { label: "PDF", accept: ".pdf" },
                { label: "Document", accept: ".doc,.docx,.txt,.md" },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => { fileRef.current.accept = opt.accept; fileRef.current.click(); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-muted transition-colors text-foreground"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
          <input ref={fileRef} type="file" className="hidden" onChange={handleFileChange} />
        </div>

        {/* Text area */}
        <div className="flex-1 relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKey}
            placeholder={isListening ? "🎤 J'écoute..." : "Écrire à Samald..."}
            rows={1}
            className="w-full resize-none bg-muted border border-border rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-indigo-500/50 focus:bg-muted/80 transition-all max-h-32 overflow-y-auto scrollbar-thin"
            style={{ minHeight: '42px' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
            }}
          />
        </div>

        {/* Voice button */}
        <button
          onClick={onVoiceToggle}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border ${
            isListening
              ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30"
              : "bg-muted border-border text-muted-foreground hover:text-foreground hover:border-indigo-500/40"
          }`}
          title={isListening ? "Arrêter l'écoute" : "Parler à G-IA"}
        >
          {isListening ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
        </button>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={isLoading || (!text.trim() && !pendingFile)}
          className="w-10 h-10 rounded-xl flex items-center justify-center gia-gradient-bg text-white shadow-md hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          title="Envoyer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
