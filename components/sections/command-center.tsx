"use client";

import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { z } from "zod";
import { logs, periods, team, type PeriodId } from "@/lib/content";
import { cn, ease } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";

const emailSchema = z.string().email();
const radius = 54;
const circumference = 2 * Math.PI * radius;

const eventDays = new Set([3, 8, 14, 22]);
const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
const october = [null, null, null, ...Array.from({ length: 31 }, (_, index) => index + 1)];

export function CommandCenter() {
  const [periodId, setPeriodId] = useState<PeriodId>("today");
  const [scale, setScale] = useState(60);
  const [alerts, setAlerts] = useState(true);
  const [digest, setDigest] = useState(false);
  const [day, setDay] = useState(10);
  const [invite, setInvite] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [open, setOpen] = useState(false);

  const period = periods.find((item) => item.id === periodId) ?? periods[0];
  const dash = useMemo(() => circumference * (1 - period.health / 100), [period.health]);

  const lock = (next: boolean) => {
    setOpen(next);
    const lenis = window.__sydrekLenis;
    if (next) lenis?.stop();
    else lenis?.start();
  };

  const sendInvite = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = emailSchema.safeParse(invite.trim());
    if (!parsed.success) {
      toast.error("Enter a valid email to invite.");
      return;
    }
    toast.success(`Invite sent to ${parsed.data}`);
    setInvite("");
  };

  return (
    <section id="platform" className="shell py-20 md:py-28">
      <SectionHeading
        index="01 · Platform"
        title="The control room, in glass."
        text="A live reading of the estate: health, revenue, the threshold you are willing to scale to, and the people who can change it."
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 0.9, ease }}
        className="glass rounded-[28px] p-3 md:p-4"
      >
        <div className="grid gap-3 lg:grid-cols-12">
          <article className="glass-strong relative overflow-hidden rounded-[22px] p-5 lg:col-span-4">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_30%,rgba(37,99,255,0.28),transparent_70%)]" />
            <p className="relative font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Deployment health</p>
            <div className="relative mx-auto mt-6 grid size-40 place-items-center">
              <svg viewBox="0 0 140 140" className="absolute inset-0 size-full -rotate-90">
                <defs>
                  <linearGradient id="health-ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2563ff" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <circle cx="70" cy="70" r={radius} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="10" />
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="url(#health-ring)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dash}
                  className="transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </svg>
              <span className="font-display text-4xl tracking-[-0.04em]">
                <NumberFlow value={period.health} suffix="%" />
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={period.caption}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="relative mt-4 text-center text-sm text-muted"
              >
                {period.caption}
              </motion.p>
            </AnimatePresence>
          </article>

          <article className="glass-strong rounded-[22px] p-5 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Overview</p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex rounded-full border border-line bg-black/5 p-1 dark:bg-white/5" role="tablist" aria-label="Overview range">
                  {periods.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={periodId === item.id}
                      onClick={() => setPeriodId(item.id)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm text-muted transition-all",
                        periodId === item.id && "bg-gradient-to-r from-[#2563ff] to-[#22d3ee] text-white shadow",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <button type="button" className="btn btn-ghost !px-3 !py-2" onClick={() => toast.success("Export queued — today's overview.")}>
                  Export
                </button>
                <button type="button" className="btn btn-primary !px-3 !py-2" onClick={() => lock(true)}>
                  New workspace
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {period.metrics.map((metric) => (
                <div key={metric.name} className="rounded-2xl border border-line bg-white/40 p-4 dark:bg-white/5">
                  <p className="text-sm text-muted">{metric.name}</p>
                  <p className="mt-2 font-display text-3xl tracking-[-0.04em] tabular-nums">
                    <NumberFlow
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      format={{
                        minimumFractionDigits: metric.digits ?? 0,
                        maximumFractionDigits: metric.digits ?? 0,
                        useGrouping: true,
                      }}
                    />
                  </p>
                  <p className={cn("mt-1 text-xs font-semibold", metric.tone === "good" ? "text-good" : "text-bad")}>{metric.delta}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-strong rounded-[22px] p-5 lg:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Calendar · October</p>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
              {weekdays.map((label, index) => (
                <span key={`${label}-${index}`} className="pb-1 font-mono text-[10px] tracking-wider text-muted">
                  {label}
                </span>
              ))}
              {october.map((date, index) =>
                date ? (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setDay(date)}
                    className={cn(
                      "relative rounded-lg py-1.5 text-muted transition-colors hover:bg-white/10",
                      day === date && "bg-gradient-to-r from-[#2563ff] to-[#22d3ee] font-semibold text-white",
                    )}
                  >
                    {date}
                    {eventDays.has(date) && (
                      <span className={cn("absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full", day === date ? "bg-white" : "bg-[#fb7185]")} />
                    )}
                  </button>
                ) : (
                  <span key={`empty-${index}`} />
                ),
              )}
            </div>
            <p className="mt-3 text-xs text-muted">
              {eventDays.has(day) ? `${day} Oct — deployment window` : `${day} Oct — clear day`}
            </p>
          </article>

          <article className="glass-strong rounded-[22px] p-5 lg:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Controls</p>
            <div className="mt-5">
              <div className="mb-3 flex justify-between text-sm text-muted">
                <span>Auto-scale threshold</span>
                <span className="tabular-nums text-fg">{scale}%</span>
              </div>
              <Slider.Root
                className="relative flex h-6 touch-none items-center select-none"
                value={[scale]}
                max={100}
                step={1}
                onValueChange={([value]) => setScale(value)}
                >
                <Slider.Track className="relative h-1.5 grow rounded-full bg-black/10 dark:bg-white/10">
                  <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-[#2563ff] to-[#22d3ee]" />
                </Slider.Track>
                <Slider.Thumb
                  aria-label="Auto-scale threshold"
                  className="block size-[18px] rounded-full bg-white shadow-[0_0_0_6px_rgba(37,99,255,0.35)] focus-visible:outline-none"
                />
              </Slider.Root>
            </div>
            <ToggleRow label="Smart alerts" checked={alerts} onChange={setAlerts} />
            <ToggleRow label="Weekly digest" checked={digest} onChange={setDigest} />
          </article>

          <article className="glass-strong relative overflow-hidden rounded-[22px] p-5 lg:col-span-4">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_100%_0%,rgba(34,211,238,0.2),transparent_60%)]" />
            <p className="relative font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Team</p>
            <ul className="relative mt-4 grid gap-3">
              {team.map((member) => (
                <li key={member.name} className="flex items-center gap-3">
                  <span
                    className="grid size-9 place-items-center rounded-full text-[11px] font-bold"
                    style={{ background: member.bg, color: member.fg }}
                  >
                    {member.initials}
                  </span>
                  <span className="text-sm">{member.name}</span>
                  <span className="ml-auto font-mono text-[11px] tracking-[0.12em] text-muted uppercase">{member.role}</span>
                </li>
              ))}
            </ul>
            <form onSubmit={sendInvite} className="relative mt-4 flex gap-2">
              <input
                className="field"
                placeholder="Invite by email…"
                aria-label="Invite by email"
                value={invite}
                onChange={(event) => setInvite(event.target.value)}
              />
              <button type="submit" className="btn btn-primary !px-3">
                Send
              </button>
            </form>
          </article>
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-[#050816]/90 px-4 py-3 font-mono text-[12px] text-[#8a94b8]">
          <div className="marquee-track">
            {[...logs, ...logs].map((line, index) => (
              <span key={`${line}-${index}`} className="whitespace-nowrap">
                {line}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <Dialog.Root open={open} onOpenChange={lock}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-[#070b1a]/70 backdrop-blur-sm" />
          <Dialog.Content className="glass-strong fixed top-1/2 left-1/2 z-[100] w-[min(440px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-6">
            <Dialog.Title className="font-display text-2xl tracking-[-0.03em]">New workspace</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-muted">
              Name the room. We&apos;ll stage it against the current estate.
            </Dialog.Description>
            <form
              className="mt-5 grid gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (workspace.trim().length < 2) {
                  toast.error("Give the workspace a name.");
                  return;
                }
                toast.success(`${workspace.trim()} is staged.`);
                setWorkspace("");
                lock(false);
              }}
            >
              <label className="grid gap-1.5 text-sm">
                Workspace name
                <input className="field" value={workspace} onChange={(event) => setWorkspace(event.target.value)} placeholder="eu-core" />
              </label>
              <div className="mt-2 flex justify-end gap-2">
                <Dialog.Close type="button" className="btn btn-ghost">
                  Cancel
                </Dialog.Close>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="mt-5 flex items-center justify-between text-sm">
      <span>{label}</span>
      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        aria-label={label}
        className="relative h-6 w-11 rounded-full bg-black/10 transition-colors data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#2563ff] data-[state=checked]:to-[#22d3ee] dark:bg-white/15"
      >
        <Switch.Thumb className="block size-[18px] translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[22px]" />
      </Switch.Root>
    </div>
  );
}
