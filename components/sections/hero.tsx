"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ease } from "@/lib/utils";

const chips = [
  { k: "99.99%", v: "Uptime standard" },
  { k: "14", v: "Regions in play" },
  { k: "84ms", v: "P95 design bar" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section id="top" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src="/images/cover.jpg"
          alt="The Sydrek signal mark glowing inside a network of nodes, code, and live dashboards"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#070b1a] via-[#070b1a]/78 to-[#070b1a]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b1a] via-transparent to-[#070b1a]/40" />

      <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:justify-center md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-xl rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-2xl md:p-8"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-[#c9d6f5] uppercase">
            <span className="size-1.5 rounded-full bg-gradient-to-br from-[#2563ff] to-[#22d3ee]" />
            Quantum Core · Software solutions
          </p>
          <h1 className="mt-5 font-display text-[clamp(44px,7vw,84px)] leading-[0.92] font-bold tracking-[-0.045em] text-[#e6f0ff]">
            Engineered for{" "}
            <span className="bg-gradient-to-r from-[#e6f0ff] via-[#7dd3fc] to-[#22d3ee] bg-clip-text text-transparent">
              what&apos;s next.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#b7c3e0] md:text-lg">
            Sydrek builds precision infrastructure — platforms, cloud, security, and data systems for people who trust depth over decoration.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Start a project
            </Link>
            <Link href="/#platform" className="btn btn-ghost !border-white/20 !bg-white/5 !text-white">
              See the platform
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="mt-6 grid max-w-xl grid-cols-3 gap-3"
        >
          {chips.map((chip) => (
            <div key={chip.v} className="rounded-2xl border border-white/12 bg-[#070b1a]/45 px-3 py-3 backdrop-blur-md">
              <p className="font-display text-lg tracking-[-0.03em] text-white md:text-2xl">{chip.k}</p>
              <p className="mt-1 text-[11px] text-[#9aabc9] md:text-xs">{chip.v}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
