"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Eye,
  Download,
  Mail,
  Phone,
  ArrowRight,
  Brain,
  Code2,
  Cloud,
  Smartphone,
  Sparkles,
  MapPin,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  LeetCodeIcon,
  GeeksforGeeksIcon,
  CodeforcesIcon,
  MailIcon,
} from "@/components/ui/Icons";
import { SOCIAL } from "@/lib/data";
import Container from "@/components/ui/Container";

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, type: "tween" }}
    >
      {children}
    </motion.div>
  );
}

const socials = [
  { icon: GithubIcon, href: SOCIAL.github, label: "GitHub", color: "#24292e" },
  { icon: LinkedinIcon, href: SOCIAL.linkedin, label: "LinkedIn", color: "#0A66C2" },
  { icon: LeetCodeIcon, href: SOCIAL.leetcode, label: "LeetCode", color: "#FFA116" },
  { icon: GeeksforGeeksIcon, href: SOCIAL.geeksforgeeks, label: "GeeksforGeeks", color: "#2F8D46" },
  { icon: CodeforcesIcon, href: SOCIAL.codeforces, label: "Codeforces", color: "#3B82F6" },
  { icon: MailIcon, href: `mailto:${SOCIAL.email}`, label: "Email", color: "#EA4335" },
  { icon: Phone, href: `tel:${SOCIAL.phoneHref}`, label: "Phone", color: "#25D366" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[85vh] flex justify-center bg-gradient-to-b from-[#FBFBFF] via-white to-white overflow-hidden pb-16 md:pb-24 scroll-mt-28"
      style={{ paddingTop: "clamp(7.5rem, 15vh, 11rem)" }}
    >

      <Container className="relative z-10 w-full flex justify-center">
        {/* Centered Grid with Generous Column Gap */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ── Left Column: Spacious Vertical Flex Structure ── */}
          <div className="flex flex-col justify-start gap-7 sm:gap-8 order-2 lg:order-1 lg:col-span-7 pt-4 sm:pt-8 lg:pt-10">

            {/* 1. Headline & Role */}
            <FadeUp delay={0.16} className="space-y-3 pt-3 sm:pt-6">
              <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold text-neutral-950 tracking-tight leading-[1.1]">
                Shambhavi Goel
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-neutral-850 tracking-tight text-neutral-800">
                AI/ML and Software Engineer
              </h2>
            </FadeUp>

            {/* 3. Description */}
            <FadeUp delay={0.24}>
              <p className="text-base sm:text-lg lg:text-[1.125rem] text-neutral-600 leading-relaxed max-w-xl">
                B.Tech AI &amp; ML student building end-to-end intelligent systems —
                from scalable machine learning pipelines to high-performance web and mobile applications.
              </p>
            </FadeUp>

            {/* 4. Action Buttons Row */}
            <FadeUp delay={0.32}>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 text-xs sm:text-sm font-semibold hover:border-neutral-400 hover:scale-[1.02] transition-all shadow-xs cursor-pointer whitespace-nowrap"
                  style={{ padding: "0.55rem 1.15rem" }}
                >
                  <Eye size={15} />
                  <span>View Projects</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 text-xs sm:text-sm font-semibold hover:border-neutral-400 hover:scale-[1.02] transition-all shadow-xs cursor-pointer whitespace-nowrap"
                  style={{ padding: "0.55rem 1.15rem" }}
                >
                  <Download size={15} />
                  <span>Download Resume</span>
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 text-xs sm:text-sm font-semibold hover:border-neutral-400 hover:scale-[1.02] transition-all shadow-xs cursor-pointer whitespace-nowrap"
                  style={{ padding: "0.55rem 1.15rem" }}
                >
                  <MailIcon width={15} height={15} />
                  <span>Contact Me</span>
                </a>
              </div>
            </FadeUp>

            {/* 5. Socials, Email & Phone Row */}
            <FadeUp delay={0.4}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-neutral-600">
                <div className="flex items-center gap-3">
                  {socials.map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      style={{ color }}
                      className="p-1 transition-all duration-200 hover:scale-120 hover:opacity-80"
                    >
                      <Icon width={20} height={20} />
                    </a>
                  ))}
                </div>
                <span className="w-px h-5 bg-neutral-300 hidden sm:inline-block" />
                <a
                  href={`mailto:${SOCIAL.email}`}
                  className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-950 font-medium transition-colors"
                >
                  {SOCIAL.email}
                </a>
                <span className="w-px h-5 bg-neutral-300 hidden sm:inline-block" />
                <a
                  href={`tel:${SOCIAL.phoneHref}`}
                  className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-950 font-medium transition-colors"
                >
                  {SOCIAL.phone}
                </a>
                <span className="w-px h-5 bg-neutral-300 hidden sm:inline-block" />
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 font-medium">
                  <MapPin size={14} className="text-rose-500 shrink-0" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </FadeUp>

            {/* 6. Capability Tiles */}
            <FadeUp delay={0.48}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 w-full max-w-2xl pt-2">
                {/* Tile 1: Machine Learning */}
                <div
                  className="rounded-2xl bg-purple-50/80 border border-purple-200/90 hover:border-purple-400 transition-all duration-200 flex items-center gap-3.5 shadow-xs group hover:-translate-y-1"
                  style={{ padding: "1.15rem 1.35rem" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Brain size={19} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-purple-950 leading-tight">
                    Machine Learning
                  </span>
                </div>

                {/* Tile 2: Full-Stack Dev */}
                <div
                  className="rounded-2xl bg-blue-50/80 border border-blue-200/90 hover:border-blue-400 transition-all duration-200 flex items-center gap-3.5 shadow-xs group hover:-translate-y-1"
                  style={{ padding: "1.15rem 1.35rem" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Code2 size={19} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-blue-950 leading-tight">
                    Full-Stack Dev
                  </span>
                </div>

                {/* Tile 3: Cloud & DevOps */}
                {/* <div
                  className="rounded-2xl bg-emerald-50/80 border border-emerald-200/90 hover:border-emerald-400 transition-all duration-200 flex items-center gap-3.5 shadow-xs group hover:-translate-y-1"
                  style={{ padding: "1.15rem 1.35rem" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Cloud size={19} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-emerald-950 leading-tight">
                    Cloud &amp; DevOps
                  </span>
                </div> */}

                {/* Tile 4: Mobile Apps */}
                <div
                  className="rounded-2xl bg-rose-50/80 border border-rose-200/90 hover:border-rose-400 transition-all duration-200 flex items-center gap-3.5 shadow-xs group hover:-translate-y-1"
                  style={{ padding: "1.15rem 1.35rem" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <Smartphone size={19} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-rose-950 leading-tight">
                    Mobile Apps
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* 7. Status & Relocation Badges */}
            <FadeUp delay={0.52} className="pt-1">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <div
                  className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200/90 bg-emerald-50 text-xs sm:text-sm font-semibold text-emerald-800 w-fit shadow-2xs leading-normal"
                  style={{ padding: "0.55rem 1.25rem" }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Available for Remote Internships</span>
                </div>

                <div
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-blue-50 text-xs sm:text-sm font-semibold text-blue-800 w-fit shadow-2xs leading-normal"
                  style={{ padding: "0.55rem 1.25rem" }}
                >
                  <MapPin size={14} className="text-blue-600 shrink-0" />
                  <span>Delhi, India · Open to Relocate for summer internships</span>
                </div>
              </div>
            </FadeUp>

          </div>

          {/* ── Right Column: Original Profile Photo (col-span-5) ── */}
          <div className="flex justify-center items-center order-1 lg:order-2 lg:col-span-5">
            <FadeUp delay={0.2} className="w-full flex justify-center lg:justify-end">
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative w-[280px] h-[354px] sm:w-[340px] sm:h-[430px] md:w-[380px] md:h-[481px] lg:w-[420px] lg:h-[530px]"
              >
                {/* Subtle soft grounding shadow */}
                <div className="absolute inset-x-8 bottom-1 h-8 bg-black/10 rounded-full blur-xl -z-10" />

                {/* Original, complete profile picture */}
                <Image
                  src="/profile.png"
                  alt="Shambhavi Goel"
                  fill
                  sizes="(max-width: 768px) 340px, (max-width: 1024px) 380px, 420px"
                  className="object-contain object-bottom drop-shadow-xl"
                  priority
                />
              </motion.div>
            </FadeUp>
          </div>

        </div>
      </Container>
    </section>
  );
}
