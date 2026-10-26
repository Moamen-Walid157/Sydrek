import Link from "next/link";
import { navLinks, services, socials } from "@/lib/content";
import { Mark } from "@/components/mark";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/#top" className="flex items-center gap-3 font-display text-2xl font-bold tracking-[-0.04em]">
            <Mark size={48} />
            sydrek
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Websites, CRMs, ERPs, dashboards, and mobile apps — engineered for what&apos;s next.
          </p>
          <SocialLinks className="mt-6" />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Explore</p>
            <ul className="mt-4 grid gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
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
              {services.map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Contact</p>
            <ul className="mt-4 grid gap-2 text-sm">
              <li>
                <a
                  href={socials.phone}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg"
                >
                  {socials.phoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg"
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-muted hover:text-fg">
                  Start a project
                </Link>
              </li>
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
