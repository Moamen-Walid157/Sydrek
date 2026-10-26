"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-step]");
        const nums = gsap.utils.toArray<HTMLElement>("[data-step-index]");
        gsap.set(panels, { autoAlpha: 0, y: 36 });
        gsap.set(panels[0], { autoAlpha: 1, y: 0 });
        gsap.set(nums, { opacity: 0.35 });
        gsap.set(nums[0], { opacity: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: 0.65,
            anticipatePin: 1,
          },
        });

        panels.forEach((panel, index) => {
          if (index === 0) return;
          timeline
            .to(panels[index - 1], { autoAlpha: 0, y: -28, duration: 0.45 }, index)
            .to(nums[index - 1], { opacity: 0.35, duration: 0.45 }, index)
            .to(panel, { autoAlpha: 1, y: 0, duration: 0.45 }, index)
            .to(nums[index], { opacity: 1, duration: 0.45 }, index)
            .to("[data-process-bar]", { scaleX: (index + 1) / panels.length, duration: 0.45 }, index);
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="process" ref={root} className="relative">
      <div className="shell hidden min-h-[100svh] flex-col justify-center py-24 lg:flex">
        <p className="font-mono text-[11px] tracking-[0.16em] text-[#22d3ee] uppercase">04 · Process</p>
        <div className="mt-6 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-5xl tracking-[-0.04em] xl:text-6xl">Four movements. One system.</h2>
            <div className="mt-8 grid gap-3">
              {steps.map((step) => (
                <p key={step.index} data-step-index className="font-display text-2xl tracking-[-0.03em]">
                  <span className="mr-3 font-mono text-sm text-[#22d3ee]">{step.index}</span>
                  {step.title}
                </p>
              ))}
            </div>
            <div className="mt-8 h-1 origin-left scale-x-[0.25] overflow-hidden rounded-full bg-black/10 dark:bg-white/10" data-process-bar>
              <div className="h-full w-full bg-gradient-to-r from-[#2563ff] to-[#22d3ee]" />
            </div>
          </div>
          <div className="relative h-[360px]">
            {steps.map((step, index) => (
              <article key={step.index} data-step className={`glass absolute inset-0 flex flex-col justify-end rounded-[28px] p-10 ${index === 0 ? "" : "opacity-0"}`}>
                <p className="font-mono text-[11px] tracking-[0.16em] text-[#22d3ee] uppercase">{step.index}</p>
                <h3 className="mt-3 font-display text-5xl tracking-[-0.04em]">{step.title}</h3>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="shell py-20 lg:hidden">
        <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">04 · Process</p>
        <h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">Four movements. One system.</h2>
        <div className="mt-8 grid gap-4">
          {steps.map((step) => (
            <article key={step.index} className="glass rounded-[24px] p-6">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">{step.index}</p>
              <h3 className="mt-2 font-display text-3xl tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
