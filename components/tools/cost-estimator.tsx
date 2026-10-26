"use client";

import { useState } from "react";
import { ResultPanel } from "@/components/tools/result-panel";
import { Segmented } from "@/components/tools/segmented";
import {
  complexityOptions,
  estimateExtras,
  estimateProjects,
  estimateResult,
  integrationOptions,
  platformOptions,
  roleOptions,
  type Currency,
  type ExtraId,
  type ProjectId,
} from "@/lib/tools";
import { cn } from "@/lib/utils";

export function CostEstimator() {
  const [project, setProject] = useState<ProjectId>("website");
  const [extras, setExtras] = useState<ExtraId[]>([]);
  const [role, setRole] = useState<(typeof roleOptions)[number]["id"]>("team");
  const [integrations, setIntegrations] = useState<(typeof integrationOptions)[number]["id"]>("none");
  const [platform, setPlatform] = useState<(typeof platformOptions)[number]["id"]>("web");
  const [complexity, setComplexity] = useState<(typeof complexityOptions)[number]["id"]>("typical");
  const [currency, setCurrency] = useState<Currency>("USD");
  const result = estimateResult({ project, extras, role, integrations, platform, complexity, currency });

  return (
    <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
      <form className="glass grid gap-6 rounded-[28px] p-6 md:p-8" onSubmit={(event) => event.preventDefault()}>
        <Segmented
          label="Currency"
          value={currency}
          options={[
            { id: "USD", label: "USD" },
            { id: "EGP", label: "EGP" },
          ]}
          onChange={setCurrency}
        />
        <Segmented label="Project" value={project} options={estimateProjects} onChange={setProject} />
        <Segmented label="Who uses it" value={role} options={roleOptions} onChange={setRole} />
        <Segmented label="Integrations" value={integrations} options={integrationOptions} onChange={setIntegrations} />
        <Segmented label="Platform" value={platform} options={platformOptions} onChange={setPlatform} />
        <Segmented label="Complexity" value={complexity} options={complexityOptions} onChange={setComplexity} />
        <fieldset>
          <legend className="mb-2 text-sm">On the first release</legend>
          <div className="grid gap-2">
            {estimateExtras.map((extra) => {
              const checked = extras.includes(extra.id);
              return (
                <label
                  key={extra.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-2xl border border-line px-3 py-3 text-sm",
                    checked && "border-[#2563ff] bg-[#2563ff]/10",
                  )}
                >
                  <input
                    type="checkbox"
                    className="size-4 accent-[#2563ff]"
                    checked={checked}
                    onChange={() =>
                      setExtras((current) => (checked ? current.filter((id) => id !== extra.id) : [...current, extra.id]))
                    }
                  />
                  {extra.label}
                </label>
              );
            })}
          </div>
        </fieldset>
      </form>
      <div className="lg:sticky lg:top-28">
        <ResultPanel result={result} tool="estimate" empty="" />
      </div>
    </div>
  );
}
