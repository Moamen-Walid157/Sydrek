import type { Metadata } from "next";
import { RoiCalculator } from "@/components/tools/roi-calculator";
import { ToolHeader } from "@/components/tools/tool-header";
import { ToolSwitcher } from "@/components/tools/tool-switcher";

export const metadata: Metadata = {
  title: "AI & automation ROI",
  description: "Estimate hours recovered and monthly savings from automating a repeated task. A planning figure, not a quote.",
  alternates: { canonical: "/tools/roi/" },
  openGraph: {
    title: "AI & automation ROI · Sydrek",
    description: "Turn a repeated task into hours recovered and a monthly figure.",
    url: "/tools/roi/",
  },
};

export default function RoiPage() {
  return (
    <section className="shell pt-32 pb-24">
      <ToolHeader
        index="01"
        stage="Understand"
        title="What could automation return?"
        text="Enter the people, the hours, and what an hour costs. The page turns that into a monthly figure you can send to Sydrek."
      />
      <ToolSwitcher current="roi" />
      <RoiCalculator />
    </section>
  );
}
