import Link from "next/link";
import { engagements } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

export function Engagement() {
  return (
    <section id="engage" className="shell py-20 md:py-28">
      <SectionHeading
        index="08 · Engagement"
        title="Three ways to start."
        text="A landing page, a full system, or a partnership after launch. Sized to the website, CRM, ERP, or app you actually need."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {engagements.map((item) => (
          <article
            key={item.name}
            className={cn(
              "relative flex flex-col rounded-[28px] p-6 md:p-8",
              "featured" in item && item.featured
                ? "border border-transparent bg-[linear-gradient(160deg,rgba(37,99,255,0.16),rgba(34,211,238,0.08))] shadow-[inset_0_0_0_1px_rgba(34,211,238,0.45)]"
                : "glass",
            )}
          >
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">{item.time}</p>
            <h3 className="mt-3 font-display text-3xl tracking-[-0.04em]">{item.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            <ul className="mt-6 grid flex-1 gap-2 text-sm">
              {item.items.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[#22d3ee]">▹</span>
                  {line}
                </li>
              ))}
            </ul>
            <Link href="/contact" className={cn("btn mt-8", "featured" in item && item.featured ? "btn-primary" : "btn-ghost")}>
              Talk through it
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
