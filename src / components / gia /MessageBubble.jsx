import ReactMarkdown from "react-markdown";
import QuizCard from "./QuizCard";
import { FileText, Image } from "lucide-react";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex items-end justify-end gap-2 message-in">
        <div className="max-w-[75%] px-4 py-3 rounded-3xl rounded-br-md gia-gradient-bg text-white text-sm shadow-xl shadow-blue-500/10">
          {message.file_url && (
            <div className="mb-2 flex items-center gap-2 text-white/80 text-xs bg-white/10 rounded-lg px-2 py-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Fichier joint</span>
            </div>
          )}
          <p className="leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 message-in">
      <div className="w-8 h-8 rounded-xl gia-gradient-bg flex items-center justify-center flex-shrink-0 shadow-md mt-0.5">
        <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>S</span>
      </div>
      <div className="max-w-[78%] space-y-2">
        {message.quiz ? (
          <QuizCard quiz={message.quiz} />
        ) : message.is_generated_image && message.file_url ? (
          <div className="gia-chat-box rounded-3xl rounded-tl-md px-4 py-3 text-sm space-y-3">
            <p className="text-foreground">{message.content}</p>
            <img src={message.file_url} alt="Image générée" className="rounded-xl max-w-full shadow-lg border border-indigo-500/20" />
          </div>
        ) : (
          <div className="gia-chat-box rounded-3xl rounded-tl-md px-4 py-3 text-sm">
            <ReactMarkdown
              className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              components={{
                p: ({ children }) => <p className="leading-relaxed my-1 text-foreground">{children}</p>,
                strong: ({ children }) => <strong className="text-indigo-300 font-semibold">{children}</strong>,
                code: ({ children }) => <code className="bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded text-xs">{children}</code>,
                ul: ({ children }) => <ul className="list-disc list-inside my-1 space-y-0.5">{children}</ul>,
                li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        <span className="text-xs text-muted-foreground px-1">{message.timestamp}</span>
      </div>
    </div>
  );
}
