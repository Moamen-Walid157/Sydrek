"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { systems } from "@/lib/content";
import { cn, ease } from "@/lib/utils";

const stages = [
  { id: "sites", label: "Sites", match: ["websites", "landing", "cms", "seo"] },
  { id: "crm", label: "CRM", match: ["crm"] },
  { id: "ops", label: "Ops", match: ["erp", "lms", "dashboards", "ai"] },
  { id: "apps", label: "Apps", match: ["mobile", "more"] },
] as const;

const specs = [
  { k: "11", v: "Named systems" },
  { k: "50+", v: "Beside the core" },
  { k: "Web", v: "Through to the app" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [paused, setPaused] = useState(false);
  const current = systems[index] ?? systems[0];
  const stageId = stages.find((stage) => (stage.match as readonly string[]).includes(current.id))?.id;

  useEffect(() => {
    if (reduce || pinned || paused) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % systems.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [paused, pinned, reduce]);

  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  useEffect(() => {
    const list = listRef.current;
    const item = document.getElementById(`hero-system-${current.id}`);
    if (!list || !item) return;
    const delta = item.getBoundingClientRect().top - list.getBoundingClientRect().top - list.clientHeight / 2 + item.clientHeight / 2;
    list.scrollTo({ top: list.scrollTop + delta, behavior: reduce ? "auto" : "smooth" });
  }, [current.id, reduce]);

  return (
    <section id="top" ref={sectionRef} className="relative isolate min-h-[100svh] overflow-hidden bg-[#070b1a] text-white">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-0 scale-110">
        <Image
          src="/images/cover.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#070b1a_0%,#070b1a_34%,rgba(7,11,26,0.82)_58%,rgba(7,11,26,0.42)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b1a] via-transparent to-[#070b1a]/70" />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(138,148,184,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(138,148,184,0.14) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 70% 45%, black 10%, transparent 72%)",
        }}
      />

      <div className="shell relative flex min-h-[100svh] flex-col pt-28 pb-8 md:pt-32">
        <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-4 font-mono text-[11px] tracking-[0.16em] text-[#9aabc9] uppercase">
          <span>01 / Arrival</span>
          <span className="hidden md:inline">Websites · CRM · ERP · Dashboards · Apps</span>
          <span className="inline-flex items-center gap-2 text-[#d7e4ff]">
            <span className="relative flex size-1.5">
              {reduce ? null : <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#22d3ee] opacity-70" />}
              <span className="relative size-1.5 rounded-full bg-[#22d3ee]" />
            </span>
            Studio live
          </span>
        </div>

        <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-12 lg:py-10">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-[#22d3ee] uppercase">Quantum Core · Software solutions</p>
            <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(52px,7.4vw,92px)] leading-[0.88] font-bold tracking-[-0.05em] text-[#e6f0ff]">
              Engineered
              <br />
              as a{" "}
              <span className="bg-gradient-to-r from-[#e6f0ff] via-[#7dd3fc] to-[#22d3ee] bg-clip-text text-transparent">
                system.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#b7c3e0] md:text-lg">
              Websites, landing pages, CRMs, ERPs, dashboards, and mobile apps. SEO, AI, and more than fifty systems beside them — drawn before they are built.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Start a project
                <ArrowUpRight className="size-4" />
              </Link>
              <Link href="/#services" className="btn btn-ghost !border-white/20 !bg-white/5 !text-white">
                See the services
              </Link>
            </div>

            <div className="mt-8 max-w-lg">
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-[#8ea0c4] uppercase">
                <span>Stack path</span>
                <span>{stages.find((stage) => stage.id === stageId)?.label}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {stages.map((stage, stageIndex) => {
                  const on = stage.id === stageId;
                  return (
                    <div key={stage.id} className="relative">
                      {stageIndex > 0 && <span className={cn("absolute top-[7px] -left-2 h-px w-2", on ? "bg-[#22d3ee]" : "bg-white/20")} />}
                      <span className={cn("mb-2 block h-1.5 rounded-full", on ? "hero-trace" : "bg-white/12")} />
                      <p className={cn("font-mono text-[10px] tracking-[0.12em] uppercase sm:text-[11px]", on ? "text-white" : "text-[#8ea0c4]")}>
                        {stage.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#070b1a]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_30px_80px_-36px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
            }}
          >
            <span className="pointer-events-none absolute top-3 left-3 size-4 border-t border-l border-[#22d3ee]/80" />
            <span className="pointer-events-none absolute top-3 right-3 size-4 border-t border-r border-[#22d3ee]/80" />
            <span className="pointer-events-none absolute bottom-3 left-3 size-4 border-b border-l border-[#22d3ee]/80" />
            <span className="pointer-events-none absolute right-3 bottom-3 size-4 border-r border-b border-[#22d3ee]/80" />

            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#8ea0c4] uppercase">Sydrek / Index</p>
                <p className="mt-1 font-display text-lg tracking-[-0.03em]">Operating catalogue</p>
              </div>
              <p className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-[#c9d6f5] uppercase">
                {String(index + 1).padStart(2, "0")} / {String(systems.length).padStart(2, "0")}
              </p>
            </div>

            <div ref={listRef} className="relative max-h-[280px] overflow-y-auto px-2 py-2" role="tablist" aria-label="Software catalogue">
              {systems.map((system, systemIndex) => {
                const selected = systemIndex === index;
                return (
                  <button
                    key={system.id}
                    id={`hero-system-${system.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="hero-system-detail"
                    onClick={() => {
                      setIndex(systemIndex);
                      setPinned(true);
                    }}
                    className={cn(
                      "grid w-full grid-cols-[2.4rem_1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      selected ? "bg-white/10 text-white" : "text-[#b7c3e0] hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <span className={cn("font-mono text-[11px]", selected ? "text-[#22d3ee]" : "text-[#6e7f9e]")}>{system.index}</span>
                    <span className="truncate font-display text-[15px] tracking-[-0.02em]">{system.title}</span>
                    <span className={cn("size-1.5 rounded-full", selected ? "bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" : "bg-white/20")} />
                  </button>
                );
              })}
            </div>

            <div id="hero-system-detail" role="tabpanel" className="border-t border-white/10 px-5 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease }}
                >
                  <p className="font-mono text-[10px] tracking-[0.16em] text-[#22d3ee] uppercase">
                    {current.index} · {current.signal}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#c5d2ea]">{current.lead}</p>
                  <Link href="/#systems" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white">
                    Open this system
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/12 bg-[#070b1a]/50">
          {specs.map((spec, specIndex) => (
            <div key={spec.v} className={cn("px-4 py-4 md:px-6", specIndex > 0 && "border-l border-white/12")}>
              <p className="font-display text-2xl tracking-[-0.04em] text-white md:text-3xl">{spec.k}</p>
              <p className="mt-1 text-[11px] text-[#9aabc9] md:text-sm">{spec.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
