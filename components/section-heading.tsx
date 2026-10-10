"use client";

import { motion } from "motion/react";
import { ease } from "@/lib/utils";

export function SectionHeading({
  index,
  title,
  text,
}: {
  index: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.8, ease }}
      >
        <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase text-[#2563ff] dark:text-[#22d3ee]">
          {index}
        </p>
        <h2 className="mt-3 max-w-[14ch] font-display text-4xl tracking-[-0.04em] md:text-5xl">{title}</h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.8, delay: 0.08, ease }}
        className="max-w-md text-[15px] leading-relaxed text-muted"
      >
        {text}
      </motion.p>
    </div>
  );
}
