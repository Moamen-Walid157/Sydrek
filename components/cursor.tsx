"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 180, damping: 26, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [on, setOn] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setHidden(false);
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, input, textarea, select, [data-cursor], [role='slider']");
      const typing = target?.closest("input, textarea, select");
      setHover(Boolean(interactive) && !typing);
    };
    const leave = () => setHidden(true);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!on) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hover ? 0.45 : 1, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hover ? 1.75 : 1, opacity: hidden ? 0 : 0.9 }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
