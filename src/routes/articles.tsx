import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "../components/Layout";
import { Clock, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles — Dev.Folio" },
      { name: "description", content: "Essays on motion, 3D web, and the craft of shipping." },
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
      <section className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Writing</p>
          <h1 className="mt-3 text-5xl sm:text-6xl font-bold">Featured articles.</h1>
        </motion.div>

        <div className="mt-12 space-y-3">
          {ARTICLES.map((a, i) => (
            <motion.a
              key={a.title}
              href="#"
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ x: 8 }}
              className="group flex items-center gap-6 p-5 sm:p-6 rounded-2xl border border-white/10 bg-card/30 backdrop-blur-xl hover:border-primary/40 hover:bg-card/60 transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="px-2 py-0.5 rounded-full border border-white/10 text-primary">{a.tag}</span>
                  <span>{a.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{a.read}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold group-hover:text-gradient transition">
                  {a.title}
                </h3>
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" size={20} />
            </motion.a>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
