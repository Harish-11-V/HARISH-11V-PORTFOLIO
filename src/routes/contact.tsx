import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { PageTransition, PageMasthead } from "../components/Layout";
import { Check, Send, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Harish Kumar V" },
      { name: "description", content: "Send a message. I reply within 24 hours." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(80),
  email: z.string().trim().email("Valid email required").max(200),
  message: z.string().trim().min(5, "Tell me a bit more").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <PageTransition variant="flip">
      <div className="mx-auto max-w-[1400px]">
        <PageMasthead
          eyebrow="Chapter 07 · Correspondence"
          index="07"
          title="Say"
          italic="hello."
          meta="REPLIES WITHIN 24H"
          lede="Got a project, role, or idea? Drop a line — I read every message."
        />

        <div className="mt-16 grid grid-cols-12 gap-6">
          {/* Left: contact card */}
          <div className="col-span-12 md:col-span-4 space-y-8">
            <div>
              <span className="eyebrow">Direct</span>
              <div className="mt-4 space-y-3">
                <a href="mailto:231501057@rajalakshmi.edu.in" className="group flex items-center gap-3 border-b border-foreground/15 pb-3 hover:pl-2 transition-all">
                  <Mail size={14} className="text-copper" />
                  <span className="serif-italic text-base group-hover:text-copper transition">231501057@rajalakshmi.edu.in</span>
                </a>
                <a href="tel:+916374304895" className="group flex items-center gap-3 border-b border-foreground/15 pb-3 hover:pl-2 transition-all">
                  <Phone size={14} className="text-copper" />
                  <span className="serif-italic text-base group-hover:text-copper transition">+91 63743 04895</span>
                </a>
                <div className="flex items-center gap-3 pb-3">
                  <MapPin size={14} className="text-copper" />
                  <span className="serif-italic text-base">Chennai · India</span>
                </div>
              </div>
            </div>

            <div className="border-t border-foreground/15 pt-6">
              <span className="eyebrow">Currently</span>
              <p className="mt-3 serif-italic text-lg">
                Open to internships, freelance briefs, and collaboration on AI/ML products.
              </p>
            </div>
          </div>

          {/* Right: form as a stamped letter */}
          <div className="col-span-12 md:col-span-8 border border-foreground/15 p-6 sm:p-10 relative">
            <div className="absolute top-4 right-4 border border-copper/50 px-3 py-1">
              <span className="font-mono text-[10px] tracking-widest uppercase text-copper">
                Postmarked · MMXXVI
              </span>
            </div>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.4, delay: 0.1 }}
                    className="mx-auto w-16 h-16 border border-copper grid place-items-center"
                  >
                    <Check size={26} className="text-copper" />
                  </motion.div>
                  <h2 className="mt-8 serif text-4xl">Message <span className="serif-italic text-copper">sent.</span></h2>
                  <p className="mt-3 text-sm text-muted-foreground">I'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                    className="mt-6 text-sm serif-italic text-copper copper-underline"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 mt-6"
                >
                  {(["name", "email", "message"] as const).map((field, i) => (
                    <motion.div
                      key={field}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.1 }}
                    >
                      <div className="flex items-baseline gap-4 mb-2">
                        <span className="font-mono text-[10px] tracking-widest text-copper">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <label className="eyebrow">{field}</label>
                      </div>
                      {field === "message" ? (
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          rows={5}
                          className="w-full border-b border-foreground/25 bg-transparent px-0 py-2 serif-italic text-2xl outline-none focus:border-copper transition placeholder:text-muted-foreground/50 resize-none"
                          placeholder="Tell me about your project…"
                        />
                      ) : (
                        <input
                          type={field === "email" ? "email" : "text"}
                          value={form[field]}
                          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                          className="w-full border-b border-foreground/25 bg-transparent px-0 py-2 serif-italic text-2xl outline-none focus:border-copper transition placeholder:text-muted-foreground/50"
                          placeholder={field === "email" ? "you@studio.com" : "Your name"}
                        />
                      )}
                      {errors[field] && (
                        <p className="mt-1.5 text-xs text-destructive font-mono">— {errors[field]}</p>
                      )}
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    type="submit"
                    className="inline-flex items-center gap-3 border border-copper bg-copper px-8 py-3.5 text-sm font-mono uppercase tracking-widest text-primary-foreground hover:bg-transparent hover:text-copper transition-colors"
                  >
                    <Send size={14} />
                    Send message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-20 flex items-baseline justify-between">
          <span className="serif-italic text-2xl">— au revoir.</span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">Ch. VII / VII</span>
        </div>
      </div>
    </PageTransition>
  );
}
