import type { Metadata } from "next";
import { ReadinessCheck } from "@/components/tools/readiness-check";
import { ToolHeader } from "@/components/tools/tool-header";
import { ToolSwitcher } from "@/components/tools/tool-switcher";

export const metadata: Metadata = {
  title: "AI readiness",
  description: "Score a business on data, repetitive work, software, documentation, and ownership. Leave with three moves and a 30-day plan.",
  alternates: { canonical: "/tools/readiness/" },
  openGraph: {
    title: "AI readiness · Sydrek",
    description: "A readiness score, three automations, and a 30-day plan.",
    url: "/tools/readiness/",
  },
};

export default function ReadinessPage() {
  return (
    <section className="shell pt-32 pb-24">
      <ToolHeader
        index="02"
        stage="Discover"
        title="Is the business ready?"
        text="Six questions on records, repetition, software, written steps, and who would own the first automation."
      />
      <ToolSwitcher current="readiness" />
      <ReadinessCheck />
    </section>
  );
}
