import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { PageTransition } from "../components/Layout";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Harish Kumar V" },
      { name: "description", content: "Programming, web, version control, automation, design tools and soft skills of Harish Kumar V." },
    ],
  }),
  component: Skills,
});

const TECHNICAL = [
  { name: "Python", value: 92 },
  { name: "Java", value: 85 },
  { name: "C", value: 82 },
  { name: "JavaScript", value: 88 },
  { name: "React JS", value: 90 },
  { name: "HTML / CSS", value: 92 },
  { name: "Frontend (UI)", value: 88 },
  { name: "API Handling", value: 85 },
];

const TOOLS = [
  "Git", "GitHub", "VS Code", "UiPath Studio", "Canva",
  "TensorFlow", "PyTorch", "OpenCV", "MongoDB", "Node.js", "Supabase", "Gemini API",
];

const SOFT = [
  "Team Leadership & Mentoring",
  "Adaptability",
  "Time Management",
  "Attention to Detail",
  "Active Learner",
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
    <PageTransition variant="blur">
      <section className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Toolkit</p>
          <h1 className="mt-3 text-5xl sm:text-6xl font-bold">Skills & stack.</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Programming, web development, automation, and the soft skills that hold projects together.
          </p>
        </motion.div>

        <h2 className="mt-16 text-2xl font-bold">Programming & Web Development</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-6">
          {TECHNICAL.map((s, i) => (
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

        <h2 className="mt-16 text-2xl font-bold">Tools, Frameworks & Automation</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {TOOLS.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, type: "spring", bounce: 0.4 }}
              whileHover={{ y: -3, scale: 1.05 }}
              className="px-4 py-2 rounded-full border border-white/10 bg-card/40 backdrop-blur-xl text-sm font-medium hover:border-primary/50 hover:text-primary transition"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-bold">Soft Skills & Project Management</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SOFT.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl p-4 text-sm font-medium glow-hover"
            >
              {s}
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
