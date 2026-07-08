import { motion } from "framer-motion";

/**
 * Prism hero mark — a rotating triangular prism refracting a white
 * beam of light into a full rainbow spectrum. Inspired by the classic
 * "Dark Side of the Moon" dispersion visual, made dynamic with a
 * slow orbital rotation, animated beam, and shimmering spectrum fan.
 */
export function HeroLogo() {
  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center overflow-hidden">
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 rounded-full gradient-blur opacity-30 scale-[0.85]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-neon) 0%, transparent 60%)",
        }}
      />

      {/* Rotating prism + spectrum system */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="-300 -300 600 600"
          className="w-full h-full max-w-[560px] drop-shadow-2xl"
          aria-label="Prism refracting light into a spectrum"
        >
          <defs>
            <linearGradient id="spectrum" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff2d55" />
              <stop offset="18%" stopColor="#ff9500" />
              <stop offset="34%" stopColor="#ffd60a" />
              <stop offset="52%" stopColor="#34c759" />
              <stop offset="70%" stopColor="#00c7ff" />
              <stop offset="86%" stopColor="#5e5ce6" />
              <stop offset="100%" stopColor="#bf5af2" />
            </linearGradient>

            <linearGradient id="whiteBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="60%" stopColor="white" stopOpacity="0.85" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.18" />
              <stop offset="50%" stopColor="var(--color-neon-2)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="white" stopOpacity="0.05" />
            </linearGradient>

            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="beamGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            <mask id="fanMask">
              <rect x="-300" y="-300" width="600" height="600" fill="black" />
              <polygon points="0,0 320,-140 320,220" fill="white" />
            </mask>
          </defs>

          {/* Orbit rings */}
          <circle cx="0" cy="0" r="260" fill="none" stroke="url(#spectrum)" strokeWidth="1" opacity="0.35" strokeDasharray="4 14" />
          <circle cx="0" cy="0" r="220" fill="none" stroke="var(--color-neon-2)" strokeWidth="1" opacity="0.25" strokeDasharray="2 10" />

          {/* Rainbow spectrum fan */}
          <g mask="url(#fanMask)" filter="url(#softGlow)">
            <motion.rect
              x="0"
              y="-160"
              width="320"
              height="320"
              fill="url(#spectrum)"
              opacity="0.85"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {[-120, -80, -40, 0, 40, 80, 120].map((y, i) => (
              <motion.line
                key={y}
                x1="0"
                y1="0"
                x2="320"
                y2={y}
                stroke="white"
                strokeWidth="1"
                opacity="0.35"
                animate={{ opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
              />
            ))}
          </g>

          {/* Incoming white beam */}
          <g filter="url(#beamGlow)">
            <motion.rect
              x="-320"
              y="-3"
              width="320"
              height="6"
              fill="url(#whiteBeam)"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
          <line x1="-320" y1="0" x2="0" y2="0" stroke="white" strokeWidth="1.5" opacity="0.95" />

          {/* Prism */}
          <motion.g
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <polygon
              points="0,-110 95,55 -95,55"
              fill="url(#glass)"
              stroke="white"
              strokeOpacity="0.85"
              strokeWidth="2"
              strokeLinejoin="round"
              filter="url(#softGlow)"
            />
            <polyline points="0,-110 95,55" fill="none" stroke="var(--color-neon)" strokeOpacity="0.55" strokeWidth="1.2" />
            <polyline points="0,-110 -95,55" fill="none" stroke="var(--color-neon-3)" strokeOpacity="0.55" strokeWidth="1.2" />
            <polyline points="-95,55 95,55" fill="none" stroke="var(--color-neon-2)" strokeOpacity="0.5" strokeWidth="1.2" />
          </motion.g>

          {/* Refraction hit-point */}
          <motion.circle
            cx="0"
            cy="0"
            r="6"
            fill="white"
            animate={{ r: [4, 9, 4], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            filter="url(#softGlow)"
          />
        </svg>
      </motion.div>

      {/* Counter-rotating outer nodes */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-3 w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-neon)", boxShadow: "0 0 14px var(--color-neon)" }} />
        <div className="absolute top-1/2 -translate-y-1/2 right-4 w-2 h-2 rounded-full" style={{ background: "var(--color-neon-2)", boxShadow: "0 0 12px var(--color-neon-2)" }} />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 w-2 h-2 rounded-full" style={{ background: "var(--color-neon-3)", boxShadow: "0 0 12px var(--color-neon-3)" }} />
      </motion.div>
    </div>
  );
}
