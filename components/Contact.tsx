"use client";

import { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";
import { SOCIAL } from "@/lib/data";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

type Status = "idle" | "loading" | "success" | "error";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: SOCIAL.email,
    href: `mailto:${SOCIAL.email}`,
    border: "border-blue-100/80 hover:border-blue-300",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: SOCIAL.phone,
    href: `tel:${SOCIAL.phoneHref}`,
    border: "border-emerald-100/80 hover:border-emerald-300",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "shambhavi-goel-29110b388",
    href: SOCIAL.linkedin,
    border: "border-indigo-100/80 hover:border-indigo-300",
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "Shambhavi-goel",
    href: SOCIAL.github,
    border: "border-neutral-200/80 hover:border-neutral-400",
    iconBg: "bg-neutral-100 text-neutral-700",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try emailing directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email directly.");
    }
  };

  const inputCls =
    "w-full bg-white border border-neutral-200/90 rounded-2xl px-5 py-3.5 sm:py-4 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all duration-200 shadow-2xs";

  return (
    <section id="contact" className="w-full bg-white py-20 md:py-28 flex justify-center overflow-hidden">
      <Container>
        {/* Centered max-w-6xl container */}
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-14 sm:gap-16">

          {/* ── Header Row ── */}
          <div className="w-full">
            <SectionWrapper delay={0.05} className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-blue-600" />
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                  Get In Touch
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-extrabold text-neutral-950 tracking-tight leading-[1.1] mb-4">
                Let&apos;s Connect
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Have an internship opportunity, a project to collaborate on, or just want to chat about AI &amp; tech? My inbox is always open.
              </p>
            </SectionWrapper>
          </div>

          {/* ── 2-Column Content Layout ── */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left: Direct Channel Tiles */}
            <SectionWrapper delay={0.1} className="lg:col-span-5 flex flex-col gap-6">
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <h3 className="text-lg font-bold text-neutral-950">Direct Channels</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">Reach out directly via email or professional platforms.</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {contactLinks.map(({ icon: Icon, label, value, href, border, iconBg }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={`portfolio-card flex items-center justify-between bg-white border rounded-3xl transition-all duration-300 group shadow-xs hover:shadow-md ${border}`}
                    style={{ padding: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
                        <Icon width={22} height={22} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">{label}</p>
                        <p className="text-sm sm:text-base font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">{value}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-neutral-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Typically responds within 24 hours</span>
              </div>
            </div>
          </SectionWrapper>

            {/* Right: Message Form Tile matching Image 2 */}
            <SectionWrapper delay={0.2} className="lg:col-span-7">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="portfolio-card w-full bg-white border border-neutral-200/80 rounded-3xl shadow-xs hover:shadow-md transition-all duration-300"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.6rem",
                  padding: "clamp(2rem, 4vw, 3.5rem)",
                }}
              >
                {/* Title & Subtitle */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <h3 className="text-2xl sm:text-[1.65rem] font-bold text-neutral-950 tracking-tight">
                    Send a Message
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    Leave a message and I&apos;ll get back to you shortly.
                  </p>
                </div>

                {/* Name Field */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  <label htmlFor="contact-name" className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                  />
                  {errors.name && <p className="text-xs text-red-500 pt-0.5">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  <label htmlFor="contact-email" className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                  />
                  {errors.email && <p className="text-xs text-red-500 pt-0.5">{errors.email}</p>}
                </div>

                {/* Message Field */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  <label htmlFor="contact-msg" className="text-xs font-semibold text-neutral-800 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="contact-msg"
                    name="message"
                    rows={5}
                    placeholder="Hi Shambhavi, I'd love to connect regarding an internship/project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputCls} resize-none`}
                    style={{ minHeight: "150px" }}
                  />
                  {errors.message && <p className="text-xs text-red-500 pt-0.5">{errors.message}</p>}
                </div>

                {/* Status alerts */}
                {status === "success" && (
                  <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{errorMessage || "Failed to send message. Please try emailing directly."}</span>
                  </div>
                )}

                {/* Send Message Pill Button */}
                <div style={{ paddingTop: "0.75rem" }}>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4.5 sm:py-5 px-8 min-h-[56px] sm:min-h-[60px] flex items-center justify-center gap-3 text-base sm:text-lg font-bold rounded-full bg-neutral-950 hover:bg-neutral-850 text-white cursor-pointer hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                  >
                    {status === "loading" ? (
                      <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={19} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </SectionWrapper>

          </div>

        </div>
      </Container>
    </section>
  );
}
