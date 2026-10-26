"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { socials } from "@/lib/content";
import { ease } from "@/lib/utils";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          data-cursor
          className="whatsapp-float"
          initial={{ opacity: 0, y: 28, scale: 0.84 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.9 }}
          transition={{ duration: 0.45, ease }}
        >
          <span className="whatsapp-float-ring" aria-hidden />
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden>
            <path d="M12.04 3.2A8.8 8.8 0 0 0 3.9 16.3L3 21l4.8-.9A8.8 8.8 0 1 0 12.04 3.2zm5.1 12.5c-.22.62-1.28 1.18-1.78 1.26-.46.07-1.04.1-1.68-.1-.39-.13-.88-.3-1.52-.58-2.67-1.16-4.4-3.85-4.54-4.03-.13-.18-1.1-1.46-1.1-2.78 0-1.32.69-1.97.93-2.24.24-.27.53-.34.7-.34h.51c.16 0 .38-.06.6.46.22.54.75 1.85.82 1.98.07.13.1.29.02.46-.08.18-.13.29-.25.45-.13.16-.27.35-.38.47-.13.13-.26.27-.11.53.16.27.7 1.15 1.5 1.86 1.04.92 1.91 1.2 2.18 1.34.27.13.43.11.59-.07.16-.18.68-.8.86-1.07.18-.27.36-.22.6-.13.24.08 1.53.72 1.79.85.26.13.44.2.5.31.07.11.07.64-.15 1.26z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
