"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Activity, ArrowLeft, ArrowRight, Cloud, Database, Layers, Rocket, ShieldCheck } from "lucide-react";
import { services } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";

const icons = {
  layers: Layers,
  cloud: Cloud,
  shield: ShieldCheck,
  database: Database,
  activity: Activity,
  rocket: Rocket,
} as const;

export function Services() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, dragFree: false }, [
    Autoplay({ delay: 3800, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(0);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setProgress(emblaApi.scrollProgress());
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", onScroll);
    emblaApi.on("select", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll);
      emblaApi.off("select", onScroll);
    };
  }, [emblaApi, onScroll]);

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="02 · Services"
          title="Six ways the work shows up."
          text="Drag the rail, or let it move. Each card is a practice we actually run — not a menu of buzzwords."
        />
      </div>
      <div className="shell">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            {String(selected + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button type="button" className="grid size-10 place-items-center rounded-full border border-line" aria-label="Previous service" onClick={() => emblaApi?.scrollPrev()}>
              <ArrowLeft size={16} />
            </button>
            <button type="button" className="grid size-10 place-items-center rounded-full border border-line" aria-label="Next service" onClick={() => emblaApi?.scrollNext()}>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden pl-[max(1rem,calc((100%-1180px)/2))]" ref={emblaRef} data-cursor>
        <div className="flex touch-pan-y gap-4">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.title}
                className="glass min-h-[320px] shrink-0 basis-[84%] rounded-[24px] p-6 transition-transform duration-500 hover:-translate-y-1 sm:basis-[48%] xl:basis-[32%]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#2563ff]/20 to-[#22d3ee]/20 text-[#2563ff] dark:text-[#22d3ee]">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.16em] text-muted">{service.index}</span>
                </div>
                <h3 className="mt-10 font-display text-3xl tracking-[-0.03em]">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.text}</p>
              </article>
            );
          })}
        </div>
      </div>
      <div className="shell mt-6">
        <div className="h-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-[#2563ff] to-[#22d3ee]" style={{ width: `${Math.max(8, Math.min(100, progress * 100))}%` }} />
        </div>
      </div>
    </section>
  );
}
