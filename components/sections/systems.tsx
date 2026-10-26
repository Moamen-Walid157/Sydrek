"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { systems } from "@/lib/content";
import { cn, ease } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

export function Systems() {
  const [active, setActive] = useState<(typeof systems)[number]["id"]>("websites");
  const current = systems.find((item) => item.id === active) ?? systems[0];

  return (
    <section id="systems" className="shell py-20 md:py-28">
      <SectionHeading
        index="02 · Systems"
        title="Software, named precisely."
        text="Websites, CRMs, ERPs, dashboards, search, AI, learning, content, and mobile. Open one — the panel is the work."
      />
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="grid max-h-[520px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-1" role="tablist" aria-label="Software systems">
          {systems.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "rounded-2xl border border-line px-4 py-3 text-left transition-all duration-300",
                active === item.id
                  ? "bg-gradient-to-r from-[#2563ff] to-[#22d3ee] text-white shadow-[0_16px_40px_-24px_rgba(37,99,255,0.9)]"
                  : "glass text-muted hover:text-fg",
              )}
            >
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase opacity-70">{item.index}</span>
              <span className="mt-1 block font-display text-lg tracking-[-0.03em]">{item.title}</span>
            </button>
          ))}
        </div>

        <div className="glass relative min-h-[420px] overflow-hidden rounded-[28px] p-6 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_100%_0%,rgba(37,99,255,0.22),transparent_60%)]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
              className="relative"
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">
                {current.index} · Signal
              </p>
              <h3 className="mt-3 font-display text-4xl tracking-[-0.04em] md:text-5xl">{current.title}</h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{current.lead}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {current.points.map((point) => (
                  <li key={point} className="glass-strong flex items-start gap-3 rounded-2xl px-4 py-3 text-sm">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#2563ff] to-[#22d3ee]" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-8 inline-flex rounded-full border border-line px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-[#2563ff] uppercase dark:text-[#22d3ee]">
                {current.signal}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
