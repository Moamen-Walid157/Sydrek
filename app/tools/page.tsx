import type { Metadata } from "next";
import Link from "next/link";
import { toolCatalog, toolCategories } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free tools",
  description:
    "Free Sydrek tools: planning calculators for ROI, AI readiness, CRM health, and project cost, plus design tools such as background removal.",
  alternates: { canonical: "/tools/" },
  openGraph: {
    title: "Free tools · Sydrek",
    description: "Planning figures for the conversation, and design tools that stay on this device.",
    url: "/tools/",
  },
};

const steps = [
  { index: "01", title: "Discover", text: "Score AI readiness or the sales process." },
  { index: "02", title: "Understand", text: "See the savings, or a budget and timeline range." },
  { index: "03", title: "Act", text: "Leave with a checklist from your own answers." },
  { index: "04", title: "Implement", text: "Send the result. Sydrek replies with a first slice." },
];

export default function ToolsPage() {
  return (
    <section className="shell pt-32 pb-24">
      <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">Free tools</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-[-0.045em] md:text-7xl">See the work before the project.</h1>
      <p className="mt-5 max-w-xl text-muted">Planning figures for the conversation, and design tools that run on this device.</p>

      {toolCategories.map((category) => {
        const tools = toolCatalog.filter((tool) => tool.category === category.id);
        return (
          <div key={category.id} className="mt-14">
            <h2 className="font-display text-3xl tracking-[-0.04em] md:text-4xl">{category.title}</h2>
            <p className="mt-3 max-w-xl text-muted">{category.text}</p>
            {category.id === "planning" && (
              <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step) => (
                  <li key={step.index} className="rounded-2xl border border-line px-4 py-4">
                    <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">{step.index}</p>
                    <p className="mt-2 font-display text-xl tracking-[-0.03em]">{step.title}</p>
                    <p className="mt-1 text-sm text-muted">{step.text}</p>
                  </li>
                ))}
              </ol>
            )}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {tools.map((tool) => (
                <Link key={tool.slug} href={tool.href} className="glass block rounded-[28px] p-6 transition-transform hover:-translate-y-0.5 md:p-8">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                    {tool.index} · {tool.stage}
                  </p>
                  <h3 className="mt-3 font-display text-3xl tracking-[-0.04em]">{tool.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{tool.text}</p>
                  <span className="mt-6 inline-block text-sm font-semibold">Open the tool</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
