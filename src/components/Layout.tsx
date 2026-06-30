import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/articles", label: "Articles" },
  { to: "/coding", label: "Profiles" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
      <nav className="mx-auto max-w-6xl flex items-center justify-between rounded-2xl border border-white/10 bg-background/40 backdrop-blur-xl px-4 sm:px-6 py-3">
        <Link to="/" className="font-display font-bold text-lg">
          <span className="text-gradient">dev</span>
          <span className="text-foreground">.folio</span>
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`relative ${active ? "text-foreground" : ""}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl border border-white/10 bg-background/80 backdrop-blur-xl p-3"
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function GradientBlobs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div
        className="gradient-blur animate-blob"
        style={{
          background: "radial-gradient(circle, #a855f7, transparent)",
          width: 500, height: 500, top: "-10%", left: "-10%",
        }}
      />
      <div
        className="gradient-blur animate-blob"
        style={{
          background: "radial-gradient(circle, #22d3ee, transparent)",
          width: 600, height: 600, bottom: "-20%", right: "-10%",
          animationDelay: "-6s",
        }}
      />
      <div
        className="gradient-blur animate-blob"
        style={{
          background: "radial-gradient(circle, #ec4899, transparent)",
          width: 400, height: 400, top: "40%", left: "55%",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}

export function PageTransition({ children, variant = "fade" }: { children: ReactNode; variant?: "fade" | "slide" | "scale" | "rotate" | "blur" | "flip" | "curtain" }) {
  const variants = {
    fade: {
      initial: { opacity: 0, y: 30, filter: "blur(10px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: -30, filter: "blur(10px)" },
    },
    slide: {
      initial: { opacity: 0, x: 80 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -80 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.05 },
    },
    rotate: {
      initial: { opacity: 0, rotateX: -20, y: 40 },
      animate: { opacity: 1, rotateX: 0, y: 0 },
      exit: { opacity: 0, rotateX: 15, y: -40 },
    },
    blur: {
      initial: { opacity: 0, filter: "blur(30px) saturate(1.6)", scale: 1.04 },
      animate: { opacity: 1, filter: "blur(0px) saturate(1)", scale: 1 },
      exit: { opacity: 0, filter: "blur(30px) saturate(1.6)", scale: 0.98 },
    },
    flip: {
      initial: { opacity: 0, rotateY: 35, x: 60 },
      animate: { opacity: 1, rotateY: 0, x: 0 },
      exit: { opacity: 0, rotateY: -35, x: -60 },
    },
    curtain: {
      initial: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
      animate: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
      exit: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
    },
  }[variant];

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      style={{ perspective: 1400 }}
      className="relative min-h-screen pt-28 pb-20 px-4 sm:px-8"
    >
      {children}
    </motion.div>
  );
}

/** Sweep overlay that flashes between route changes. */
export function RouteSweep({ pathname }: { pathname: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ scaleY: 1, transformOrigin: "top" }}
        animate={{ scaleY: 0, transformOrigin: "top" }}
        exit={{ scaleY: 1, transformOrigin: "bottom" }}
        transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
        className="pointer-events-none fixed inset-0 z-[55] bg-gradient-to-b from-[var(--color-neon)]/25 via-background to-[var(--color-neon-2)]/20"
      />
    </AnimatePresence>
  );
}

export function SocialBar() {
  const links = [
    { href: "https://linkedin.com", label: "LinkedIn", icon: "in" },
    { href: "https://github.com", label: "GitHub", icon: "gh" },
    { href: "https://twitter.com", label: "Twitter", icon: "tw" },
    { href: "https://instagram.com", label: "Instagram", icon: "ig" },
    { href: "https://youtube.com", label: "YouTube", icon: "yt" },
  ];
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex items-center gap-1 rounded-full border border-white/10 bg-background/60 backdrop-blur-xl px-2 py-2"
      >
        {links.map((l, i) => (
          <motion.a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            aria-label={l.label}
            whileHover={{ y: -6, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="w-9 h-9 grid place-items-center rounded-full text-xs font-bold uppercase text-muted-foreground hover:text-foreground hover:bg-white/10"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {l.icon}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
