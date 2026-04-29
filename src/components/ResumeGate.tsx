'use client';

import { useState, FormEvent } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // correct option index
}

const questions: Question[] = [
  {
    id: 1,
    question: '我在哪个城市读的大学？',
    options: ['A. 北京', 'B. 青岛', 'C. 上海', 'D. 济南'],
    answer: 1,
  },
  {
    id: 2,
    question: '我在小米AI竞赛中，使用了哪种隐私保护技术？',
    options: ['A. 差分隐私', 'B. 同态加密', 'C. 联邦学习', 'D. 安全多方计算'],
    answer: 2,
  },
  {
    id: 3,
    question: '我开源的手写汉字数据集有多少样本？',
    options: ['A. 约1万', 'B. 约3万', 'C. 约5.4万', 'D. 约10万'],
    answer: 2,
  },
];

export function ResumeGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  if (unlocked) {
    return <>{children}</>;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selected === null) return;

    if (selected === questions[currentQ].answer) {
      setError(false);
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        setUnlocked(true);
      }
    } else {
      setError(true);
      setAttempts(attempts + 1);
    }
  };

  const q = questions[currentQ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-lg w-full px-6 opacity-0 animate-fade-in">
        {/* Terminal header */}
        <div className="rounded-t-xl bg-bg-tertiary border border-border border-b-0 px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-text-tertiary ml-2">
            resume — identity verification
          </span>
        </div>

        {/* Terminal body */}
        <div className="rounded-b-xl border border-border border-t-0 p-6 bg-bg-secondary/50">
          <div className="font-mono text-xs text-accent mb-6">
            <span className="text-text-tertiary">system:</span> This resume is access-controlled.
            <br />
            <span className="text-text-tertiary">system:</span> Answer {questions.length} questions to proceed.
            <br />
            <span className="text-text-tertiary">system:</span> Question {currentQ + 1}/{questions.length}
          </div>

          <form onSubmit={handleSubmit}>
            <p className="text-text-primary font-medium mb-5 text-sm leading-relaxed">
              {q.question}
            </p>

            <div className="space-y-2.5 mb-6">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 text-sm
                    ${selected === i
                      ? 'border-accent bg-accent-muted text-accent'
                      : 'border-border text-text-secondary hover:border-accent/30 hover:bg-bg-tertiary/50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={i}
                    checked={selected === i}
                    onChange={() => { setSelected(i); setError(false); }}
                    className="sr-only"
                  />
                  <span className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                    ${selected === i ? 'border-accent' : 'border-border'}
                  `}>
                    {selected === i && (
                      <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                    )}
                  </span>
                  {opt}
                </label>
              ))}
            </div>

            {error && (
              <div className="font-mono text-xs text-red-400 mb-4 flex items-center gap-2">
                <span>$</span> Incorrect. Try again. {attempts >= 3 && '(Hint: think about what I wrote in my blog posts...)'}
              </div>
            )}

            <button
              type="submit"
              disabled={selected === null}
              className={`
                w-full font-mono text-sm py-2.5 rounded-lg transition-all duration-200
                ${selected !== null
                  ? 'bg-accent text-white hover:bg-accent-hover cursor-pointer'
                  : 'bg-bg-tertiary text-text-tertiary cursor-not-allowed'
                }
              `}
            >
              {currentQ < questions.length - 1 ? 'Next question →' : 'Unlock resume'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
