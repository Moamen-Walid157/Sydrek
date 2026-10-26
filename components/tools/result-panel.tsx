"use client";

import Link from "next/link";
import { toast } from "sonner";
import { contactBrief, type ToolResult, type ToolSlug } from "@/lib/tools";

export function ResultPanel({
  result,
  tool,
  empty,
}: {
  result: ToolResult | null;
  tool: ToolSlug;
  empty: string;
}) {
  if (!result) {
    return (
      <aside className="glass rounded-[28px] p-6 md:p-8">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Result</p>
        <p className="mt-4 text-muted">{empty}</p>
      </aside>
    );
  }

  const href = contactBrief({ tool, interest: result.interest, message: result.message });

  return (
    <aside className="glass rounded-[28px] p-6 md:p-8" aria-live="polite">
      <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">{result.kicker}</p>
      <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] md:text-5xl">{result.title}</h2>
      {typeof result.score === "number" && (
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-[#2563ff] to-[#22d3ee]" style={{ width: `${result.score}%` }} />
        </div>
      )}
      <p className="mt-4 text-sm leading-relaxed text-muted">{result.summary}</p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        {result.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-line bg-white/40 p-3 dark:bg-white/5">
            <dt className="text-xs text-muted">{stat.label}</dt>
            <dd className="mt-1 font-display text-lg tracking-[-0.03em]">{stat.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 grid gap-5">
        {result.blocks.map((block) => (
          <section key={block.title}>
            <h3 className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{block.title}</h3>
            <ul className="mt-2 grid gap-2 text-sm leading-relaxed">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-muted">{result.note}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={href} className="btn btn-primary">
          Send this to Sydrek
        </Link>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(result.message);
              toast.success("Result copied.");
            } catch {
              toast.error("Could not copy from this browser.");
            }
          }}
        >
          Copy result
        </button>
      </div>
      <Link href={result.next.href} className="mt-4 inline-block text-sm text-muted hover:text-fg">
        {result.next.label}
      </Link>
    </aside>
  );
}
