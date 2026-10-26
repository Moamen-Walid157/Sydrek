"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { projects } from "@/lib/content";
import { cn } from "@/lib/utils";

const filters = ["All", ...Array.from(new Set(projects.map((project) => project.tag)))] as const;

export function WorkGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);
  const visible = projects.filter((project) => filter === "All" || project.tag === filter);

  const setOpen = (project: (typeof projects)[number] | null) => {
    setActive(project);
    const lenis = window.__sydrekLenis;
    if (project) lenis?.stop();
    else lenis?.start();
  };

  return (
    <>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter work">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full border border-line px-4 py-2 text-sm text-muted",
              filter === item && "bg-gradient-to-r from-[#2563ff] to-[#22d3ee] text-white",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {visible.map((project) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => setOpen(project)}
            className="glass group overflow-hidden rounded-[28px] text-left"
          >
            <div className="relative aspect-[2/1] overflow-hidden bg-[#070b1a]">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-5">
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">{project.tag}</p>
              <h2 className="mt-2 font-display text-3xl tracking-[-0.03em]">{project.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
            </div>
          </button>
        ))}
      </div>

      <Dialog.Root open={Boolean(active)} onOpenChange={(open) => !open && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-[#070b1a]/75 backdrop-blur-sm" />
          <Dialog.Content className="glass-strong fixed top-1/2 left-1/2 z-[100] grid max-h-[min(860px,calc(100%-2rem))] w-[min(920px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-[28px] md:grid-cols-2">
            {active && (
              <>
                <div className="flex items-end gap-3 bg-[#070b1a] p-3">
                  <Image src={active.image} alt={active.alt} width={1024} height={494} className="h-auto min-w-0 flex-1" style={{ width: "100%", height: "auto" }} />
                  <Image src={active.mobile} alt={active.mobileAlt} width={360} height={780} className="h-auto w-[28%] shrink-0" style={{ height: "auto" }} />
                </div>
                <div className="p-6 md:p-8">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">{active.tag}</p>
                  <Dialog.Title className="mt-2 font-display text-4xl tracking-[-0.04em]">{active.title}</Dialog.Title>
                  <Dialog.Description className="mt-4 text-sm leading-relaxed text-muted">{active.story}</Dialog.Description>
                  <Dialog.Close className="btn btn-ghost mt-6">Close</Dialog.Close>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
