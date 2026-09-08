"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";
import { SOCIAL } from "@/lib/data";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.message.trim().length < 10) e.message = "Message too short (min 10 chars)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full bg-neutral-50/80 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all duration-200";

  return (
    <section id="contact" className="w-full bg-white py-32 md:py-40 flex justify-center">
      <Container className="flex flex-col items-center">
        {/* Centered section header */}
        <SectionWrapper>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="label-caps mb-3">Get In Touch</p>
            <h2 className="section-heading mb-4 text-neutral-950">
              Let&apos;s Connect
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
              Have an internship opportunity, a project to collaborate on, or just want to chat about AI &amp; tech? My inbox is always open.
            </p>
          </div>
        </SectionWrapper>

        {/* Centered 2-column contact container */}
        <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Left: Contact Info (col-span-5) */}
          <SectionWrapper delay={0.1} className="lg:col-span-5 space-y-6">
            <div className="portfolio-card p-6 sm:p-8 space-y-6 w-full">
              <div>
                <h3 className="text-lg font-bold text-neutral-950 mb-2">Direct Channels</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Feel free to reach out directly via email or connect on professional networks.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { icon: Mail,         label: "Email",    value: SOCIAL.email,                  href: `mailto:${SOCIAL.email}` },
                  { icon: LinkedinIcon, label: "LinkedIn", value: "shambhavi-goel-29110b388",  href: SOCIAL.linkedin },
                  { icon: GithubIcon,   label: "GitHub",   value: "Shambhavi-goel",           href: SOCIAL.github },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 hover:border-neutral-900 bg-neutral-50/50 hover:bg-neutral-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-neutral-200/70 flex items-center justify-center shrink-0 text-neutral-800">
                        <Icon width={16} height={16} />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">{label}</p>
                        <p className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-black">{value}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Typically responds within 24 hours</span>
              </div>
            </div>
          </SectionWrapper>

          {/* Right: Message Form (col-span-7) */}
          <SectionWrapper delay={0.2} className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="portfolio-card p-6 sm:p-9 space-y-5 w-full"
            >
              <h3 className="text-xl font-bold text-neutral-950">Send a Message</h3>

              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="contact-msg"
                  rows={5}
                  placeholder="Hi Shambhavi, I'd love to connect regarding an internship/project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputCls} resize-none`}
                />
                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={{ scale: status === "idle" ? 1.01 : 1 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending...
                  </span>
                ) : status === "success" ? (
                  <span className="flex items-center gap-2"><CheckCircle2 size={16} /> Sent Successfully!</span>
                ) : (
                  <span className="flex items-center gap-2"><Send size={15} /> Send Message</span>
                )}
              </motion.button>

              {status === "error" && (
                <p className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                  <AlertCircle size={14} /> Something went wrong — please email directly at {SOCIAL.email}.
                </p>
              )}
            </form>
          </SectionWrapper>

        </div>
      </Container>
    </section>
  );
}
