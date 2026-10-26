"use client";

import { motion } from "motion/react";
import { stackGroups } from "@/lib/content";
import { ease } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

export function Stack() {
  return (
    <section id="stack" className="shell py-20 md:py-28">
      <SectionHeading
        index="06 · Stack"
        title="Tools with a job."
        text="Chosen for the product in front of us — a site, a CRM, an LMS, or a mobile app — and for the system that has to stay standing."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {stackGroups.map((group, groupIndex) => (
          <motion.article
            key={group.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.6, delay: groupIndex * 0.06, ease }}
            className="glass relative overflow-hidden rounded-[28px] p-6 md:p-8"
          >
            <div className="pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),transparent_68%)]" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">
                  0{groupIndex + 1}
                </p>
                <h3 className="mt-2 font-display text-3xl tracking-[-0.04em]">{group.label}</h3>
              </div>
              <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                {group.items.length} tools
              </span>
            </div>
            <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-muted">{group.note}</p>
            <ul className="relative mt-6 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-white/40 px-3 py-1.5 text-sm dark:bg-white/5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
