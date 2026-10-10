import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";

export const metadata: Metadata = {
  title: "Work",
  description: "Frames of the Sydrek mark — platforms, product, brand, and the core network.",
};

export default function WorkPage() {
  return (
    <section className="shell pt-32 pb-24">
      <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">Selected frames</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-[-0.045em] md:text-7xl">Work you can stand in front of.</h1>
      <p className="mt-5 max-w-xl text-muted">
        Four rooms the mark already lives in. Filter them, then open a frame for the longer note.
      </p>
      <div className="mt-10">
        <WorkGrid />
      </div>
    </section>
  );
}
