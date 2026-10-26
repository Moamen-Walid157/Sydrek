import type { Metadata } from "next";
import { CrmCheck } from "@/components/tools/crm-check";
import { ToolHeader } from "@/components/tools/tool-header";
import { ToolSwitcher } from "@/components/tools/tool-switcher";

export const metadata: Metadata = {
  title: "CRM health",
  description: "Check how leads arrive, who owns them, how follow-up works, and what the team can see each week.",
  alternates: { canonical: "/tools/crm/" },
  openGraph: {
    title: "CRM health · Sydrek",
    description: "A sales-process score and the follow-ups that go quiet.",
    url: "/tools/crm/",
  },
};

export default function CrmPage() {
  return (
    <section className="shell pt-32 pb-24">
      <ToolHeader
        index="03"
        stage="Discover"
        title="Where do leads go quiet?"
        text="Five questions on arrival, ownership, follow-up, deals, and the weekly view. The result names the workflows to add."
      />
      <ToolSwitcher current="crm" />
      <CrmCheck />
    </section>
  );
}
