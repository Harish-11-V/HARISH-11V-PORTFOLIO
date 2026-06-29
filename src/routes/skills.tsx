import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { PageTransition } from "../components/Layout";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Dev.Folio" },
      { name: "description", content: "Tools, frameworks, and disciplines I work with daily." },
    ],
  }),
  component: Skills,
});

const SKILLS = [
  { name: "React / Next.js", value: 95 },
  { name: "TypeScript", value: 92 },
  { name: "Three.js / WebGL", value: 85 },
  { name: "Framer Motion", value: 90 },
  { name: "Node.js / Edge", value: 88 },
  { name: "Design Systems", value: 93 },
  { name: "Python / ML", value: 75 },
  { name: "Rust", value: 65 },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function Bar({ value, delay }: { value: number; delay: number }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-pink-400 glow-border"
    />
  );
}

function Skills() {
  return (
    <PageTransition variant="fade">
      <section className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Toolkit</p>
          <h1 className="mt-3 text-5xl sm:text-6xl font-bold">Skills & stack.</h1>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-6">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-semibold">{s.name}</span>
                <span className="text-primary font-mono text-sm"><Counter to={s.value} /></span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <Bar value={s.value} delay={i * 0.05} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
