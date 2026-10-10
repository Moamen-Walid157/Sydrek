import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="font-mono text-[11px] tracking-[0.16em] text-[#22d3ee] uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl tracking-[-0.04em] md:text-7xl">This signal dropped.</h1>
      <p className="mt-4 max-w-md text-muted">The page is not on the lattice. Head back to the control room.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Return home
      </Link>
    </section>
  );
}
