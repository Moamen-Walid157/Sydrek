"use client";

import { useEffect } from "react";

const HOLD_MS = 2800;
const EXIT_MS = 1080;
const REDUCE_HOLD_MS = 360;
const REDUCE_EXIT_MS = 280;

declare global {
  interface Window {
    __sydrekBoot?: number;
  }
}

export function Loader() {
  useEffect(() => {
    const boot = document.getElementById("boot");
    if (!boot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? REDUCE_HOLD_MS : HOLD_MS;
    const exit = reduce ? REDUCE_EXIT_MS : EXIT_MS;
    const started = window.__sydrekBoot ?? performance.now();
    let stoppedLenis = false;

    const haltScroll = () => {
      const lenis = window.__sydrekLenis;
      if (!lenis || stoppedLenis) return;
      lenis.stop();
      stoppedLenis = true;
    };

    document.documentElement.classList.add("is-loading");
    haltScroll();
    const poll = window.setInterval(haltScroll, 150);

    const elapsed = () => performance.now() - started;
    const leaveDelay = Math.max(0, hold - elapsed());

    const leaveAt = window.setTimeout(() => {
      boot.classList.add("is-leave");
      boot.setAttribute("aria-busy", "false");
    }, leaveDelay);

    const removeAt = window.setTimeout(() => {
      boot.remove();
      document.documentElement.classList.remove("is-loading");
      if (stoppedLenis) window.__sydrekLenis?.start();
    }, leaveDelay + exit);

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(leaveAt);
      window.clearTimeout(removeAt);
    };
  }, []);

  return null;
}
