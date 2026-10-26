import Link from "next/link";
import { toolCatalog, type ToolSlug } from "@/lib/tools";
import { cn } from "@/lib/utils";

export function ToolSwitcher({ current }: { current: ToolSlug }) {
  const category = toolCatalog.find((tool) => tool.slug === current)?.category;
  const tools = toolCatalog.filter((tool) => tool.category === category);

  return (
    <nav className="mt-8 flex flex-wrap gap-2" aria-label="Tools">
      {tools.map((tool) => {
        const active = tool.slug === current;
        return (
          <Link
            key={tool.slug}
            href={tool.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full border border-line px-3 py-1.5 text-sm text-muted",
              active && "border-transparent bg-gradient-to-r from-[#2563ff] to-[#22d3ee] text-white",
            )}
          >
            {tool.short}
          </Link>
        );
      })}
    </nav>
  );
}
