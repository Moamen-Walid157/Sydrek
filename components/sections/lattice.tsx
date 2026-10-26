"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn, ease } from "@/lib/utils";

const nodes = [
  { id: "edge", label: "Edge", detail: "The website, the landing page, or the first screen of the app." },
  { id: "api", label: "API", detail: "The contract between a CRM, an ERP, a CMS, and the dashboard." },
  { id: "domain", label: "Domain", detail: "The rules of the business, kept apart from the interface." },
  { id: "data", label: "Data", detail: "Customers, courses, orders, and content with a place to live." },
  { id: "observe", label: "Signals", detail: "The dashboard that tells you the product is still working." },
] as const;

const points = [
  { x: 56, y: 200 },
  { x: 168, y: 90 },
  { x: 292, y: 180 },
  { x: 416, y: 76 },
  { x: 536, y: 188 },
];

export function Lattice() {
  const [active, setActive] = useState<(typeof nodes)[number]["id"]>("api");
  const current = nodes.find((node) => node.id === active) ?? nodes[1];
  const activeIndex = nodes.findIndex((node) => node.id === current.id);

  return (
    <section className="shell py-16 md:py-24">
      <div className="glass overflow-hidden rounded-[32px] p-6 md:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">
              The lattice
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] md:text-5xl">Five layers. One signal path.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Every system we ship has the same spine. Select a node — that is the conversation we start with your team.
            </p>
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease }}
              className="mt-6 max-w-md text-base leading-relaxed"
            >
              <span className="font-display text-xl tracking-[-0.03em]">{current.label}. </span>
              <span className="text-muted">{current.detail}</span>
            </motion.p>
          </div>

          <div className="relative mx-auto aspect-[600/300] w-full max-w-xl">
            <svg viewBox="0 0 600 280" className="absolute inset-0 h-full w-full" aria-hidden>
              <path
                d="M56 200 C110 200 120 90 168 90 S240 180 292 180 S370 76 416 76 S490 188 536 188"
                fill="none"
                stroke="currentColor"
                className="text-[#2563ff]/30"
                strokeWidth="1.5"
                strokeDasharray="5 7"
              />
              <motion.path
                d="M56 200 C110 200 120 90 168 90 S240 180 292 180 S370 76 416 76 S490 188 536 188"
                fill="none"
                stroke="url(#lattice)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0.15 }}
                animate={{ pathLength: (activeIndex + 1) / nodes.length }}
                transition={{ duration: 0.6, ease }}
              />
              <defs>
                <linearGradient id="lattice" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563ff" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            {nodes.map((node, index) => (
              <button
                key={node.id}
                type="button"
                onMouseEnter={() => setActive(node.id)}
                onFocus={() => setActive(node.id)}
                onClick={() => setActive(node.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(points[index].x / 600) * 100}%`, top: `${(points[index].y / 280) * 100}%` }}
                aria-pressed={active === node.id}
              >
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-2xl border font-mono text-[11px] transition-all duration-300 md:size-14",
                    active === node.id
                      ? "border-transparent bg-gradient-to-br from-[#2563ff] to-[#22d3ee] text-white shadow-[0_0_28px_rgba(34,211,238,0.5)]"
                      : "border-line bg-white/70 text-muted backdrop-blur-md dark:bg-[#0c1428]/80",
                  )}
                >
                  0{index + 1}
                </span>
                <span
                  className={cn(
                    "absolute top-full left-1/2 mt-2 -translate-x-1/2 text-[11px] font-medium whitespace-nowrap",
                    active === node.id ? "text-fg" : "text-muted",
                  )}
                >
                  {node.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
