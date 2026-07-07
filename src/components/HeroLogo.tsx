import { motion } from "framer-motion";

/**
 * Animated personal logo mark for the hero section.
 * Replaces the 3D blob with a crisp, theme-aware SVG logo that
 * syncs with the dynamic neon hue cycle and works in both themes.
 */
export function HeroLogo() {
  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center overflow-hidden">
      {/* Ambient backdrop glow */}
      <div
        className="absolute inset-0 rounded-full gradient-blur opacity-25 scale-[0.85]"
        style={{ background: "var(--color-neon)" }}
      />
      <div
        className="absolute inset-0 rounded-full gradient-blur opacity-20 scale-[0.65]"
        style={{ background: "var(--color-neon-2)" }}
      />

      <svg
        viewBox="0 0 420 420"
        className="relative z-10 w-full h-full max-w-[440px] drop-shadow-2xl"
        aria-label="Harish logo mark"
      >
        <defs>
          <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-neon)" />
            <stop offset="45%" stopColor="var(--color-neon-2)" />
            <stop offset="100%" stopColor="var(--color-neon-3)" />
          </linearGradient>

          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-neon)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--color-neon-2)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--color-neon-3)" stopOpacity="0" />
          </radialGradient>

          <filter id="logoGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer orbit ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "210px 210px" }}
        >
          <circle
            cx="210"
            cy="210"
            r="175"
            fill="none"
            stroke="url(#brandGrad)"
            strokeWidth="1.2"
            opacity="0.35"
            strokeDasharray="10 18"
          />
        </motion.g>

        {/* Mid orbit ring */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "210px 210px" }}
        >
          <circle
            cx="210"
            cy="210"
            r="145"
            fill="none"
            stroke="var(--color-neon-2)"
            strokeWidth="1.5"
            opacity="0.45"
            strokeDasharray="40 70"
          />
        </motion.g>

        {/* Inner orbit ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "210px 210px" }}
        >
          <circle
            cx="210"
            cy="210"
            r="115"
            fill="none"
            stroke="var(--color-neon-3)"
            strokeWidth="1.8"
            opacity="0.5"
            strokeDasharray="80 40"
          />
        </motion.g>

        {/* Core glow */}
        <circle cx="210" cy="210" r="105" fill="url(#coreGlow)">
          <animate attributeName="r" values="105;112;105" dur="6s" repeatCount="indefinite" />
        </circle>

        {/* Core disc */}
        <motion.circle
          cx="210"
          cy="210"
          r="85"
          fill="var(--color-background)"
          stroke="url(#brandGrad)"
          strokeWidth="2.5"
          opacity="0.95"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "210px 210px" }}
        />

        {/* H monogram */}
        <motion.g
          filter="url(#logoGlow)"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M170 160 v100 M250 160 v100 M170 210 h80"
            fill="none"
            stroke="url(#brandGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Accent nodes on rings */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "210px 210px" }}
        >
          <circle cx="210" cy="35" r="5" fill="var(--color-neon)" filter="url(#softGlow)" />
          <circle cx="210" cy="385" r="3.5" fill="var(--color-neon-3)" opacity="0.85" />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "210px 210px" }}
        >
          <circle cx="355" cy="210" r="4" fill="var(--color-neon-2)" filter="url(#softGlow)" />
        </motion.g>
      </svg>
    </div>
  );
}
