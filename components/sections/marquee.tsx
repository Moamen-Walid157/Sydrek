import { Activity, Cloud, Database, Layers, Rocket, ShieldCheck } from "lucide-react";

const items = [
  { icon: Layers, label: "Platforms" },
  { icon: Cloud, label: "Cloud" },
  { icon: ShieldCheck, label: "Security" },
  { icon: Database, label: "Data" },
  { icon: Activity, label: "Observability" },
  { icon: Rocket, label: "Launch" },
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-4" aria-hidden>
      <div className="marquee-track items-center">
        {row.map((item, index) => (
          <span key={`${item.label}-${index}`} className="flex items-center gap-3 font-display text-lg tracking-[-0.03em] text-muted">
            <item.icon size={16} strokeWidth={1.5} className="text-[#2563ff] dark:text-[#22d3ee]" />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
