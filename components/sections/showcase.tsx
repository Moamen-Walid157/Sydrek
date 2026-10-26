"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { projects } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { ease } from "@/lib/utils";

const DWELL = 6400;

export function Showcase() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });
  const playing = inView && !reduce;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const project = projects[index];

  useEffect(() => {
    const list = listRef.current;
    const tab = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !tab) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.clientWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: reduce ? "auto" : "smooth" });
  }, [index, reduce]);

  useEffect(() => {
    if (!playing || paused) return;
    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % projects.length);
    }, DWELL);
    return () => window.clearTimeout(id);
  }, [playing, paused, index]);

  const tilt = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !stageRef.current || !rigRef.current) return;
    const box = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    rigRef.current.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg)`;
  };

  const release = () => {
    if (rigRef.current) rigRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-20 md:py-28"
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) setPaused(true);
      }}
      onMouseLeave={() => {
        setPaused(false);
        release();
      }}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="shell">
        <SectionHeading
          index="07 · Work"
          title="A sample of our projects."
          text="Five builds, desktop and phone. The reel moves on its own. Hover to hold it, or pick one."
        />

        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-10">
          <div ref={listRef} className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist" aria-label="Projects">
            {projects.map((item, itemIndex) => {
              const active = itemIndex === index;
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setIndex(itemIndex)}
                  className={`relative min-w-[210px] overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-colors lg:min-w-0 ${
                    active ? "border-transparent bg-[#070b1a] text-[#e6f0ff]" : "border-line bg-transparent text-foreground"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className={`font-mono text-[11px] tracking-[0.16em] uppercase ${active ? "text-[#22d3ee]" : "text-muted"}`}>
                      {String(itemIndex + 1).padStart(2, "0")} · {item.tag}
                    </span>
                  </span>
                  <span className="mt-1.5 block font-display text-[22px] tracking-[-0.03em]">{item.title}</span>
                  {active && playing && (
                    <span
                      key={item.slug}
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#2563ff] to-[#22d3ee]"
                      style={{
                        animation: `work-reel ${DWELL}ms linear forwards`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            ref={stageRef}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#070b1a]"
            style={{ perspective: "1400px" }}
            onMouseMove={tilt}
          >
            <div
              className="pointer-events-none absolute -top-24 -left-16 size-72 rounded-full blur-3xl transition-colors duration-700"
              style={{ background: project.glow, opacity: 0.35 }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

            <motion.div
              ref={rigRef}
              className="relative px-3 pt-5 pb-4 transition-transform duration-300 ease-out sm:px-5 sm:pt-6 sm:pb-5"
              style={{ transformStyle: "preserve-3d" }}
              initial={false}
              animate={reduce || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-5">
              <div className="relative z-10 w-full min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1224] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] md:flex-1">
                <div className="flex h-10 items-center gap-2 border-b border-white/10 px-3.5">
                  <span className="size-2.5 rounded-full bg-white/20" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/10" />
                  <span className="mx-auto truncate rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-[#8aa0c8] uppercase">
                    {project.title}
                  </span>
                </div>
                <div className="bg-[#070b1a]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={project.image}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                    >
                      <img src={project.image} alt={project.alt} className="block h-auto w-full" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <motion.div
                className="relative z-20 w-[72%] max-w-[280px] shrink-0 md:w-[27%]"
                animate={playing ? { y: [0, -10, 0] } : { y: 0 }}
                transition={playing ? { duration: 5.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4, ease }}
              >
                <div className="rounded-[28px] border-[7px] border-[#10182e] bg-[#10182e] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.85)]">
                  <div className="overflow-hidden rounded-[20px] bg-[#070b1a]">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={project.mobile}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                      >
                        <img src={project.mobile} alt={project.mobileAlt} className="block h-auto w-full" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
              </div>

              <div className="relative z-30 mt-4 flex flex-wrap items-end justify-between gap-3">
                <div className="relative min-h-16 flex-1">
                  <AnimatePresence initial={false}>
                    <motion.p
                      key={project.slug}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="absolute inset-x-0 top-0 max-w-md text-sm leading-relaxed text-[#c5d4ee]"
                    >
                      {project.summary}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
