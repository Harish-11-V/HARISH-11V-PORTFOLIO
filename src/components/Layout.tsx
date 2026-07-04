import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { Menu, X, Linkedin, Github, Twitter, Instagram, Youtube } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { to: "/", label: "Index", num: "01" },
  { to: "/projects", label: "Work", num: "02" },
  { to: "/skills", label: "Craft", num: "03" },
  { to: "/articles", label: "Journal", num: "04" },
  { to: "/coding", label: "Profiles", num: "05" },
  { to: "/resume", label: "Résumé", num: "06" },
  { to: "/contact", label: "Contact", num: "07" },
] as const;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 pt-5">
        <nav className="flex items-center justify-between border-b border-foreground/15 pb-4">
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="serif-italic text-2xl leading-none">Harish</span>
            <span className="serif text-2xl leading-none">Kumar V</span>
            <span className="ml-1 text-[10px] tracking-[0.3em] uppercase text-muted-foreground group-hover:text-copper transition">— Atelier</span>
          </Link>
          <ul className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group relative flex items-baseline gap-1.5 text-sm"
                  >
                    <span className="text-[10px] font-mono text-muted-foreground/70">{item.num}</span>
                    <span className={`serif-italic text-[15px] transition ${active ? "text-copper" : "text-foreground/85 group-hover:text-copper"}`}>
                      {item.label}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="nav-mark"
                        className="absolute -bottom-[17px] left-0 right-0 h-px bg-copper"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[10px] font-mono tracking-widest text-muted-foreground">
              CHN · IN
            </span>
            <ThemeToggle />
            <button
              className="lg:hidden text-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-6 sm:mx-10 mt-3 border border-foreground/15 bg-background/95 backdrop-blur-xl"
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 px-5 py-3 border-b border-foreground/10 last:border-0 hover:bg-foreground/5"
              >
                <span className="text-[10px] font-mono text-muted-foreground w-6">{item.num}</span>
                <span className="serif-italic text-lg">{item.label}</span>
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
          background: "radial-gradient(circle, var(--copper), transparent)",
          width: 620, height: 620, top: "-15%", left: "-10%",
        }}
      />
      <div
        className="gradient-blur animate-blob"
        style={{
          background: "radial-gradient(circle, var(--sage), transparent)",
          width: 500, height: 500, bottom: "-20%", right: "-15%",
          animationDelay: "-11s",
        }}
      />
      <div aria-hidden className="grain-overlay" />
    </div>
  );
}

export function PageTransition({ children, variant = "fade" }: { children: ReactNode; variant?: "fade" | "slide" | "scale" | "rotate" | "blur" | "flip" | "curtain" }) {
  const variants = {
    fade: {
      initial: { opacity: 0, y: 20, filter: "blur(8px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: -20, filter: "blur(8px)" },
    },
    slide: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -60 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.02 },
    },
    rotate: {
      initial: { opacity: 0, rotateX: -14, y: 30 },
      animate: { opacity: 1, rotateX: 0, y: 0 },
      exit: { opacity: 0, rotateX: 10, y: -30 },
    },
    blur: {
      initial: { opacity: 0, filter: "blur(20px)", scale: 1.02 },
      animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
      exit: { opacity: 0, filter: "blur(20px)", scale: 0.99 },
    },
    flip: {
      initial: { opacity: 0, rotateY: 20, x: 40 },
      animate: { opacity: 1, rotateY: 0, x: 0 },
      exit: { opacity: 0, rotateY: -20, x: -40 },
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
      className="relative min-h-screen pt-32 pb-32 px-6 sm:px-10"
    >
      {children}
    </motion.div>
  );
}

export function RouteSweep({ pathname }: { pathname: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ scaleY: 1, transformOrigin: "top" }}
        animate={{ scaleY: 0, transformOrigin: "top" }}
        exit={{ scaleY: 1, transformOrigin: "bottom" }}
        transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        className="pointer-events-none fixed inset-0 z-[55] bg-ink"
        style={{ background: "var(--ink)" }}
      />
    </AnimatePresence>
  );
}

export function SocialBar() {
  const links = [
    { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
    { href: "https://github.com", label: "GitHub", Icon: Github },
    { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
    { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
    { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
  ];
  return (
    <>
      {/* Desktop: vertical rail on the left */}
      <div className="hidden md:flex fixed left-6 bottom-8 z-40 flex-col items-center gap-4">
        <div className="h-24 w-px bg-foreground/25" />
        {links.map((l) => (
          <motion.a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            aria-label={l.label}
            whileHover={{ x: 3 }}
            className="text-muted-foreground hover:text-copper transition"
          >
            <l.Icon size={15} />
          </motion.a>
        ))}
        <div
          className="mt-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
          style={{ writingMode: "vertical-rl" }}
        >
          Follow
        </div>
      </div>

      {/* Mobile: floating pill */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-1 border border-foreground/15 bg-background/80 backdrop-blur-xl px-3 py-2"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              aria-label={l.label}
              className="w-9 h-9 grid place-items-center text-muted-foreground hover:text-copper transition"
            >
              <l.Icon size={14} />
            </a>
          ))}
        </motion.div>
      </div>
    </>
  );
}

/** Reusable editorial page header — eyebrow, index number, italic serif title, meta row. */
export function PageMasthead({
  eyebrow,
  index,
  title,
  italic,
  meta,
  lede,
}: {
  eyebrow: string;
  index: string;
  title: ReactNode;
  italic?: ReactNode;
  meta?: string;
  lede?: ReactNode;
}) {
  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-center gap-4">
            <span className="eyebrow">{eyebrow}</span>
            <div className="flex-1 h-px bg-foreground/20" />
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground">{meta}</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 serif text-[clamp(3rem,9vw,7.5rem)] leading-[0.92]"
          >
            {title}
            {italic && (
              <>
                <br />
                <span className="serif-italic text-copper">{italic}</span>
              </>
            )}
          </motion.h1>
        </div>
        <div className="hidden md:block md:col-span-4 text-right">
          <div className="index-number">{index}</div>
        </div>
      </div>
      {lede && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-10 max-w-xl serif-italic text-xl text-muted-foreground leading-snug"
        >
          {lede}
        </motion.p>
      )}
      <hr className="hairline mt-14" />
    </div>
  );
}
