"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { showcase } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";

export function Showcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 4600, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const current = showcase[selected];

  return (
    <section id="work" className="py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          index="04 · Work"
          title="The mark, in the room."
          text="Cover, desk, phone, and the field. Drag across the frames — every still is part of the same signal."
        />
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              {String(selected + 1).padStart(2, "0")} / {String(showcase.length).padStart(2, "0")} · {current.tag}
            </p>
            <h3 className="mt-2 font-display text-3xl tracking-[-0.03em]">{current.title}</h3>
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous frame" className="grid size-11 place-items-center rounded-full border border-line" onClick={() => emblaApi?.scrollPrev()}>
              <ArrowLeft size={16} />
            </button>
            <button type="button" aria-label="Next frame" className="grid size-11 place-items-center rounded-full border border-line" onClick={() => emblaApi?.scrollNext()}>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef} data-cursor>
        <div className="flex touch-pan-y">
          {showcase.map((slide, index) => (
            <div key={slide.slug} className="min-w-0 shrink-0 basis-[88%] px-2 md:basis-[72%]">
              <article className={`relative h-[62vh] min-h-[420px] overflow-hidden rounded-[28px] transition-opacity duration-500 ${selected === index ? "opacity-100" : "opacity-60"}`}>
                <Image src={slide.image} alt={slide.alt} fill sizes="80vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b1a] via-[#070b1a]/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-[#070b1a]/55 p-4 text-[#e6f0ff] backdrop-blur-xl md:inset-x-6 md:bottom-6 md:p-5">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-[#22d3ee] uppercase">{slide.tag}</p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#d5e2f7] md:text-base">{slide.summary}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="shell mt-5 flex gap-2">
        {showcase.map((slide, index) => (
          <button
            key={slide.slug}
            type="button"
            aria-label={`Show ${slide.title}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${selected === index ? "bg-gradient-to-r from-[#2563ff] to-[#22d3ee]" : "bg-black/10 dark:bg-white/15"}`}
          />
        ))}
      </div>
    </section>
  );
}
