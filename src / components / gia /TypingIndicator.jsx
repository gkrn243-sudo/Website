xport default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 message-in">
      <div className="w-8 h-8 rounded-xl gia-gradient-bg flex items-center justify-center flex-shrink-0 shadow-md">
        <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>S</span>
      </div>
      <div className="gia-chat-box rounded-3xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-indigo-400 typing-dot" />
        <div className="w-2 h-2 rounded-full bg-purple-400 typing-dot" />
        <div className="w-2 h-2 rounded-full bg-violet-400 typing-dot" />
      </div>
    </div>
  );
}
