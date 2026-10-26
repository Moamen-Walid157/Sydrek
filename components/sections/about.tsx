"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { ease } from "@/lib/utils";

const stats = [
  { value: 10, suffix: "", digits: 0, label: "Core services" },
  { value: 50, suffix: "+", digits: 0, label: "Further capabilities" },
  { value: 3, suffix: "", digits: 0, label: "Ways to start" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPlay(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="shell py-20 md:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">09 · About</p>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] md:text-6xl">A stable lattice. A live signal.</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            The Sydrek mark is an S held between two chevrons. Silver carries the structure. Blue marks the direction. Two nodes stay in sync — the same standard we hold a website, a CRM, or an app to.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            We build the product people see and the system underneath it: sites, landing pages, CRMs, ERPs, dashboards, learning, content, and mobile.
          </p>
          <div ref={ref} className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4">
                <p className="font-display text-3xl tracking-[-0.04em] tabular-nums">
                  <NumberFlow
                    value={play ? stat.value : 0}
                    suffix={stat.suffix}
                    format={{ minimumFractionDigits: stat.digits, maximumFractionDigits: stat.digits }}
                  />
                </p>
                <p className="mt-2 text-xs leading-snug text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="relative aspect-square overflow-hidden rounded-[32px] border border-line shadow-[var(--shadow)]"
        >
          <Image
            src="/images/mark-full.jpg"
            alt="The Sydrek mark: a silver S between white and blue chevrons on a navy field"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
