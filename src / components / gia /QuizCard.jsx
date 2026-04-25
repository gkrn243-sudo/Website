import { useState } from "react";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

export default function QuizCard({ quiz, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    onAnswer && onAnswer(idx);
  };

  const handleReveal = () => setRevealed(true);

  const isCorrect = selected === quiz.correct_index;

  return (
    <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 overflow-hidden">
      {quiz.image_url && (
        <div
          className="w-full h-40 bg-cover bg-center cursor-pointer relative group"
          style={{ backgroundImage: `url(${quiz.image_url})` }}
          onClick={() => selected === null && handleSelect(quiz.correct_index)}
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex items-center justify-center">
            <span className="text-white text-sm opacity-70 group-hover:opacity-100">Toucher l'image pour répondre</span>
          </div>
        </div>
      )}
      <div className="p-4 space-y-3">
        <p className="text-foreground font-medium text-sm">{quiz.question}</p>
        <div className="grid gap-2">
          {quiz.options.map((opt, idx) => {
            let bg = "bg-muted/50 border-border hover:border-indigo-500/50 hover:bg-indigo-500/10";
            if (selected !== null && revealed) {
              if (idx === quiz.correct_index) bg = "bg-green-500/20 border-green-500/50";
              else if (idx === selected) bg = "bg-red-500/20 border-red-500/50";
            } else if (selected === idx) {
              bg = "bg-indigo-500/20 border-indigo-500/50";
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all flex items-center gap-2 ${bg} ${selected !== null ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {selected !== null && revealed && idx === quiz.correct_index && <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />}
                {selected !== null && revealed && idx === selected && idx !== quiz.correct_index && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {selected !== null && !revealed && (
          <button
            onClick={handleReveal}
            className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" /> Voir la réponse et l'explication
          </button>
        )}

        {revealed && (
          <div className={`p-3 rounded-xl text-sm border ${isCorrect ? 'bg-green-500/10 border-green-500/30 text-green-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
            <p className="font-semibold mb-1">{isCorrect ? '✓ Correct !' : '✗ Pas tout à fait...'}</p>
            <p className="text-xs opacity-80">{quiz.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
