import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { PageTransition, PageMasthead } from "../components/Layout";

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
  const rounded = useTransform(count, (v) => `${Math.round(v)}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
      return () => controls.stop();
    }
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function Skills() {
  return (
    <PageTransition variant="blur">
      <div className="mx-auto max-w-[1400px]">
        <PageMasthead
          eyebrow="Chapter 03 · The Craft"
          index="03"
          title="Skills &"
          italic="stack."
          meta="A LIVING INVENTORY"
          lede="Programming, web development, automation — and the soft skills that hold projects together."
        />

        {/* Programming */}
        <section className="mt-20 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <span className="eyebrow">§ 3.1</span>
            <h2 className="mt-3 serif text-3xl leading-tight">
              Programming
              <br />
              <span className="serif-italic text-copper">& Web.</span>
            </h2>
            <p className="mt-4 text-xs font-mono text-muted-foreground">
              Self-scored competency<br />on shipping work.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 border-t border-foreground/15">
            {TECHNICAL.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 gap-4 items-center py-5 border-b border-foreground/15 group"
              >
                <span className="col-span-1 font-mono text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-4 serif text-xl group-hover:text-copper transition">{s.name}</span>
                <div className="col-span-5 h-px bg-foreground/15 relative overflow-visible">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-y-[-1px] left-0 border-t-2 border-copper"
                  />
                </div>
                <span className="col-span-2 text-right serif-italic text-copper text-xl">
                  <Counter to={s.value} />
                  <span className="text-xs align-top">%</span>
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tools — marquee row */}
        <section className="mt-24 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <span className="eyebrow">§ 3.2</span>
            <h2 className="mt-3 serif text-3xl leading-tight">
              Tools &
              <br />
              <span className="serif-italic text-copper">automation.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {TOOLS.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -3 }}
                  className="serif-italic text-3xl sm:text-4xl leading-none text-foreground/80 hover:text-copper transition cursor-default"
                >
                  {t}
                  <span className="serif text-copper">.</span>
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* Soft skills */}
        <section className="mt-24 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <span className="eyebrow">§ 3.3</span>
            <h2 className="mt-3 serif text-3xl leading-tight">
              Soft skills &
              <br />
              <span className="serif-italic text-copper">management.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-9 grid sm:grid-cols-2 gap-x-6 gap-y-0 border-t border-foreground/15">
            {SOFT.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-baseline gap-4 py-5 border-b border-foreground/15 group hover:pl-2 transition-all"
              >
                <span className="font-mono text-[10px] text-copper w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="serif-italic text-xl group-hover:text-copper transition">{s}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="mt-20 flex items-baseline justify-between">
          <span className="serif-italic text-2xl">— always in revision.</span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">Ed. MMXXVI</span>
        </div>
      </div>
    </PageTransition>
  );
}
