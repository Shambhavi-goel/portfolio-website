"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Mail, ArrowDown, Download, Eye } from "lucide-react";
import { SOCIAL } from "@/lib/data";
import Container from "@/components/ui/Container";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () => import("@/components/ui/ParticleBackground"),
  { ssr: false }
);

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: "tween" }}
    >
      {children}
    </motion.div>
  );
}

const socials = [
  { icon: GithubIcon,   href: SOCIAL.github,           label: "GitHub" },
  { icon: LinkedinIcon, href: SOCIAL.linkedin,          label: "LinkedIn" },
  { icon: Mail,         href: `mailto:${SOCIAL.email}`, label: "Email" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center bg-white overflow-hidden"
    >
      <ParticleBackground />

      <Container className="relative z-10 py-24 md:py-28 w-full">
        {/* Two-column balanced hero: text left, complete uncropped photo right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center min-h-[calc(100vh-8rem)]">

          {/* ── Left: Text content (col-span-7) ────────────────── */}
          <div className="flex flex-col justify-center order-2 md:order-1 md:col-span-7">

            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-700 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for internships &amp; collaborations
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h1 className="hero-heading mb-4 text-neutral-950">
                Shambhavi Goel
              </h1>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-xl sm:text-2xl font-medium text-neutral-600 mb-6 leading-relaxed">
                <TypeAnimation
                  sequence={[
                    "AI/ML Engineer", 2200,
                    "Full-Stack Developer", 2200,
                    "Hackathon Builder", 2200,
                    "Problem Solver", 2200,
                  ]}
                  wrapper="span" speed={55} deletionSpeed={65} repeat={Infinity}
                />
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-xl">
                B.Tech AI &amp; ML student building end-to-end intelligent systems —
                from scalable machine learning pipelines to high-performance web and mobile applications.
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <motion.a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                >
                  <Eye size={16} /> View Projects
                </motion.a>
                <motion.a
                  href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                  className="btn-outline"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                >
                  <Download size={16} /> Download Resume
                </motion.a>
                <motion.a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="btn-outline"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                >
                  <Mail size={16} /> Contact Me
                </motion.a>
              </div>
            </FadeUp>

            <FadeUp delay={0.6}>
              <div className="flex items-center gap-5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label} href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer" aria-label={label}
                    whileHover={{ y: -2 }}
                    className="text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
                  >
                    <Icon width={20} height={20} />
                  </motion.a>
                ))}
                <span className="w-px h-4 bg-neutral-200" />
                <span className="text-xs text-neutral-500 hidden sm:block">{SOCIAL.email}</span>
              </div>
            </FadeUp>
          </div>

          {/* ── Right: Complete uncropped profile photo (col-span-5) ── */}
          <div className="flex justify-center items-center order-1 md:order-2 md:col-span-5">
            <FadeUp delay={0.2} className="w-full flex justify-center md:justify-end">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative w-[280px] h-[354px] sm:w-[340px] sm:h-[430px] md:w-[380px] md:h-[481px] lg:w-[444px] lg:h-[562px]"
              >
                {/* Subtle soft grounding shadow */}
                <div className="absolute inset-x-10 bottom-2 h-10 bg-black/10 rounded-full blur-xl -z-10" />

                {/* Complete, uncropped image rendered with exact aspect ratio */}
                <Image
                  src="/profile.png"
                  alt="Shambhavi Goel"
                  fill
                  sizes="(max-width: 768px) 340px, (max-width: 1024px) 380px, 444px"
                  className="object-contain object-bottom drop-shadow-xl"
                  priority
                />
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] tracking-wider uppercase text-neutral-400">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, type: "tween" }}>
          <ArrowDown size={14} className="text-neutral-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
