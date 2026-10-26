import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";

export const metadata: Metadata = {
  title: "Work",
  description: "A sample of projects Sydrek has shipped, on desktop and phone.",
  alternates: { canonical: "/work/" },
  openGraph: {
    title: "Work · Sydrek",
    description: "A sample of projects Sydrek has shipped, on desktop and phone.",
    url: "/work/",
  },
};

export default function WorkPage() {
  return (
    <section className="shell pt-32 pb-24">
      <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">Selected work</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-[-0.045em] md:text-7xl">Work you can stand in front of.</h1>
      <p className="mt-5 max-w-xl text-muted">
        A sample of the projects, each with the desktop and the phone. Filter them, then open one for the longer note.
      </p>
      <div className="mt-10">
        <WorkGrid />
      </div>
    </section>
  );
}
