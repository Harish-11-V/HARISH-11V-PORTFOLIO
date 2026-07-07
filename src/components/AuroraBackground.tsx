import { motion } from "framer-motion";

/**
 * Global aesthetic background stack:
 *  - Animated conic aurora that cycles with neon hues
 *  - Soft grid overlay for depth
 *  - Subtle noise film to kill banding
 *  - Slow drifting orbs
 * All layers live at -z so page content stays on top.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
      {/* Conic aurora */}
      <motion.div
        className="absolute -inset-[20%] opacity-70 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, color-mix(in oklab, var(--color-neon) 55%, transparent), transparent 25%, color-mix(in oklab, var(--color-neon-2) 55%, transparent) 45%, transparent 65%, color-mix(in oklab, var(--color-neon-3) 55%, transparent) 85%, transparent 100%)",
          filter: "blur(90px) saturate(1.4)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Secondary counter-rotating aurora */}
      <motion.div
        className="absolute -inset-[10%] opacity-40 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 180deg at 30% 70%, transparent, color-mix(in oklab, var(--color-neon-3) 60%, transparent) 30%, transparent 60%, color-mix(in oklab, var(--color-neon) 60%, transparent) 90%, transparent)",
          filter: "blur(120px)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--color-foreground) 60%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-foreground) 60%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
        }}
      />

      {/* Scanline sweep */}
      <motion.div
        className="absolute inset-x-0 h-[40vh] opacity-20 mix-blend-screen"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in oklab, var(--color-neon-2) 40%, transparent), transparent)",
          filter: "blur(30px)",
        }}
        animate={{ y: ["-40vh", "120vh"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise film */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />
    </div>
  );
}

/** Per-section decorative glow: drop inside any section to add a matching accent. */
export function SectionGlow({
  variant = "primary",
  className = "",
}: {
  variant?: "primary" | "accent" | "tri";
  className?: string;
}) {
  const bg =
    variant === "accent"
      ? "radial-gradient(closest-side, color-mix(in oklab, var(--color-neon-2) 55%, transparent), transparent 70%)"
      : variant === "tri"
      ? "conic-gradient(from 90deg, color-mix(in oklab, var(--color-neon) 40%, transparent), color-mix(in oklab, var(--color-neon-2) 40%, transparent), color-mix(in oklab, var(--color-neon-3) 40%, transparent), color-mix(in oklab, var(--color-neon) 40%, transparent))"
      : "radial-gradient(closest-side, color-mix(in oklab, var(--color-neon) 55%, transparent), transparent 70%)";

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-60 mix-blend-screen ${className}`}
      style={{ background: bg }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
