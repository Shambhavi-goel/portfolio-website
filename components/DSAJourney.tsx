"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Trophy,
  Code2,
  CheckCircle2,
  Layers,
  Flame,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Container from "@/components/ui/Container";
import { LeetCodeIcon, GeeksforGeeksIcon, CodeforcesIcon } from "@/components/ui/Icons";
import {
  DSA_PROFILES,
  CORE_DSA_TOPICS,
  type DSAProfile,
} from "@/data/dsa";
import DSAModal from "@/components/DSAModal";

interface LiveStatsData {
  leetcode?: {
    solved: number;
    easy: number;
    medium: number;
    hard: number;
  };
  geeksforgeeks?: {
    solved: number;
    score: number;
    rank: number;
  };
  codeforces?: {
    solved: number;
    submissions: number;
  };
  totalSolved?: number;
}

const platformIcons: Record<string, React.ElementType> = {
  leetcode: LeetCodeIcon,
  geeksforgeeks: GeeksforGeeksIcon,
  codeforces: CodeforcesIcon,
};

export default function DSAJourney() {
  const [selectedProfile, setSelectedProfile] = useState<DSAProfile | null>(null);
  const [liveStats, setLiveStats] = useState<LiveStatsData | null>(null);

  // Silently fetch fresh stats from cached Next.js API route on mount
  useEffect(() => {
    fetch("/api/dsa-stats")
      .then((res) => res.json())
      .then((payload) => {
        if (payload?.success && payload?.data) {
          setLiveStats(payload.data);
        }
      })
      .catch(() => {
        // Silently preserve baseline static numbers if offline
      });
  }, []);

  // Compute live updated 4 top stats
  const currentTopStats = useMemo(() => {
    const totalCount = liveStats?.totalSolved ?? 168;
    const gfgRank = liveStats?.geeksforgeeks?.rank ?? 8;

    return [
      {
        value: `${totalCount}+`,
        label: "Problems Solved",
        subtext: "Across LeetCode, GFG & Codeforces",
        border: "border-emerald-100/90 hover:border-emerald-300",
        iconBg: "bg-emerald-50 text-emerald-600",
        icon: CheckCircle2,
      },
      {
        value: `Rank #${gfgRank}`,
        label: "Institute Rank (GFG)",
        subtext: "Faculty of Technology, DU",
        border: "border-purple-100/90 hover:border-purple-300",
        iconBg: "bg-purple-50 text-purple-600",
        icon: Trophy,
      },
      {
        value: "12+ Topics",
        label: "Algorithmic Patterns",
        subtext: "From Arrays to DP & Graph Theory",
        border: "border-blue-100/90 hover:border-blue-300",
        iconBg: "bg-blue-50 text-blue-600",
        icon: Layers,
      },
      {
        value: "C++ & Python",
        label: "Core Languages",
        subtext: "Mastered STL, Memory & Complexity",
        border: "border-orange-100/90 hover:border-orange-300",
        iconBg: "bg-orange-50 text-orange-600",
        icon: Code2,
      },
    ];
  }, [liveStats]);

  // Compute live updated profile objects
  const profiles = useMemo(() => {
    return DSA_PROFILES.map((profile) => {
      if (profile.id === "leetcode" && liveStats?.leetcode) {
        return {
          ...profile,
          stats: `${liveStats.leetcode.solved}+ Problems Solved`,
          metrics: [
            { label: "Problems Solved", value: `${liveStats.leetcode.solved}+` },
            { label: "Easy & Medium", value: `${liveStats.leetcode.easy} & ${liveStats.leetcode.medium}` },
            { label: "Primary Stack", value: "C++ / Python" },
          ],
        };
      }

      if (profile.id === "geeksforgeeks" && liveStats?.geeksforgeeks) {
        return {
          ...profile,
          stats: `Rank #${liveStats.geeksforgeeks.rank} · Score ${liveStats.geeksforgeeks.score}`,
          metrics: [
            { label: "Problems Solved", value: `${liveStats.geeksforgeeks.solved}+` },
            { label: "Institute Rank", value: `#${liveStats.geeksforgeeks.rank} FoT DU` },
            { label: "Coding Score", value: `${liveStats.geeksforgeeks.score}` },
          ],
        };
      }

      if (profile.id === "codeforces" && liveStats?.codeforces) {
        return {
          ...profile,
          metrics: [
            { label: "Core Focus", value: "Speed & Logic" },
            { label: "Solved Problems", value: `${liveStats.codeforces.solved}+` },
            { label: "Language Stack", value: "C++ (STL)" },
          ],
        };
      }

      return profile;
    });
  }, [liveStats]);

  return (
    <>
      <section
        id="dsa"
        className="w-full bg-white py-20 md:py-28 flex justify-center overflow-hidden"
      >
        <Container>
          <div className="w-full max-w-6xl mx-auto flex flex-col gap-14 sm:gap-16 lg:gap-20">
            {/* ── Section Header ── */}
            <div className="w-full">
              <SectionWrapper delay={0.05} className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-[2px] bg-blue-600" />
                  <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                    Problem Solving &amp; Algorithms
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-extrabold text-neutral-950 tracking-tight leading-[1.1] mb-4">
                  DSA Journey
                </h2>
                <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl">
                  Rigorous problem-solving and algorithmic optimization across competitive platforms,
                  mastering data structures, complexity bounds, and core engineering logic.
                </p>
              </SectionWrapper>
            </div>

            {/* ── 4 Top Stat Cards (Dynamically Updated) ── */}
            <SectionWrapper delay={0.15}>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                {currentTopStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -2 }}
                    className={`portfolio-card flex items-center gap-4 bg-white border ${stat.border} transition-all duration-200 rounded-3xl shadow-xs hover:shadow-md`}
                    style={{ padding: "clamp(1.5rem, 2.2vw, 2.25rem)" }}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center shrink-0`}
                    >
                      <stat.icon size={22} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-none">
                        {stat.value}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-900 font-semibold mt-2 leading-tight">
                        {stat.label}
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-1.5 leading-tight font-medium">
                        {stat.subtext}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </SectionWrapper>

            {/* ── 3 Main Platform Profile Cards (Matching Projects & Certificates View) ── */}
            <SectionWrapper delay={0.2}>
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {profiles.map((profile: DSAProfile) => {
                  return (
                    <article
                      key={profile.id}
                      onClick={() => setSelectedProfile(profile)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedProfile(profile);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`View ${profile.name} profile details: ${profile.stats}`}
                      className="flex flex-col w-full rounded-[24px] sm:rounded-[28px] overflow-hidden group cursor-pointer bg-white border border-neutral-200/90 shadow-md hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      style={{ padding: "clamp(1.15rem, 2vw, 1.45rem)" }}
                    >
                      {/* Elegant Landscape Frame matching Projects & Certificates Section */}
                      <div
                        className="relative w-full aspect-[16/10] rounded-[18px] sm:rounded-[20px] overflow-hidden bg-neutral-100/90 border border-neutral-200/90 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] flex items-center justify-center p-[clamp(0.75rem,1.5vw,1.1rem)]"
                      >
                        {/* Real Profile Screenshot Image Container */}
                        <div className="relative w-full h-full rounded-[10px] sm:rounded-[12px] overflow-hidden shadow-xs bg-neutral-900">
                          <Image
                            src={profile.image}
                            alt={`${profile.name} profile - @${profile.handle}`}
                            fill
                            sizes="(max-width: 640px) 340px, (max-width: 1024px) 480px, 500px"
                            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          />
                        </div>

                        {/* Top-Right Expand Indicator on Hover (Just like Projects/Certificates) */}
                        <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <span className="w-8 h-8 rounded-full bg-neutral-950/75 text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md">
                            <ArrowUpRight size={15} strokeWidth={2.2} />
                          </span>
                        </div>

                        {/* Top-Left Category / Status Badge with generous padding */}
                        <div className="absolute top-5 left-5 z-10 pointer-events-none flex items-center gap-2">
                          <span
                            className="inline-flex items-center justify-center rounded-full text-xs font-bold bg-neutral-950/80 backdrop-blur-md text-white border border-white/20 shadow-xs"
                            style={{ padding: "0.45rem 1.15rem", lineHeight: "1.4" }}
                          >
                            {profile.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content Area with Generous Spacing & High Readability */}
                      <div
                        className="flex flex-col flex-1 justify-between gap-4"
                        style={{
                          paddingTop: "1.25rem",
                          paddingBottom: "0.35rem",
                          paddingLeft: "0.45rem",
                          paddingRight: "0.45rem",
                        }}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <h3 className="text-base sm:text-lg md:text-[1.15rem] font-bold text-neutral-950 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                              {profile.name}
                            </h3>
                            <span className="text-xs font-mono text-neutral-400">
                              @{profile.handle}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed font-normal">
                            {profile.tagline || profile.description}
                          </p>
                        </div>

                        <div className="pt-3.5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2.5">
                          <div className="flex flex-wrap gap-2">
                            {profile.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center text-xs font-semibold text-neutral-700 bg-neutral-100/90 border border-neutral-200/80 shadow-2xs"
                                style={{ padding: "0.35rem 0.85rem", borderRadius: "0.5rem", lineHeight: "1.4" }}
                              >
                                {tag}
                              </span>
                            ))}
                            {profile.tags.length > 3 && (
                              <span
                                className="inline-flex items-center text-xs font-semibold text-neutral-500 bg-neutral-100 border border-neutral-200/60"
                                style={{ padding: "0.35rem 0.65rem", borderRadius: "0.5rem", lineHeight: "1.4" }}
                              >
                                +{profile.tags.length - 3}
                              </span>
                            )}
                          </div>

                          <span className="text-xs font-semibold text-neutral-500 group-hover:text-blue-600 inline-flex items-center gap-1 transition-colors">
                            <span>View Details</span>
                            <ArrowUpRight size={13} />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </SectionWrapper>

            {/* ── Core Algorithmic Competencies (Matching Skills Section Tech Cloud) ── */}
            <SectionWrapper delay={0.25}>
              <div
                className="portfolio-card bg-white border border-neutral-200/80 rounded-3xl shadow-xs w-full"
                style={{ padding: "clamp(2rem, 3.5vw, 3rem)" }}
              >
                {/* Header with Flame Icon, Title & Subtitle */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 mb-7 sm:mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Flame size={22} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight">
                      Core Algorithmic Competencies
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-2xl">
                      Focused on optimal time-complexity bounds (O(1), O(log N), O(N)), space reuse, and edge-case validation using C++ and Python.
                    </p>
                  </div>
                </div>

                {/* Generous spacing between the description text and the pills */}
                <div
                  className="flex flex-wrap gap-3 sm:gap-3.5"
                  style={{ marginTop: "1.25rem" }}
                >
                  {CORE_DSA_TOPICS.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center text-xs sm:text-sm font-semibold text-neutral-700 bg-neutral-50 border border-neutral-200/90 rounded-full hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/40 transition-colors shadow-2xs"
                      style={{ padding: "0.5rem 1.25rem", lineHeight: "1.4" }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          </div>
        </Container>
      </section>

      {/* Profile Detail Modal (Receives live dynamic stats) */}
      <DSAModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </>
  );
}
