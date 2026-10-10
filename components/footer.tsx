import Link from "next/link";
import { navLinks } from "@/lib/content";
import { Mark } from "@/components/mark";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/#top" className="flex items-center gap-3 font-display text-2xl font-bold tracking-[-0.04em]">
            <Mark size={48} />
            SYDREK
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Software solutions, engineered for what&apos;s next. Precision infrastructure for teams who trust depth.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Explore</p>
            <ul className="mt-4 grid gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="text-muted hover:text-fg">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/work" className="text-muted hover:text-fg">
                  Selected work
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Services</p>
            <ul className="mt-4 grid gap-2 text-sm text-muted">
              <li>Product platforms</li>
              <li>Cloud & scale</li>
              <li>Security</li>
              <li>Data systems</li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Contact</p>
            <ul className="mt-4 grid gap-2 text-sm">
              <li>
                <a href="mailto:hello@sydrek.com" className="text-muted hover:text-fg">
                  hello@sydrek.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-muted hover:text-fg">
                  Start a project
                </Link>
              </li>
              <li className="text-muted">Remote-first</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-5 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
          <span>© 2026 Sydrek</span>
          <span className="flex gap-4">
            <a href="/brand-lab/index.html">Brand lab</a>
            <Link href="/contact">Contact</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
