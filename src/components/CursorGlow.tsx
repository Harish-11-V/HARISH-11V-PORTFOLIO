import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        width: 400,
        height: 400,
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--color-neon) 35%, transparent), transparent 60%)",
      }}
      className="pointer-events-none fixed top-0 left-0 -z-10 rounded-full blur-3xl mix-blend-screen hidden md:block"
    />
  );
}
