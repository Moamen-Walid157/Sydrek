"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs } from "@/lib/content";
import { ease } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="shell py-8 pb-24 md:py-10 md:pb-28">
      <SectionHeading
        index="10 · Questions"
        title="Before the first call."
        text="The practical questions people ask before they brief a website, a CRM, an ERP, or an app."
      />
      <div className="grid gap-3">
        {faqs.map((item, index) => {
          const on = open === index;
          return (
            <div key={item.q} className="glass overflow-hidden rounded-2xl">
              <button
                type="button"
                aria-expanded={on}
                onClick={() => setOpen(on ? -1 : index)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-6"
              >
                <span className="font-display text-lg tracking-[-0.03em] md:text-xl">{item.q}</span>
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line font-mono text-sm text-[#22d3ee]">
                  {on ? "–" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl px-5 pb-6 text-sm leading-relaxed text-muted md:px-6">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
