import type { Metadata } from "next";
import { CostEstimator } from "@/components/tools/cost-estimator";
import { ToolHeader } from "@/components/tools/tool-header";
import { ToolSwitcher } from "@/components/tools/tool-switcher";

export const metadata: Metadata = {
  title: "Project estimate",
  description: "A preliminary budget range and timeline for a website, CRM, ERP, dashboard, automation, or app. Not a binding quotation.",
  alternates: { canonical: "/tools/estimate/" },
  openGraph: {
    title: "Project estimate · Sydrek",
    description: "A planning range for budget and timeline. Not a quotation.",
    url: "/tools/estimate/",
  },
};

export default function EstimatePage() {
  return (
    <section className="shell pt-32 pb-24">
      <ToolHeader
        index="04"
        stage="Understand"
        title="What does the build look like?"
        text="Choose the product, the people, and the integrations. You get a wide range and a first step. Sydrek confirms scope before any price is binding."
      />
      <ToolSwitcher current="estimate" />
      <CostEstimator />
    </section>
  );
}
