"use client";

import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { ResultPanel } from "@/components/tools/result-panel";
import { Segmented } from "@/components/tools/segmented";
import { PLANNING_EGP_PER_USD, roiResult, type Currency } from "@/lib/tools";

const currencies = [
  { id: "USD" as const, label: "USD" },
  { id: "EGP" as const, label: "EGP" },
];

export function RoiCalculator() {
  const [people, setPeople] = useState(4);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);
  const [hourly, setHourly] = useState(25);
  const [automation, setAutomation] = useState(40);
  const [currency, setCurrency] = useState<Currency>("USD");
  const result = roiResult({ people, hoursPerWeek, hourly, automation, currency });

  return (
    <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
      <form className="glass grid gap-5 rounded-[28px] p-6 md:p-8" onSubmit={(event) => event.preventDefault()}>
        <Segmented
          label="Currency"
          value={currency}
          options={currencies}
          onChange={(next) => {
            if (next === currency) return;
            setHourly((current) =>
              next === "EGP" ? Math.round(current * PLANNING_EGP_PER_USD) : Math.max(1, Math.round(current / PLANNING_EGP_PER_USD)),
            );
            setCurrency(next);
          }}
        />
        <p className="-mt-2 text-xs text-muted">Switching currency converts the hourly cost at {PLANNING_EGP_PER_USD} EGP per USD.</p>
        <NumberField label="People doing the task" value={people} min={1} max={500} step={1} onChange={setPeople} />
        <NumberField label="Hours each person spends per week" value={hoursPerWeek} min={0.5} max={80} step={0.5} onChange={setHoursPerWeek} />
        <NumberField label="Average hourly cost" value={hourly} min={1} max={100000} step={1} onChange={setHourly} suffix={currency} />
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Share automation might take</span>
            <span className="font-mono text-muted">{automation}%</span>
          </div>
          <Slider.Root
            className="relative flex h-6 touch-none items-center select-none"
            min={10}
            max={80}
            step={5}
            value={[automation]}
            onValueChange={([value]) => setAutomation(value)}
          >
            <Slider.Track className="relative h-1.5 grow rounded-full bg-black/10 dark:bg-white/10">
              <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-[#2563ff] to-[#22d3ee]" />
            </Slider.Track>
            <Slider.Thumb aria-label="Automation percentage" className="block size-[18px] rounded-full bg-white shadow-[0_0_0_6px_rgba(37,99,255,0.35)]" />
          </Slider.Root>
        </div>
      </form>
      <div className="lg:sticky lg:top-28">
        <ResultPanel result={result} tool="roi" empty="Add the people, the hours, and the hourly cost. The monthly figure updates here." />
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="flex items-center justify-between gap-3">
        {label}
        {suffix && <span className="font-mono text-xs text-muted">{suffix}</span>}
      </span>
      <input
        className="field"
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={Number.isNaN(value) ? "" : value}
        onChange={(event) => onChange(event.target.value === "" ? 0 : Number(event.target.value))}
      />
    </label>
  );
}
