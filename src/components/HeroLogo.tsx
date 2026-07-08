import { motion } from "framer-motion";

/**
 * Dynamic geometric core — a stack of counter-rotating polygonal rings
 * forming a gyroscope / sacred-geometry orb. Every ring spins on its
 * own axis, hues cycle with the global neon variables, and orbiting
 * particles trace elliptical paths around the core. No prism, no "H",
 * no circle-with-monogram cliché.
 */
export function HeroLogo() {
  const rings = [
    { sides: 3, r: 150, dur: 22, dir: 1, stroke: "var(--color-neon)", w: 1.6 },
    { sides: 4, r: 130, dur: 18, dir: -1, stroke: "var(--color-neon-2)", w: 1.4 },
    { sides: 5, r: 110, dur: 26, dir: 1, stroke: "var(--color-neon-3)", w: 1.4 },
    { sides: 6, r: 88, dur: 14, dir: -1, stroke: "var(--color-neon)", w: 1.2 },
    { sides: 8, r: 66, dur: 20, dir: 1, stroke: "var(--color-neon-2)", w: 1.2 },
    { sides: 12, r: 44, dur: 12, dir: -1, stroke: "var(--color-neon-3)", w: 1 },
  ];

  const polygonPoints = (sides: number, r: number) =>
    Array.from({ length: sides }, (_, i) => {
      const a = (i / sides) * Math.PI * 2 - Math.PI / 2;
      return `${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
    }).join(" ");

  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 gradient-blur opacity-40 scale-[0.7]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-neon) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 gradient-blur opacity-25 scale-[0.5]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-neon-3) 0%, transparent 60%)",
        }}
      />

      {/* Global gyroscopic tilt */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <motion.svg
          viewBox="-220 -220 440 440"
          className="w-full h-full max-w-[560px]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: [12, -12, 12], rotateY: [-18, 18, -18] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Rotating geometric core"
        >
          <defs>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-neon)" />
              <stop offset="50%" stopColor="var(--color-neon-2)" />
              <stop offset="100%" stopColor="var(--color-neon-3)" />
            </linearGradient>

            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-neon)" stopOpacity="0.6" />
              <stop offset="60%" stopColor="var(--color-neon-2)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-neon-3)" stopOpacity="0" />
            </radialGradient>

            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Core radial glow */}
          <circle cx="0" cy="0" r="80" fill="url(#coreGlow)">
            <animate attributeName="r" values="70;95;70" dur="5s" repeatCount="indefinite" />
          </circle>

          {/* Concentric rotating polygons */}
          {rings.map((ring, idx) => (
            <motion.g
              key={idx}
              animate={{ rotate: 360 * ring.dir }}
              transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "0px 0px" }}
              filter="url(#glow)"
            >
              <polygon
                points={polygonPoints(ring.sides, ring.r)}
                fill="none"
                stroke={ring.stroke}
                strokeWidth={ring.w}
                strokeLinejoin="round"
                opacity={0.75}
              />
              {/* Vertex dots */}
              {Array.from({ length: ring.sides }, (_, i) => {
                const a = (i / ring.sides) * Math.PI * 2 - Math.PI / 2;
                return (
                  <circle
                    key={i}
                    cx={Math.cos(a) * ring.r}
                    cy={Math.sin(a) * ring.r}
                    r={2}
                    fill={ring.stroke}
                  />
                );
              })}
            </motion.g>
          ))}

          {/* Diagonal cross beams pulsing */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0px 0px" }}
            opacity={0.5}
          >
            <line x1="-180" y1="0" x2="180" y2="0" stroke="url(#edgeGrad)" strokeWidth="0.8" strokeDasharray="2 8" />
            <line x1="0" y1="-180" x2="0" y2="180" stroke="url(#edgeGrad)" strokeWidth="0.8" strokeDasharray="2 8" />
          </motion.g>

          {/* Central pulsing nucleus */}
          <motion.circle
            cx="0"
            cy="0"
            r="10"
            fill="var(--color-neon)"
            filter="url(#glow)"
            animate={{ r: [6, 12, 6], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="0" cy="0" r="3" fill="white" opacity="0.9" />

          {/* Orbiting particles on elliptical paths */}
          {[
            { rx: 190, ry: 60, dur: 9, dir: 1, color: "var(--color-neon)" },
            { rx: 70, ry: 200, dur: 11, dir: -1, color: "var(--color-neon-2)" },
            { rx: 170, ry: 170, dur: 15, dir: 1, color: "var(--color-neon-3)" },
          ].map((o, i) => (
            <motion.g
              key={i}
              animate={{ rotate: 360 * o.dir }}
              transition={{ duration: o.dur, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <ellipse
                cx="0"
                cy="0"
                rx={o.rx}
                ry={o.ry}
                fill="none"
                stroke={o.color}
                strokeOpacity="0.18"
                strokeWidth="0.8"
                strokeDasharray="2 10"
              />
              <circle
                cx={o.rx}
                cy="0"
                r="4"
                fill={o.color}
                filter="url(#glow)"
              />
              <circle
                cx={-o.rx * 0.6}
                cy={o.ry * 0.5}
                r="2.5"
                fill={o.color}
                opacity="0.7"
              />
            </motion.g>
          ))}
        </motion.svg>
      </motion.div>
    </div>
  );
}
