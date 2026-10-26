import {
  Files,
  Globe,
  GraduationCap,
  LayoutDashboard,
  PanelsTopLeft,
  Plus,
  Search,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

const items = [
  { icon: Globe, label: "Websites" },
  { icon: PanelsTopLeft, label: "Landing pages" },
  { icon: Users, label: "CRM" },
  { icon: Workflow, label: "ERP" },
  { icon: LayoutDashboard, label: "Dashboards" },
  { icon: Search, label: "SEO / GEO" },
  { icon: Sparkles, label: "AI / Automation" },
  { icon: GraduationCap, label: "LMS" },
  { icon: Files, label: "CMS" },
  { icon: Smartphone, label: "Mobile apps" },
  { icon: Plus, label: "+ 50 more" },
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
