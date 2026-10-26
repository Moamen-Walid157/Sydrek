import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import { socials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a Sydrek project. Tell us what has to stay standing.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact · Sydrek",
    description: "Start a Sydrek project. Tell us what has to stay standing.",
    url: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <section className="shell grid gap-12 pt-32 pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div>
        <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">Contact</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-0.045em] md:text-7xl">Start a project.</h1>
        <p className="mt-5 max-w-md text-muted">
          Tell us the website, CRM, ERP, dashboard, or app you need. We reply with a first slice — scope, sequence, and what we would watch on day one.
        </p>
        <dl className="mt-8 grid gap-4 text-sm">
          <div>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Phone</dt>
            <dd className="mt-1">
              <a
                href={socials.phone}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2563ff] dark:hover:text-[#22d3ee]"
              >
                {socials.phoneLabel}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">WhatsApp</dt>
            <dd className="mt-1">
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#2563ff] dark:hover:text-[#22d3ee]"
              >
                Chat on WhatsApp
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">First slice</dt>
            <dd className="mt-1 text-muted">Usually two to six weeks, depending on the product.</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Where</dt>
            <dd className="mt-1 text-muted">Remote-first. We overlap your hours.</dd>
          </div>
        </dl>
        <SocialLinks className="mt-8" />
      </div>
      <ContactForm />
    </section>
  );
}
