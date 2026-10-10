"use client";

import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import "lenis/dist/lenis.css";
import "sonner/dist/styles.css";

function ToastHost() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      theme={resolvedTheme === "light" ? "light" : "dark"}
      position="bottom-center"
      toastOptions={{
        style: {
          background: "var(--glass)",
          color: "var(--fg)",
          border: "1px solid var(--line)",
          backdropFilter: "blur(18px)",
          borderRadius: "999px",
        },
      }}
    />
  );
}

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      window.__sydrekLenis = lenis;
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        delete window.__sydrekLenis;
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return children;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="sydrek-theme">
      <SmoothScroll>
        {children}
        <ToastHost />
      </SmoothScroll>
    </ThemeProvider>
  );
}
