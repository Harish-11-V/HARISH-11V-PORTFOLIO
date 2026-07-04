import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition, PageMasthead } from "../components/Layout";
import { Github, Code, Linkedin, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/coding")({
  head: () => ({
    meta: [
      { title: "Profiles — Harish Kumar V" },
      { name: "description", content: "Harish Kumar V on LeetCode, GitHub, and LinkedIn." },
    ],
  }),
  component: Coding,
});

const PROFILES = [
  { name: "LeetCode", handle: "@harish", stat: "Problem solving & DSA practice", icon: Code, href: "https://leetcode.com", n: "01" },
  { name: "GitHub", handle: "@harish", stat: "Open-source projects & experiments", icon: Github, href: "https://github.com", n: "02" },
  { name: "LinkedIn", handle: "in/harish", stat: "Professional network & updates", icon: Linkedin, href: "https://linkedin.com", n: "03" },
];

function Coding() {
  return (
    <PageTransition variant="rotate">
      <div className="mx-auto max-w-[1400px]">
        <PageMasthead
          eyebrow="Chapter 05 · Profiles"
          index="05"
          title="Where I"
          italic="code."
          meta="03 CHANNELS"
          lede="Find my work, problem-solving, and updates across platforms."
        />

        <div className="mt-16 grid grid-cols-12 gap-6">
          {PROFILES.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              whileHover={{ y: -6 }}
              className={`col-span-12 md:col-span-4 group relative border border-foreground/15 p-8 hover:border-copper/60 hover:bg-foreground/[0.03] transition-colors ${
                i === 1 ? "md:translate-y-8" : ""
              } ${i === 2 ? "md:translate-y-4" : ""}`}
            >
              <div className="flex items-baseline justify-between">
                <span className="serif-italic text-copper text-2xl">{p.n}</span>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground group-hover:text-copper transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
              <p.icon size={26} className="mt-10 text-foreground/70 group-hover:text-copper transition" strokeWidth={1.4} />
              <h3 className="mt-6 serif text-4xl leading-none">{p.name}</h3>
              <p className="mt-2 font-mono text-xs text-muted-foreground">{p.handle}</p>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{p.stat}</p>
              <div className="mt-8 pt-4 border-t border-foreground/15 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                <span>External link</span>
                <span className="text-copper">Open ↗</span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 flex items-baseline justify-between">
          <span className="serif-italic text-2xl">— always shipping.</span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">03 / 03</span>
        </div>
      </div>
    </PageTransition>
  );
}
