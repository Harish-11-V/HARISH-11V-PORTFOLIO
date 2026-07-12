import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "../components/Layout";
import { Trophy, Award, Medal, Star, Calendar, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements & Awards — Harish Portfolio" },
      { name: "description", content: "A collection of milestones, awards, and recognitions earned along the way." },
    ],
  }),
  component: Achievements,
});

const ACHIEVEMENTS = [
  { title: "1st Place — National Hackathon 2026", org: "TechFest India", date: "Mar 2026", tag: "Hackathon", icon: Trophy },
  { title: "Best UI/UX Design Award", org: "Designathon Global", date: "Dec 2025", tag: "Design", icon: Award },
  { title: "Google Cloud Professional Certificate", org: "Google", date: "Nov 2025", tag: "Certification", icon: Medal },
  { title: "Top 1% on LeetCode", org: "LeetCode", date: "Oct 2025", tag: "Coding", icon: Star },
  { title: "Open Source Contributor of the Month", org: "Vercel Community", date: "Aug 2025", tag: "Community", icon: Trophy },
];

function Achievements() {
  return (
    <PageTransition variant="blur">
      <section className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Recognition</p>
          <h1 className="mt-3 text-5xl sm:text-6xl font-bold">Achievements & Awards.</h1>
        </motion.div>

        <div className="mt-12 space-y-3">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.a
                key={a.title}
                href="#"
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ x: 8 }}
                className="group flex items-center gap-5 p-5 sm:p-6 rounded-2xl border border-white/10 bg-card/30 backdrop-blur-xl hover:border-primary/40 hover:bg-card/60 transition"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary">
                  <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="px-2 py-0.5 rounded-full border border-white/10 text-primary">{a.tag}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} />{a.date}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold group-hover:text-gradient transition truncate">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{a.org}</p>
                </div>
                <ArrowUpRight className="text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" size={20} />
              </motion.a>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}
