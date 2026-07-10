import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "../components/Layout";
import { Magnetic, RevealText } from "../components/Effects";
import { ArrowRight, Sparkles, Trophy, GraduationCap, Award, Briefcase, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harish Kumar V — AI/ML Developer Portfolio" },
      { name: "description", content: "Harish Kumar V — Prefinal year B.Tech AI & ML student at Rajalakshmi Engineering College. Builder of AI, ML, and full-stack projects with real-world impact." },
    ],
  }),
  component: Index,
});

import type { Variants } from "framer-motion";
const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const fadeUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Index() {
  return (
    <PageTransition variant="fade">
      <section className="relative mx-auto max-w-6xl grid grid-cols-1 gap-10 items-center min-h-[80vh]">
        <motion.div variants={stagger} initial="initial" animate="animate" className="relative z-10 max-w-3xl">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-muted-foreground mb-6">
            <Sparkles size={14} className="text-primary" />
            Prefinal year · Open to internships & collaborations
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Hi, I'm <span className="text-gradient">Harish Kumar V</span><br />
            AI/ML developer.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground max-w-lg">
            <RevealText text="Artificial Intelligence & Machine Learning student building real-world, socio-impactful products across AI, ML, Frontend, IoT, and Core Programming." />
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-hover"
              >
                Hire me
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/5"
              >
                View work
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <a href="mailto:231501057@rajalakshmi.edu.in" className="inline-flex items-center gap-1.5 hover:text-foreground transition">
              <Mail size={13} /> 231501057@rajalakshmi.edu.in
            </a>
            <a href="tel:+916374304895" className="inline-flex items-center gap-1.5 hover:text-foreground transition">
              <Phone size={13} /> +91 63743 04895
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} /> Chennai, India
            </span>
          </motion.div>
        </motion.div>

        <Parallax offset={40}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px]"
          >
            <HeroLogo />
          </motion.div>
        </Parallax>
      </section>

      {/* About / Summary */}
      <section className="mx-auto max-w-6xl mt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-5 gap-10"
        >
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">About</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">A daily learner, driven by impact.</h2>
          </div>
          <div className="lg:col-span-3 space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              I'm <span className="text-foreground font-semibold">Harish Kumar V</span>, a Prefinal year <span className="text-foreground">Artificial Intelligence & Machine Learning</span> student at Rajalakshmi Engineering College, Chennai, with strong foundations in AI, ML, Frontend Development, IoT and Core Programming (Java, Python, C).
            </p>
            <p>
              I actively build projects that solve <span className="text-foreground">real-world</span> and <span className="text-foreground">socio-impactful problems</span>, blending technical expertise with end-to-end development — from RAG-based LLM assistants to ViT-powered medical imaging.
            </p>
            <p>
              A daily learner with resilient leadership skills which create and inspire a positive change in society.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: GraduationCap, label: "CGPA · B.Tech AI & ML", value: "8.52" },
            { icon: Briefcase, label: "Internships & roles", value: "6+" },
            { icon: Trophy, label: "Hackathon (IEEE Breadths)", value: "2nd" },
            { icon: Award, label: "Certifications & papers", value: "5+" },
          ].map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl p-6 glow-hover"
            >
              <Icon className="text-primary mb-4" size={24} />
              <div className="text-3xl font-bold">{value}</div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-6xl mt-32">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Education</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Where I've studied.</h2>
        </motion.div>
        <div className="mt-10 space-y-4">
          {[
            { school: "Rajalakshmi Engineering College, Chennai", degree: "B.Tech Artificial Intelligence & Machine Learning", period: "September 2023 — Present", score: "CGPA: 8.52" },
            { school: "Christ The King Matric Boys Higher Secondary School, Kumbakonam", degree: "Higher Secondary (XII)", period: "July 2022 — April 2023", score: "92.83%" },
            { school: "Christ The King Matric Boys Higher Secondary School, Kumbakonam", degree: "Secondary (X)", period: "June 2020 — April 2021", score: "89%" },
          ].map((e, i) => (
            <motion.div
              key={e.degree + i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 glow-hover"
            >
              <div>
                <h3 className="font-semibold text-lg">{e.school}</h3>
                <p className="text-primary text-sm italic mt-0.5">{e.degree}</p>
              </div>
              <div className="text-sm text-muted-foreground sm:text-right">
                <div className="italic">{e.period}</div>
                <div className="text-foreground font-semibold mt-0.5">{e.score}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto max-w-6xl mt-32">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Experience</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Professional experience.</h2>
        </motion.div>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {[
            { role: "AI Engineering Intern", org: "L&T Technology Services, DLF Cybercity", period: "Dec 2025 — Feb 2026", desc: "Developed AI-driven solutions integrating APIs, frontend-backend systems, and workflow automation." },
            { role: "Secretary, IEEE Society", org: "Rajalakshmi Engineering College", period: "Aug 2025 — Present", desc: "Managed documentation, coordinated meetings, and facilitated communication among members." },
            { role: "Event Management Lead, Phoenix Club", org: "Rajalakshmi Engineering College", period: "Aug 2025 — Present", desc: "Led planning and execution of college events, supervising teams and timelines." },
            { role: "Event Management Junior Associate, IEEE CIS Society", org: "Rajalakshmi Engineering College", period: "Oct 2024 — Aug 2025", desc: "Assisted in organizing technical events, coordinating logistics, and ensuring smooth execution." },
            { role: "Internship Trainee", org: "National Institute of Technology, Silchar", period: "Jan 2025 — Mar 2025", desc: "Implemented AI/ML models for medical imaging projects." },
            { role: "Internship Trainee", org: "InternEzy", period: "Nov 2024 — Jan 2025", desc: "Gained hands-on experience in Cloud Computing with AWS, focusing on deployment and services." },
            { role: "Internship Trainee", org: "ReTech Solutions Pvt. Limited, Chennai", period: "Dec 2024", desc: "Worked on IoT and real-time sensor data projects." },
          ].map((x, i) => (
            <motion.div
              key={x.role + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl p-6 glow-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold uppercase text-sm tracking-wide">{x.role}</h3>
                  <p className="text-primary text-sm italic mt-1">{x.org}</p>
                </div>
                <span className="text-xs text-muted-foreground italic shrink-0">{x.period}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{x.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Accomplishments */}
      <section className="mx-auto max-w-6xl mt-32">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Accomplishments</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold">Wins & recognitions.</h2>
        </motion.div>
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {[
            { title: "Fortinet Certification (2026)", desc: "Earned Fortinet Certified Fundamentals & Fortinet Certified Associate in Fortinet Training Institute (Cybersecurity)." },
            { title: "Paper Presentation (2025)", desc: "Presented a paper on \"LMS Using Generative AI\" at Chennai Institute Of Technology with a team of 3." },
            { title: "NPTEL Certification (2025)", desc: "Completed 3+ NPTEL courses & received one Gold Badge." },
            { title: "Paper Presentation (2025)", desc: "Presented a paper on \"Pneumonia Detection with ViT + MC Dropout\" at VFSTR University via online." },
            { title: "Hackathon Winner (2024)", desc: "2nd Prize winner, IEEE Breadths hackathon under the theme \"Environmental Monitoring\" with a team of 4." },
          ].map((a, i) => (
            <motion.div
              key={a.title + i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl p-6 glow-hover"
            >
              <Award className="text-primary mb-3" size={22} />
              <h3 className="font-bold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
