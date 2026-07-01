import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "../components/Layout";
import { Github, Code, Trophy, Award, Terminal, Zap } from "lucide-react";

export const Route = createFileRoute("/coding")({
  head: () => ({
    meta: [
      { title: "Coding Profiles — Harish Portfolio" },
      { name: "description", content: "GitHub, LeetCode, SkillRack, Codeforces and more." },
    ],
  }),
  component: Coding,
});

const PROFILES = [
  { name: "GitHub", handle: "@alexcarter", stat: "8.4k ★ · 240 repos", icon: Github, color: "from-zinc-400 to-zinc-700", href: "https://github.com" },
  { name: "LeetCode", handle: "alexcarter", stat: "780 solved · Top 2%", icon: Code, color: "from-amber-400 to-orange-600", href: "https://leetcode.com" },
  { name: "Codeforces", handle: "alexc", stat: "Expert · 1742", icon: Trophy, color: "from-blue-400 to-indigo-600", href: "https://codeforces.com" },
  { name: "SkillRack", handle: "alex_c", stat: "1100 problems · Gold", icon: Award, color: "from-yellow-400 to-amber-600", href: "https://skillrack.com" },
  { name: "HackerRank", handle: "alex.carter", stat: "5★ · Problem Solving", icon: Terminal, color: "from-emerald-400 to-green-600", href: "https://hackerrank.com" },
  { name: "Kaggle", handle: "alexc", stat: "Notebooks Expert", icon: Zap, color: "from-cyan-400 to-teal-600", href: "https://kaggle.com" },
];

function Coding() {
  return (
    <PageTransition variant="rotate">
      <section className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Profiles</p>
          <h1 className="mt-3 text-5xl sm:text-6xl font-bold">Where I code.</h1>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROFILES.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank" rel="noreferrer"
              initial={{ opacity: 0, scale: 0.6, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.07, type: "spring", bounce: 0.4, duration: 0.7 }}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative rounded-3xl border border-white/10 bg-card/40 backdrop-blur-xl p-6 overflow-hidden block"
            >
              <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${p.color} opacity-30 blur-3xl group-hover:opacity-70 transition`} />
              <div className="relative">
                <div className={`inline-grid place-items-center w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color}`}>
                  <p.icon size={22} className="text-white" />
                </div>
                <h3 className="mt-4 text-xl font-bold">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{p.handle}</p>
                <p className="mt-4 text-sm text-foreground/80">{p.stat}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
