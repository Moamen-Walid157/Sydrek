"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = mounted ? resolvedTheme !== "light" : true;

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="relative h-8 w-14 shrink-0 rounded-full border border-line bg-white/40 dark:bg-white/5"
    >
      <span
        className={`absolute top-0.5 flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-[#2563ff] to-[#22d3ee] text-white shadow-[0_0_18px_rgba(34,211,238,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          dark ? "translate-x-6" : "translate-x-0.5"
        }`}
      >
        {dark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
    </button>
  );
}
