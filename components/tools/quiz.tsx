"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Quiz({
  questions,
  answers,
  onChange,
}: {
  questions: readonly { id: string; prompt: string; options: readonly { label: string }[] }[];
  answers: Record<string, number>;
  onChange: (id: string, index: number) => void;
}) {
  const [step, setStep] = useState(0);
  const question = questions[step];
  const selected = answers[question.id];
  const answered = questions.filter((item) => answers[item.id] !== undefined).length;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          {String(step + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}
        </p>
        <p className="text-xs text-muted">
          {answered} of {questions.length} answered
        </p>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#2563ff] to-[#22d3ee]"
          style={{ width: `${(answered / questions.length) * 100}%` }}
        />
      </div>
      <h2 className="mt-5 font-display text-2xl tracking-[-0.03em]">{question.prompt}</h2>
      <div className="mt-4 grid gap-2" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((option, index) => (
          <button
            key={option.label}
            type="button"
            role="radio"
            aria-checked={selected === index}
            onClick={() => {
              onChange(question.id, index);
              if (step < questions.length - 1) setStep(step + 1);
            }}
            className={cn(
              "rounded-2xl border border-line px-4 py-3 text-left text-sm transition-colors",
              selected === index && "border-[#2563ff] bg-[#2563ff]/10",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="mt-5 flex gap-2">
        <button type="button" className="btn btn-ghost disabled:opacity-40" disabled={step === 0} onClick={() => setStep((value) => value - 1)}>
          Back
        </button>
        {selected !== undefined && step < questions.length - 1 && (
          <button type="button" className="btn btn-ghost" onClick={() => setStep((value) => value + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
