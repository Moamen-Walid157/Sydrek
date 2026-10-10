"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import { cn, ease } from "@/lib/utils";
import { Mark } from "@/components/mark";
import { ThemeSwitch } from "@/components/theme-switch";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const overHero = !scrolled && pathname === "/";

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 28);
      if (y < 80) setHidden(false);
      else if (y > last + 6) setHidden(true);
      else if (y < last - 6) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const nodes = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: 0 },
    );
    nodes.forEach((node) => spy.observe(node));
    return () => spy.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const lenis = window.__sydrekLenis;
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={cn("fixed inset-x-0 top-0 z-[80] flex justify-center px-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-0", hidden && !open && "-translate-y-[140%]")}>
      <header
        className={cn(
          "mt-0 flex h-20 w-full items-center justify-between gap-4 border-b border-white/10 bg-[#070b1a]/50 px-4 text-white backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-8",
          !overHero && "glass mt-0 h-20 w-full border-line text-fg",
          scrolled && "glass mt-3 h-14 w-[min(1080px,calc(100%-0.5rem))] rounded-2xl border-line px-3 text-fg md:px-4",
        )}
      >
        <Link href="/#top" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-[-0.03em]">
          <Mark size={scrolled ? 32 : 40} />
          SYDREK
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                overHero ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-muted hover:bg-white/10 hover:text-fg",
                pathname === "/" && active === link.id && (overHero ? "bg-white/10 text-white" : "bg-white/10 text-fg"),
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <Link href="/contact" className="btn btn-primary max-sm:hidden!">
            Start a project
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-line lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="glass fixed inset-3 top-[4.5rem] z-[70] flex flex-col justify-between rounded-3xl p-6 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4, ease }}
                >
                  <Link href={link.href} className="block font-display text-4xl tracking-[-0.04em]" onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
              Start a project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
