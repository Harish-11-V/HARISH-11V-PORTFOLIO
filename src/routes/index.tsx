import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeroScene } from "../components/HeroScene";
import { PageTransition } from "../components/Layout";
import { Magnetic, Parallax } from "../components/Effects";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harish Kumar V — AI/ML Developer Portfolio" },
      { name: "description", content: "Harish Kumar V — Prefinal year B.Tech AI & ML student at Rajalakshmi Engineering College. Builder of AI, ML, and full-stack projects with real-world impact." },
    ],
  }),
  component: Index,
});

const EDUCATION = [
  { school: "Rajalakshmi Engineering College, Chennai", degree: "B.Tech Artificial Intelligence & Machine Learning", period: "Sep 2023 — Present", score: "CGPA 8.52" },
  { school: "Christ The King Matric Higher Secondary School, Kumbakonam", degree: "Higher Secondary — XII", period: "Jul 2022 — Apr 2023", score: "92.83%" },
  { school: "Christ The King Matric Higher Secondary School, Kumbakonam", degree: "Secondary — X", period: "Jun 2020 — Apr 2021", score: "89%" },
];

const EXPERIENCE = [
  { role: "AI Engineering Intern", org: "L&T Technology Services", period: "Dec 2025 — Feb 2026", desc: "AI-driven solutions integrating APIs, frontend-backend systems, and workflow automation." },
  { role: "Secretary — IEEE Society", org: "Rajalakshmi Engineering College", period: "Aug 2025 — Present", desc: "Managed documentation, coordinated meetings, facilitated communication among members." },
  { role: "Event Management Lead", org: "Phoenix Club, REC", period: "Aug 2025 — Present", desc: "Led planning and execution of college events; supervised teams and timelines." },
  { role: "Junior Associate", org: "IEEE CIS Society, REC", period: "Oct 2024 — Aug 2025", desc: "Organized technical events, coordinated logistics, ensured smooth execution." },
  { role: "Internship Trainee", org: "NIT Silchar", period: "Jan 2025 — Mar 2025", desc: "Implemented AI/ML models for medical imaging projects." },
  { role: "Internship Trainee", org: "InternEzy", period: "Nov 2024 — Jan 2025", desc: "Cloud Computing with AWS — deployment and services." },
  { role: "Internship Trainee", org: "ReTech Solutions Pvt. Ltd, Chennai", period: "Dec 2024", desc: "IoT and real-time sensor data projects." },
];

const ACCOMPLISHMENTS = [
  { year: "2026", title: "Fortinet Certifications", desc: "Fortinet Certified Fundamentals & Associate — Cybersecurity, Fortinet Training Institute." },
  { year: "2025", title: "Paper — LMS Using Generative AI", desc: "Presented at Chennai Institute of Technology with a team of 3." },
  { year: "2025", title: "NPTEL — 3+ Courses & Gold Badge", desc: "Completed multiple NPTEL courses; awarded one Gold Badge." },
  { year: "2025", title: "Paper — Pneumonia Detection with ViT + MC Dropout", desc: "Presented online at VFSTR University." },
  { year: "2024", title: "IEEE Breadths Hackathon — 2nd Prize", desc: "Theme: Environmental Monitoring · Team of 4." },
];

function Index() {
  return (
    <PageTransition variant="fade">
      {/* ---------- HERO ---------- */}
      <section className="relative mx-auto max-w-[1400px] grid grid-cols-12 gap-6 items-start min-h-[80vh]">
        {/* Top rail */}
        <div className="col-span-12 flex items-center gap-4 mb-8">
          <span className="eyebrow">Portfolio · MMXXVI</span>
          <div className="flex-1 h-px bg-foreground/20" />
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground hidden sm:inline">
            AI · ML · FRONTEND · IoT
          </span>
        </div>

        {/* Big italic serif headline — spans wide, breaks the grid */}
        <div className="col-span-12 lg:col-span-8 relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="serif-italic text-copper text-lg mb-6"
          >
            — a portfolio in seven chapters.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="serif text-[clamp(3.5rem,11vw,10rem)] leading-[0.88] tracking-[-0.04em]"
          >
            Harish
            <br />
            <span className="serif-italic pl-[8vw]">Kumar V.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 max-w-md text-[15px] leading-relaxed text-muted-foreground"
          >
            Artificial Intelligence & Machine Learning student at{" "}
            <span className="text-foreground">Rajalakshmi Engineering College</span>, Chennai.
            I build real-world, socio-impactful products across AI, ML, Frontend, IoT
            and Core Programming — from RAG assistants to ViT-powered medical imaging.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Magnetic>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 border border-copper bg-copper px-6 py-3 text-sm text-primary-foreground hover:bg-transparent hover:text-copper transition-colors"
              >
                <span className="font-mono text-[10px] tracking-widest">01</span>
                <span className="serif-italic text-base">Commission a project</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 border border-foreground/25 px-6 py-3 text-sm hover:border-copper hover:text-copper transition-colors"
              >
                <span className="font-mono text-[10px] tracking-widest">02</span>
                <span className="serif-italic text-base">Browse the catalogue</span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Hero scene — offset, smaller, framed */}
        <div className="col-span-12 lg:col-span-4 lg:mt-8">
          <Parallax offset={40}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3 }}
              className="relative h-[360px] lg:h-[520px] border border-foreground/15"
            >
              <span className="absolute -top-3 left-4 bg-background px-2 eyebrow">Fig. 01 — neural mesh</span>
              <HeroScene />
              <span className="absolute -bottom-3 right-4 bg-background px-2 text-[10px] font-mono text-muted-foreground">
                three.js · 2026
              </span>
            </motion.div>
          </Parallax>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 space-y-2 text-[13px] font-mono"
          >
            <a href="mailto:231501057@rajalakshmi.edu.in" className="flex items-center gap-2 text-muted-foreground hover:text-copper transition">
              <Mail size={12} /> 231501057@rajalakshmi.edu.in
            </a>
            <a href="tel:+916374304895" className="flex items-center gap-2 text-muted-foreground hover:text-copper transition">
              <Phone size={12} /> +91 63743 04895
            </a>
            <span className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={12} /> Chennai · India
            </span>
          </motion.div>
        </div>
      </section>

      {/* ---------- CHAPTER 01 · ABOUT ---------- */}
      <section className="mx-auto max-w-[1400px] mt-40 relative">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">Chapter 01</span>
            <h2 className="mt-6 serif text-5xl leading-[0.95]">
              A daily learner,
              <br />
              <span className="serif-italic text-copper">driven by impact.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 text-[15px] leading-relaxed text-muted-foreground">
            <p className="serif-italic text-2xl text-foreground leading-snug">
              &ldquo;End-to-end engineering — from a whiteboard sketch to a
              shipped, measured product.&rdquo;
            </p>
            <p>
              I&rsquo;m <span className="text-foreground">Harish Kumar V</span>, prefinal year
              student of <span className="text-foreground">Artificial Intelligence & Machine Learning</span> at
              Rajalakshmi Engineering College, Chennai. Foundations in AI, ML,
              Frontend Development, IoT, and Core Programming — Java, Python, C.
            </p>
            <p>
              I build projects that solve real-world and socio-impactful problems,
              blending technical depth with end-to-end delivery. Resilient
              leadership, a bias for shipping, and a daily-learner attitude.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-foreground/15">
              {[
                { k: "CGPA", v: "8.52" },
                { k: "Roles", v: "7+" },
                { k: "Hackathon", v: "2nd" },
                { k: "Certs & Papers", v: "5+" },
              ].map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="serif text-4xl text-foreground">{s.v}</div>
                  <div className="mt-2 eyebrow">{s.k}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CHAPTER 02 · EDUCATION ---------- */}
      <section className="mx-auto max-w-[1400px] mt-40 relative">
        <div className="index-number absolute -top-8 right-0">02</div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <span className="eyebrow">Chapter 02</span>
            <h2 className="mt-6 serif text-4xl">
              Formation<span className="serif-italic text-copper">.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-9 space-y-0 border-t border-foreground/15">
            {EDUCATION.map((e, i) => (
              <motion.div
                key={e.degree + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group grid grid-cols-12 gap-4 py-6 border-b border-foreground/15 hover:bg-foreground/[0.03] transition-colors px-2 -mx-2"
              >
                <span className="col-span-2 font-mono text-xs text-muted-foreground pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-12 sm:col-span-6">
                  <h3 className="serif-italic text-xl group-hover:text-copper transition">{e.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.school}</p>
                </div>
                <div className="col-span-6 sm:col-span-2 text-xs font-mono text-muted-foreground pt-1">{e.period}</div>
                <div className="col-span-6 sm:col-span-2 text-right serif text-2xl text-copper">{e.score}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CHAPTER 03 · EXPERIENCE ---------- */}
      <section className="mx-auto max-w-[1400px] mt-40 relative">
        <div className="index-number absolute -top-8 left-0">03</div>
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 md:col-span-8 md:col-start-4">
            <span className="eyebrow">Chapter 03</span>
            <h2 className="mt-6 serif text-5xl">
              Practice — <span className="serif-italic text-copper">seven roles.</span>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          {EXPERIENCE.map((x, i) => (
            <motion.article
              key={x.role + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`col-span-12 sm:col-span-6 lg:col-span-4 border border-foreground/15 p-6 hover:border-copper/60 transition-colors ${
                i % 3 === 1 ? "lg:translate-y-8" : ""
              } ${i % 3 === 2 ? "lg:-translate-y-4" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-[10px] tracking-widest text-copper">
                  {String(i + 1).padStart(2, "0")} / 07
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">{x.period}</span>
              </div>
              <h3 className="mt-5 serif text-2xl leading-tight">{x.role}</h3>
              <p className="mt-1 serif-italic text-sm text-copper">{x.org}</p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{x.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ---------- CHAPTER 04 · ACCOMPLISHMENTS ---------- */}
      <section className="mx-auto max-w-[1400px] mt-40 relative">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">Chapter 04</span>
            <h2 className="mt-6 serif text-4xl leading-tight">
              Wins &<br />
              <span className="serif-italic text-copper">recognitions.</span>
            </h2>
            <div className="index-number mt-6 hidden md:block !text-[10rem] leading-[0.85]">04</div>
          </div>
          <div className="col-span-12 md:col-span-8 border-t border-foreground/15">
            {ACCOMPLISHMENTS.map((a, i) => (
              <motion.div
                key={a.title + i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group grid grid-cols-12 gap-4 py-7 border-b border-foreground/15"
              >
                <div className="col-span-2 serif-italic text-copper text-3xl">{a.year}</div>
                <div className="col-span-10">
                  <h3 className="serif text-2xl group-hover:text-copper transition copper-underline inline-block">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Footer signature ---------- */}
      <section className="mx-auto max-w-[1400px] mt-40">
        <hr className="hairline" />
        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
          <span className="serif-italic text-2xl">— fin de portfolio, chapitre I.</span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            © MMXXVI · CHENNAI · IN
          </span>
        </div>
      </section>
    </PageTransition>
  );
}
