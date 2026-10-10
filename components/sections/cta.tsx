import Link from "next/link";

export function Cta() {
  return (
    <section className="shell pb-24">
      <div className="relative overflow-hidden rounded-[32px] border border-line px-6 py-16 md:px-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_0%_0%,rgba(37,99,255,0.35),transparent_60%),radial-gradient(40%_70%_at_100%_100%,rgba(34,211,238,0.25),transparent_60%)]" />
        <div className="relative max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">06 · Next</p>
          <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] md:text-6xl">Ship the next system.</h2>
          <p className="mt-4 max-w-lg text-muted">
            Tell us what has to stay standing. We&apos;ll answer with a first slice, not a slide deck.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Start a project
            </Link>
            <Link href="/work" className="btn btn-ghost">
              View the frames
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
