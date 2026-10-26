"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn, ease } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

const stages = [
  {
    id: "commit",
    label: "Commit",
    line: "rev    a4c91e2  ·  main",
    note: "Every change starts as a small, reviewable slice.",
  },
  {
    id: "review",
    label: "Review",
    line: "checks 14 passed · 0 failed",
    note: "Types, tests, and the contract of the API before anything merges.",
  },
  {
    id: "build",
    label: "Build",
    line: "image  api@2.14.0  ·  signed",
    note: "A reproducible artifact, not a laptop that happened to work.",
  },
  {
    id: "preview",
    label: "Preview",
    line: "slice  214  ·  ready",
    note: "A real environment for the change, before it touches production.",
  },
  {
    id: "canary",
    label: "Canary",
    line: "traffic  5%  ·  eu-west-1",
    note: "A thin slice of live traffic, watched before the rest follows.",
  },
  {
    id: "release",
    label: "Release",
    line: "rollout  100%  ·  rollback armed",
    note: "The full release, with the previous version one step away.",
  },
] as const;

export function Pipeline() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = stages[index];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || paused) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % stages.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section id="pipeline" className="shell py-20 md:py-28">
      <SectionHeading
        index="05 · Release"
        title="From commit to live."
        text="A site, a CRM, or an app is finished when it is running, watched, and reversible. This is the path every serious change takes."
      />
      <div
        className="glass overflow-hidden rounded-[32px] p-5 md:p-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative">
              <div className="absolute top-5 right-5 left-5 hidden h-px bg-line sm:block" />
              <div
                className="absolute top-5 left-5 hidden h-px bg-gradient-to-r from-[#2563ff] to-[#22d3ee] transition-all duration-500 sm:block"
                style={{ width: index === 0 ? 0 : `calc(${(index / (stages.length - 1)) * 100}% - 2.5rem)` }}
              />
              <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-6">
                {stages.map((stage, stageIndex) => {
                  const on = stageIndex === index;
                  const done = stageIndex < index;
                  return (
                    <li key={stage.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setIndex(stageIndex);
                          setPaused(true);
                        }}
                        className="flex w-full flex-col items-center gap-3 text-center"
                        aria-current={on ? "step" : undefined}
                      >
                        <span
                          className={cn(
                            "grid size-10 place-items-center rounded-2xl border font-mono text-[11px] transition-all duration-300",
                            on
                              ? "border-transparent bg-gradient-to-br from-[#2563ff] to-[#22d3ee] text-white shadow-[0_0_28px_rgba(34,211,238,0.45)]"
                              : done
                                ? "border-[#22d3ee]/50 text-[#2563ff] dark:text-[#22d3ee]"
                                : "border-line text-muted",
                          )}
                        >
                          0{stageIndex + 1}
                        </span>
                        <span className={cn("text-xs font-medium", on ? "text-fg" : "text-muted")}>{stage.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="mt-8 max-w-lg text-base leading-relaxed text-muted"
              >
                <span className="font-display text-2xl tracking-[-0.04em] text-fg">{current.label}. </span>
                {current.note}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="rounded-[24px] border border-line bg-[#070b1a] p-5 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#22d3ee] uppercase">release.log</p>
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-white/50 uppercase">
                <span className="size-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" />
                {paused ? "held" : "live"}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.pre
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="mt-6 font-mono text-sm leading-7 text-white/80"
              >
                <span className="text-[#22d3ee]">sydrek</span>
                <span className="text-white/40"> › </span>
                {current.label.toLowerCase()}
                {"\n"}
                {current.line}
                {"\n"}
                <span className="text-white/40">status </span>
                healthy
              </motion.pre>
            </AnimatePresence>
            <div className="mt-8 grid grid-cols-3 gap-2">
              {[
                ["p95", "64ms"],
                ["errors", "0.02%"],
                ["regions", "3"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase">{label}</p>
                  <p className="mt-1 font-display text-lg tracking-[-0.03em]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
