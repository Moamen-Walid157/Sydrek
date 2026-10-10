import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a Sydrek project. Tell us what has to stay standing.",
};

export default function ContactPage() {
  return (
    <section className="shell grid gap-12 pt-32 pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div>
        <p className="font-mono text-[11px] tracking-[0.16em] text-[#2563ff] uppercase dark:text-[#22d3ee]">Contact</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-0.045em] md:text-7xl">Start a project.</h1>
        <p className="mt-5 max-w-md text-muted">
          A name, a system, and the part that cannot fail. We reply with a first slice — scope, sequence, and what we would watch on day one.
        </p>
        <dl className="mt-8 grid gap-4 text-sm">
          <div>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Email</dt>
            <dd className="mt-1">
              <a href="mailto:hello@sydrek.com" className="hover:text-[#2563ff] dark:hover:text-[#22d3ee]">
                hello@sydrek.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">First slice</dt>
            <dd className="mt-1 text-muted">Usually two to six weeks, depending on the estate.</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Where</dt>
            <dd className="mt-1 text-muted">Remote-first. The control room travels.</dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </section>
  );
}
