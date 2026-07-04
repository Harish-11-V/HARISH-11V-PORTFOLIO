import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition, PageMasthead } from "../components/Layout";
import { Clock, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Journal — Harish Kumar V" },
      { name: "description", content: "Essays on motion, AI/ML, and the craft of shipping." },
    ],
  }),
  component: Articles,
});

const ARTICLES = [
  { title: "Designing motion that doesn't get in the way", date: "Jun 18, 2026", read: "6 min", tag: "Motion" },
  { title: "WebGPU is finally usable — here's what I built", date: "May 30, 2026", read: "9 min", tag: "3D" },
  { title: "The case for stateful design systems", date: "Apr 12, 2026", read: "5 min", tag: "DX" },
  { title: "Edge-first architecture, two years later", date: "Mar 02, 2026", read: "11 min", tag: "Infra" },
  { title: "Why I rewrote my portfolio in Three.js", date: "Feb 10, 2026", read: "4 min", tag: "Build" },
];

function Articles() {
  return (
    <PageTransition variant="blur">
      <div className="mx-auto max-w-[1400px]">
        <PageMasthead
          eyebrow="Chapter 04 · The Journal"
          index="04"
          title="Featured"
          italic="dispatches."
          meta="05 ENTRIES · 2026"
          lede="Field notes from the desk — motion, AI systems, and the practice of shipping."
        />

        <div className="mt-16 grid grid-cols-12 gap-6">
          <div className="hidden md:block col-span-2">
            <div className="sticky top-32 space-y-2">
              <span className="eyebrow">Index</span>
              {ARTICLES.map((_, i) => (
                <div key={i} className="font-mono text-xs text-muted-foreground">
                  — {String(i + 1).padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-10 border-t border-foreground/15">
            {ARTICLES.map((a, i) => (
              <motion.a
                key={a.title}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.07, duration: 0.7 }}
                className="group grid grid-cols-12 gap-4 items-baseline py-8 border-b border-foreground/15 hover:pl-3 transition-all"
              >
                <span className="col-span-2 md:col-span-1 font-mono text-[10px] tracking-widest text-copper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 md:col-span-8">
                  <h3 className="serif text-2xl sm:text-3xl leading-tight group-hover:text-copper transition">
                    {a.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-4 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                    <span className="text-copper">{a.tag}</span>
                    <span>·</span>
                    <span>{a.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{a.read}</span>
                  </div>
                </div>
                <div className="hidden md:block col-span-3 text-right">
                  <ArrowUpRight
                    className="ml-auto text-muted-foreground group-hover:text-copper transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={22}
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-baseline justify-between">
          <span className="serif-italic text-2xl">— archive continues.</span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">05 / 05</span>
        </div>
      </div>
    </PageTransition>
  );
}
