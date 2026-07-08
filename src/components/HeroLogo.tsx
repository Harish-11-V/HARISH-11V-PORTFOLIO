import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

/**
 * Dynamic "matrix" style hero mark.
 * A rotating 3D wireframe cube built from orbiting rings + a live
 * matrix-rain grid inside a glowing core disc. Everything cycles with
 * the global neon hue variables so it looks alive in both themes.
 */

const CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>/{}#*+=$".split("");

function MatrixRain() {
  const cols = 14;
  const rows = 10;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 140);
    return () => clearInterval(id);
  }, []);

  const grid = useMemo(() => {
    return Array.from({ length: cols * rows }, (_, i) => ({
      ch: CHARS[Math.floor(Math.random() * CHARS.length)],
      // deterministic-ish shimmer based on index + tick
      lit: (i * 37 + tick * 11) % 9 === 0,
      dim: (i * 13 + tick * 7) % 5 === 0,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return (
    <div
      className="grid font-mono text-[10px] leading-[1.05] select-none"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        color: "var(--color-neon-2)",
      }}
      aria-hidden
    >
      {grid.map((c, i) => (
        <span
          key={i}
          style={{
            opacity: c.lit ? 1 : c.dim ? 0.15 : 0.45,
            color: c.lit ? "var(--color-neon)" : undefined,
            textShadow: c.lit ? "0 0 8px var(--color-neon)" : undefined,
            transition: "opacity 140ms linear",
          }}
        >
          {c.ch}
        </span>
      ))}
    </div>
  );
}

export function HeroLogo() {
  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full gradient-blur opacity-30 scale-[0.8]"
        style={{ background: "var(--color-neon)" }}
      />
      <div
        className="absolute inset-0 rounded-full gradient-blur opacity-20 scale-[0.55]"
        style={{ background: "var(--color-neon-3)" }}
      />

      {/* Rotating 3D wireframe cube (matrix feel) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: 900 }}
      >
        <motion.div
          className="relative"
          style={{ transformStyle: "preserve-3d", width: 280, height: 280 }}
          animate={{ rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 180] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[
            { t: "translateZ(140px)" },
            { t: "translateZ(-140px)" },
            { t: "rotateY(90deg) translateZ(140px)" },
            { t: "rotateY(-90deg) translateZ(140px)" },
            { t: "rotateX(90deg) translateZ(140px)" },
            { t: "rotateX(-90deg) translateZ(140px)" },
          ].map((f, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-md"
              style={{
                transform: f.t,
                border: "1px solid color-mix(in oklab, var(--color-neon) 55%, transparent)",
                boxShadow:
                  "inset 0 0 30px color-mix(in oklab, var(--color-neon-2) 30%, transparent), 0 0 20px color-mix(in oklab, var(--color-neon) 25%, transparent)",
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--color-neon) 6%, transparent), color-mix(in oklab, var(--color-neon-3) 4%, transparent))",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Counter-rotating orbit rings */}
      <svg
        viewBox="0 0 420 420"
        className="absolute inset-0 w-full h-full max-w-[520px] mx-auto pointer-events-none"
        aria-hidden
      >
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-neon)" />
            <stop offset="50%" stopColor="var(--color-neon-2)" />
            <stop offset="100%" stopColor="var(--color-neon-3)" />
          </linearGradient>
          <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "210px 210px" }}
        >
          <ellipse
            cx="210"
            cy="210"
            rx="190"
            ry="70"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1.2"
            opacity="0.6"
            strokeDasharray="4 10"
            filter="url(#ringGlow)"
          />
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "210px 210px" }}
        >
          <ellipse
            cx="210"
            cy="210"
            rx="70"
            ry="190"
            fill="none"
            stroke="var(--color-neon-2)"
            strokeWidth="1.2"
            opacity="0.5"
            strokeDasharray="6 14"
            filter="url(#ringGlow)"
          />
        </motion.g>
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "210px 210px" }}
        >
          <circle
            cx="210"
            cy="210"
            r="180"
            fill="none"
            stroke="var(--color-neon-3)"
            strokeWidth="1"
            opacity="0.35"
            strokeDasharray="2 12"
          />
        </motion.g>
      </svg>

      {/* Core matrix window with pulsing H monogram */}
      <div
        className="relative z-10 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          width: 210,
          height: 210,
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-background) 92%, transparent) 40%, color-mix(in oklab, var(--color-neon) 15%, transparent))",
          border: "1.5px solid color-mix(in oklab, var(--color-neon) 55%, transparent)",
          boxShadow:
            "0 0 60px color-mix(in oklab, var(--color-neon) 45%, transparent), inset 0 0 40px color-mix(in oklab, var(--color-neon-2) 25%, transparent)",
        }}
      >
        <div className="absolute inset-3 rounded-full overflow-hidden opacity-70">
          <MatrixRain />
        </div>

        {/* Scanline sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-neon) 35%, transparent) 50%, transparent 100%)",
            mixBlendMode: "screen",
            height: "40%",
          }}
          animate={{ y: ["-100%", "260%"] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
        />

        {/* H monogram */}
        <motion.svg
          viewBox="0 0 100 100"
          className="relative z-10 w-24 h-24 drop-shadow-[0_0_10px_var(--color-neon)]"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient id="hGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-neon)" />
              <stop offset="100%" stopColor="var(--color-neon-3)" />
            </linearGradient>
          </defs>
          <path
            d="M28 20 v60 M72 20 v60 M28 50 h44"
            fill="none"
            stroke="url(#hGrad)"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>

      {/* Orbiting nodes */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full"
          style={{
            background: "var(--color-neon)",
            boxShadow: "0 0 16px var(--color-neon)",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-2 w-2 h-2 rounded-full"
          style={{
            background: "var(--color-neon-3)",
            boxShadow: "0 0 12px var(--color-neon-3)",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 right-3 w-2.5 h-2.5 rounded-full"
          style={{
            background: "var(--color-neon-2)",
            boxShadow: "0 0 14px var(--color-neon-2)",
          }}
        />
      </motion.div>
    </div>
  );
}
