"use client";

import { useEffect, useRef, useState } from "react";
import { Quiz } from "@/components/tools/quiz";
import { ResultPanel } from "@/components/tools/result-panel";
import { crmQuestions, crmResult } from "@/lib/tools";

export function CrmCheck() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const result = crmResult(answers);
  const panelRef = useRef<HTMLDivElement>(null);
  const done = Boolean(result);

  useEffect(() => {
    if (!done || !window.matchMedia("(max-width: 1023px)").matches) return;
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [done]);

  return (
    <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
      <div className="glass rounded-[28px] p-6 md:p-8">
        <Quiz
          questions={crmQuestions}
          answers={answers}
          onChange={(id, index) => setAnswers((current) => ({ ...current, [id]: index }))}
        />
      </div>
      <div ref={panelRef} className="lg:sticky lg:top-28">
        <ResultPanel
          result={result}
          tool="crm"
          empty="Answer five questions about leads, owners, follow-up, deals, and reporting."
        />
      </div>
    </div>
  );
}
