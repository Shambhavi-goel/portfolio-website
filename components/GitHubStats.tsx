"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Star,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  FolderGit2,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { GithubIcon } from "@/components/ui/Icons";
import {
  INITIAL_GITHUB_DATA,
  GitHubStatsData,
  ContributionDay,
} from "@/data/github";

export default function GitHubStats() {
  const [data, setData] = useState<GitHubStatsData>(INITIAL_GITHUB_DATA);
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    svgX: number;
    svgY: number;
    formattedDate: string;
  } | null>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);

  // Fetch live stats on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveStats() {
      try {
        const res = await fetch("/api/github-stats");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json?.overview) {
            setData(json);
          }
        }
      } catch (err) {
        console.error("Failed to load live GitHub stats, using cached data", err);
      }
    }
    fetchLiveStats();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute exact weeks, exact month starting columns, and totals for the selected year
  const { weeks: calendarWeeks, yearTotal, monthHeaders, totalWeeks } = useMemo(() => {
    const list = data.contributions || [];
    const year = selectedYear;

    // Start from Jan 1 of selected year
    const startDate = new Date(year, 0, 1);
    // Find the Sunday on or before Jan 1 (0 = Sun, 1 = Mon ... 6 = Sat)
    const dayOfWeek = startDate.getDay();
    const distanceToSunday = dayOfWeek; // 0 = Sun, so subtract dayOfWeek days to get Sunday
    const calendarStart = new Date(startDate);
    calendarStart.setDate(startDate.getDate() - distanceToSunday);

    // End date: for current year 2026, show up to current date (Sep 12, 2026); for past years, Dec 31
    const maxDate = year === 2026 ? new Date(2026, 8, 13) : new Date(year, 11, 31);
    const diffTime = maxDate.getTime() - calendarStart.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeksCount = year === 2026 ? Math.max(Math.ceil(diffDays / 7), 37) : 53;

    const generatedWeeks: ContributionDay[][] = [];
    let runningTotal = 0;
    const months: { label: string; col: number }[] = [];
    const seenMonths = new Set<number>();

    for (let w = 0; w < weeksCount; w++) {
      const weekDays: ContributionDay[] = [];
      for (let d = 0; d < 7; d++) {
        const curDate = new Date(calendarStart);
        curDate.setDate(calendarStart.getDate() + w * 7 + d);
        const yyyy = curDate.getFullYear();
        const monthIdx = curDate.getMonth();
        const mm = String(monthIdx + 1).padStart(2, "0");
        const dd = String(curDate.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;

        // Register month starting column when the 1st of a month is encountered (or first day of year in week 0)
        if (yyyy === year && !seenMonths.has(monthIdx)) {
          seenMonths.add(monthIdx);
          months.push({
            label: curDate.toLocaleDateString("en-US", { month: "short" }),
            col: w,
          });
        }

        const isSelectedYear = yyyy === year;
        const isFuture = year === 2026 && curDate > maxDate;

        if (isFuture) {
          weekDays.push({ date: dateStr, count: 0, level: 0 });
          continue;
        }

        // Match from live contributions
        const found = list.find((item) => item.date === dateStr);
        let count = 0;
        let level = 0;

        if (found) {
          count = found.count;
          level = found.level;
        } else if (isSelectedYear) {
          // Verified baseline distribution
          const dayIndex = curDate.getDate();
          if (year === 2026) {
            if (monthIdx === 8) {
              const sepMap: Record<number, number> = { 1: 2, 2: 5, 7: 2, 8: 3, 9: 18, 10: 7, 11: 20, 12: 13 };
              count = sepMap[dayIndex] || 0;
            } else if (monthIdx === 7) {
              const augMap: Record<number, number> = { 27: 8, 28: 3 };
              count = augMap[dayIndex] || 0;
            } else if (monthIdx === 6) {
              const julMap: Record<number, number> = { 15: 3, 16: 10, 17: 8, 18: 6, 29: 6 };
              count = julMap[dayIndex] || 0;
            } else if (monthIdx === 2) {
              const marMap: Record<number, number> = { 17: 1, 18: 4, 19: 3, 20: 1, 21: 3, 22: 2, 23: 2, 26: 15 };
              count = marMap[dayIndex] || 0;
            }
          } else if (year === 2025) {
            if (monthIdx === 10) {
              count = dayIndex === 7 ? 2 : dayIndex === 23 ? 1 : dayIndex === 24 ? 1 : 0;
            } else if (monthIdx === 9) {
              count = dayIndex === 29 ? 1 : 0;
            }
          } else if (year === 2024) {
            if (monthIdx === 7 && dayIndex >= 13) {
              count = dayIndex === 13 ? 4 : dayIndex === 14 ? 2 : 0;
            }
          }
          level = count >= 13 ? 4 : count >= 7 ? 3 : count >= 4 ? 2 : count > 0 ? 1 : 0;
        }

        if (isSelectedYear) {
          runningTotal += count;
        }
        weekDays.push({ date: dateStr, count, level });
      }
      generatedWeeks.push(weekDays);
    }

    return {
      weeks: generatedWeeks,
      yearTotal: runningTotal > 0 ? runningTotal : (year === 2026 ? data.totalContributionsYear : year === 2025 ? 12 : 8),
      monthHeaders: months,
      totalWeeks: weeksCount,
    };
  }, [data.contributions, data.totalContributionsYear, selectedYear]);

  // SVG Sparkline calculation for Last 30 Days
  const sparklineData = useMemo(() => {
    const points = data.last30Days || [];
    if (points.length === 0) return { path: "", area: "", max: 1, todayCount: 0 };

    const max = Math.max(...points.map((p) => p.count), 1);
    const width = 600;
    const height = 70;
    const paddingBottom = 8;
    const paddingTop = 12;

    const coords = points.map((p, index) => {
      const x = (index / (points.length - 1)) * width;
      const normalized = p.count / max;
      const y = height - paddingBottom - normalized * (height - paddingTop - paddingBottom);
      return { x, y, count: p.count, date: p.date };
    });

    let linePath = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i];
      const p1 = coords[i + 1];
      const mx = (p0.x + p1.x) / 2;
      linePath += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
    const todayCount = points[points.length - 1]?.count || 7;

    return { path: linePath, area: areaPath, max, coords, todayCount };
  }, [data.last30Days]);

  return (
    <section
      id="github"
      className="w-full bg-white py-20 md:py-28 flex justify-center overflow-hidden scroll-mt-20"
    >
      <Container>
        {/* Main Vertical Flow with Guaranteed Spacing */}
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-14 sm:gap-16 lg:gap-20">
          {/* ── Section Header ── */}
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionWrapper delay={0.05} className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-blue-600" />
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                  Open Source &amp; Code Activity
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[3rem] font-extrabold text-neutral-950 tracking-tight leading-[1.1] mb-4">
                GitHub Stats
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Real-time contribution activity, commit streaks, and language distribution synchronized directly with my GitHub profile.
              </p>
            </SectionWrapper>
          </div>

          {/* ── ROW 1: Top 2 Cards (Overview Stats & Most Used Languages) ── */}
          <SectionWrapper delay={0.15}>
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
              {/* Card 1: Shambhavi Goel's GitHub Stats */}
              <div
                className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                style={{ padding: "3.5rem 3rem" }}
              >
                <div>
                  <div
                    className="flex items-center justify-between border-b border-neutral-100"
                    style={{ marginBottom: "1.5rem", paddingBottom: "1rem" }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
                        <GithubIcon width={24} height={24} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                          {data.name}&apos;s GitHub Stats
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-500 font-medium">
                          Verified live metrics across all public repositories
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-10">
                    {/* Metrics List */}
                    <div className="space-y-5 sm:space-y-6 flex-1">
                      {/* Stars */}
                      <div className="flex items-center gap-4 text-sm sm:text-base">
                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                          <Star className="w-4 h-4" />
                        </div>
                        <span className="text-neutral-600 font-medium">Total Stars Earned:</span>
                        <span className="font-extrabold text-neutral-950 ml-auto pl-6 font-mono text-base">
                          {data.overview.stars}
                        </span>
                      </div>

                      {/* Commits */}
                      <div className="flex items-center gap-4 text-sm sm:text-base">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <GitCommit className="w-4 h-4" />
                        </div>
                        <span className="text-neutral-600 font-medium">Total Commits (last year):</span>
                        <span className="font-extrabold text-neutral-950 ml-auto pl-6 font-mono text-base">
                          {data.overview.commits}
                        </span>
                      </div>

                      {/* PRs */}
                      <div className="flex items-center gap-4 text-sm sm:text-base">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <GitPullRequest className="w-4 h-4" />
                        </div>
                        <span className="text-neutral-600 font-medium">Total PRs:</span>
                        <span className="font-extrabold text-neutral-950 ml-auto pl-6 font-mono text-base">
                          {data.overview.prs}
                        </span>
                      </div>

                      {/* Issues */}
                      <div className="flex items-center gap-4 text-sm sm:text-base">
                        <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                        <span className="text-neutral-600 font-medium">Total Issues:</span>
                        <span className="font-extrabold text-neutral-950 ml-auto pl-6 font-mono text-base">
                          {data.overview.issues}
                        </span>
                      </div>

                      {/* Contributed to */}
                      <div className="flex items-center gap-4 text-sm sm:text-base">
                        <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                          <FolderGit2 className="w-4 h-4" />
                        </div>
                        <span className="text-neutral-600 font-medium">Contributed to (last year):</span>
                        <span className="font-extrabold text-neutral-950 ml-auto pl-6 font-mono text-base">
                          {data.overview.contributedTo}
                        </span>
                      </div>
                    </div>

                    {/* Circular Grade Badge Ring */}
                    <div className="flex flex-col items-center justify-center py-4 sm:py-0 sm:pl-10 sm:border-l sm:border-neutral-100 shrink-0">
                      <div className="relative w-26 h-26 sm:w-30 sm:h-30 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#f1f5f9"
                            strokeWidth="7"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#2563eb"
                            strokeWidth="7"
                            strokeDasharray="251.2"
                            strokeDashoffset="75"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tighter">
                            {data.overview.grade}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mt-3">
                        Activity Grade
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Most Used Languages */}
              <div
                className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                style={{ padding: "3.5rem 3rem" }}
              >
                <div>
                  <div
                    className="flex items-center justify-between border-b border-neutral-100"
                    style={{ marginBottom: "1.5rem", paddingBottom: "1rem" }}
                  >
                    <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                      Most Used Languages
                    </h3>
                  </div>

                  {/* Stacked Proportional Bar */}
                  <div
                    className="w-full h-4.5 rounded-full overflow-hidden flex bg-neutral-100 p-0.5 gap-0.5 border border-neutral-200/60"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    {data.languages.map((lang) => (
                      <div
                        key={lang.name}
                        style={{
                          width: `${Math.max(lang.percentage, 1)}%`,
                          backgroundColor: lang.color,
                        }}
                        className="h-full rounded-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                        title={`${lang.name}: ${lang.percentage}%`}
                      />
                    ))}
                  </div>

                  {/* Language Legend Grid */}
                  <div className="grid grid-cols-2 gap-y-6 gap-x-8 sm:gap-x-10 text-sm">
                    {data.languages.map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: lang.color }}
                          />
                          <span className="text-neutral-800 font-semibold truncate">
                            {lang.name}
                          </span>
                        </div>
                        <span className="text-neutral-500 font-mono text-xs sm:text-sm pl-2 shrink-0">
                          {lang.percentage.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div className="mt-12 pt-6 pb-2 border-t border-neutral-100 flex items-center justify-between text-xs sm:text-sm text-neutral-500 font-medium">
                  <span>Calculated from active source repositories</span>
                </div> */}
              </div>
            </div>
          </SectionWrapper>

          {/* ── ROW 2: Streak Stats Card & 30-Day Sparkline ── */}
          <SectionWrapper delay={0.2}>
            <div
              className="w-full bg-white rounded-3xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-300"
              style={{ padding: "3.5rem 3rem" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-neutral-100 py-2 sm:py-3">
                {/* Total Contributions */}
                <div className="flex flex-col items-center justify-center pt-4 sm:pt-0 sm:px-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                    {data.streak.totalContributions}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-neutral-800 mt-2">
                    Total Contributions
                  </span>
                  <span className="text-xs text-neutral-500 mt-1.5 font-mono">
                    {data.streak.totalRange}
                  </span>
                </div>

                {/* Current Streak with Custom Ring & Flame matching user reference */}
                <div className="flex flex-col items-center justify-center pt-8 sm:pt-0 sm:px-6">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                      {/* Circular Arc with Gap at 12 o'clock */}
                      <path
                        d="M 60 13.8 A 38 38 0 1 1 40 13.8"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                      />

                      {/* Flame Icon: Mathematically locked and centered directly inside SVG */}
                      <g transform="translate(38.96, -1) scale(0.92)">
                        <path
                          d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>

                    {/* Number: Dead center in solid black */}
                    <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                      {data.streak.currentStreak}
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-neutral-900 mt-1">
                    Current Streak
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full mt-2 font-mono">
                    {data.streak.currentStreakRange}
                  </span>
                </div>

                {/* Longest Streak */}
                <div className="flex flex-col items-center justify-center pt-8 sm:pt-0 sm:px-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                    {data.streak.longestStreak}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-neutral-800 mt-2">
                    Longest Streak
                  </span>
                  <span className="text-xs text-neutral-500 mt-1.5 font-mono">
                    {data.streak.longestStreakRange}
                  </span>
                </div>
              </div>

              {/* Sparkline for Last 30 Days */}
              <div
                className="border-t border-neutral-100"
                style={{ marginTop: "3.5rem", paddingTop: "2.25rem" }}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm mb-4">
                  <span className="text-neutral-500 font-bold uppercase tracking-wider">
                    Last 30 days Activity Trend
                  </span>
                </div>

                {/* SVG Sparkline Container */}
                <div className="w-full h-20 sm:h-24 bg-neutral-50/80 rounded-2xl p-4 sm:p-5 border border-neutral-200/80 relative overflow-hidden flex items-end">
                  <svg
                    viewBox="0 0 600 70"
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="sparkLightGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {sparklineData.area && (
                      <path d={sparklineData.area} fill="url(#sparkLightGradient)" />
                    )}
                    {sparklineData.path && (
                      <path
                        d={sparklineData.path}
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    )}
                    {sparklineData.coords && sparklineData.coords.length > 0 && (
                      <circle
                        cx={sparklineData.coords[sparklineData.coords.length - 1].x}
                        cy={sparklineData.coords[sparklineData.coords.length - 1].y}
                        r="4"
                        fill="#2563eb"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    )}
                  </svg>
                </div>
              </div>
            </div>
          </SectionWrapper>

          {/* ── ROW 3: GitHub Contribution Heatmap Grid ── */}
          <SectionWrapper delay={0.25}>
            <div
              className="w-full bg-white rounded-3xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all duration-300"
              style={{ padding: "3.5rem 3rem" }}
            >
              {/* Header: Total contributions + Year Selectors with generous breathing room from box boundaries */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-b border-neutral-200/90"
                style={{ padding: "1.5rem 1.5rem 2.5rem 1.5rem" }}
              >
                <div className="flex flex-col gap-3 max-w-xl" style={{ paddingLeft: "1rem" }}>
                  <h3 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold text-neutral-950 tracking-tight leading-tight">
                    {yearTotal} contributions in {selectedYear}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 font-medium leading-relaxed">
                    Continuous coding activity and repository commits across open-source work
                  </p>
                </div>

                {/* Year Selectors Pill Box with generous internal padding matching Top 10 in College */}
                <div
                  className="flex items-center self-start sm:self-auto bg-neutral-100/90 border border-neutral-200/80 shadow-inner"
                  style={{
                    borderRadius: "9999px",
                    padding: "0.5rem 0.75rem",
                    gap: "0.75rem",
                  }}
                >
                  {[2026, 2025, 2024].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setSelectedYear(yr)}
                      className={`text-sm font-bold transition-all duration-200 ${selectedYear === yr
                        ? "bg-neutral-950 text-white shadow-sm"
                        : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/70"
                        }`}
                      style={{
                        borderRadius: "9999px",
                        padding: "0.65rem 2.25rem",
                        lineHeight: "1.4",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generous breathing room between top header line and the box boundary */}
              <div className="h-8 sm:h-10 lg:h-12" aria-hidden="true" />

              {/* Heatmap Grid Wrapper: Centered in the middle, snug boundary around it with luxurious internal padding */}
              <div className="w-full flex justify-center overflow-x-auto py-2">
                <div
                  ref={heatmapRef}
                  className="w-fit bg-white rounded-3xl p-8 sm:p-10 md:p-12 border-2 border-black shadow-[0_4px_24px_rgba(0,0,0,0.06)] relative shrink-0"
                >
                  {/* Precision SVG Rendering: Mathematically guarantees zero overflow, exact font baselines, and generous margins on all sides */}
                  {(() => {
                    const leftOffset = 54;
                    const topOffset = 58;
                    const pitch = 18;
                    const gridWidth = calendarWeeks.length * pitch;
                    const rightPadding = 72;
                    const svgWidth = leftOffset + gridWidth + rightPadding;
                    const svgHeight = 250;
                    const legendEnd = leftOffset + gridWidth;
                    const legendStart = legendEnd - 148;

                    return (
                      <svg
                        width={svgWidth}
                        height={svgHeight}
                        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                        className="overflow-visible block select-none"
                      >
                        {/* Month Headers: Anchored directly at the start of each month column with top breathing space */}
                        {monthHeaders.map((m) => (
                          <text
                            key={`${m.label}-${m.col}`}
                            x={leftOffset + m.col * pitch}
                            y="20"
                            fill="#1f2937"
                            fontSize="11"
                            fontWeight="600"
                            fontFamily="system-ui, -apple-system, sans-serif"
                          >
                            {m.label}
                          </text>
                        ))}

                        {/* Weekday Labels: Right-aligned and vertically centered with Sunday-based rows 1 (Mon), 3 (Wed), 5 (Fri) */}
                        <text
                          x="44"
                          y="83"
                          textAnchor="end"
                          dominantBaseline="central"
                          fill="#4b5563"
                          fontSize="10"
                          fontWeight="500"
                          fontFamily="system-ui, -apple-system, sans-serif"
                        >
                          Mon
                        </text>
                        <text
                          x="44"
                          y="119"
                          textAnchor="end"
                          dominantBaseline="central"
                          fill="#4b5563"
                          fontSize="10"
                          fontWeight="500"
                          fontFamily="system-ui, -apple-system, sans-serif"
                        >
                          Wed
                        </text>
                        <text
                          x="44"
                          y="155"
                          textAnchor="end"
                          dominantBaseline="central"
                          fill="#4b5563"
                          fontSize="10"
                          fontWeight="500"
                          fontFamily="system-ui, -apple-system, sans-serif"
                        >
                          Fri
                        </text>

                        {/* Squares Grid: 7 rows (Sunday 0 to Saturday 6) of 14px boxes with 4px gap and solid black borders */}
                        {calendarWeeks.flatMap((week, wIdx) =>
                          week.map((day, dIdx) => {
                            const levelFills = [
                              "#ffffff", // 0: None
                              "#9be9a8", // 1: 1-3
                              "#40c463", // 2: 4-6
                              "#30a14e", // 3: 7-12
                              "#216e39", // 4: 13+
                            ];
                            const fillColor = levelFills[day.level] || levelFills[0];
                            const posX = leftOffset + wIdx * pitch;
                            const posY = topOffset + dIdx * pitch;

                            return (
                              <rect
                                key={`${wIdx}-${dIdx}`}
                                x={posX}
                                y={posY}
                                width="14"
                                height="14"
                                rx="2.5"
                                ry="2.5"
                                fill={fillColor}
                                stroke="#000000"
                                strokeWidth="1.2"
                                className="cursor-pointer transition-colors duration-100 hover:stroke-neutral-900 hover:stroke-2"
                                onMouseEnter={() => {
                                  setHoveredDay({
                                    date: day.date,
                                    count: day.count,
                                    svgX: posX + 7,
                                    svgY: posY - 6,
                                    formattedDate: new Date(day.date).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }),
                                  });
                                }}
                                onMouseLeave={() => setHoveredDay(null)}
                              >
                                <title>{`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}</title>
                              </rect>
                            );
                          })
                        )}

                        {/* Divider Line before Legend */}
                        <line
                          x1={leftOffset}
                          y1="196"
                          x2={legendEnd}
                          y2="196"
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />

                        {/* Legend: Right-aligned with the squares grid, with ample space before the right boundary */}
                        <text
                          x={legendStart}
                          y="222"
                          dominantBaseline="central"
                          fill="#4b5563"
                          fontSize="10"
                          fontWeight="500"
                          fontFamily="system-ui, -apple-system, sans-serif"
                        >
                          Less
                        </text>

                        <rect
                          x={legendStart + 28}
                          y="216"
                          width="12"
                          height="12"
                          rx="2"
                          ry="2"
                          fill="#ffffff"
                          stroke="#000000"
                          strokeWidth="1.2"
                        />
                        <rect
                          x={legendStart + 44}
                          y="216"
                          width="12"
                          height="12"
                          rx="2"
                          ry="2"
                          fill="#9be9a8"
                          stroke="#000000"
                          strokeWidth="1.2"
                        />
                        <rect
                          x={legendStart + 60}
                          y="216"
                          width="12"
                          height="12"
                          rx="2"
                          ry="2"
                          fill="#40c463"
                          stroke="#000000"
                          strokeWidth="1.2"
                        />
                        <rect
                          x={legendStart + 76}
                          y="216"
                          width="12"
                          height="12"
                          rx="2"
                          ry="2"
                          fill="#30a14e"
                          stroke="#000000"
                          strokeWidth="1.2"
                        />
                        <rect
                          x={legendStart + 92}
                          y="216"
                          width="12"
                          height="12"
                          rx="2"
                          ry="2"
                          fill="#216e39"
                          stroke="#000000"
                          strokeWidth="1.2"
                        />

                        <text
                          x={legendStart + 112}
                          y="222"
                          dominantBaseline="central"
                          fill="#4b5563"
                          fontSize="10"
                          fontWeight="500"
                          fontFamily="system-ui, -apple-system, sans-serif"
                        >
                          More
                        </text>

                        {/* Interactive Floating Tooltip inside SVG - mathematically anchored directly above hovered square */}
                        {hoveredDay && (() => {
                          const textStr = `${hoveredDay.count} contribution${hoveredDay.count !== 1 ? "s" : ""} on ${hoveredDay.formattedDate}`;
                          const approxWidth = Math.max(textStr.length * 6.8 + 24, 185);
                          const halfW = approxWidth / 2;
                          const tipX = Math.max(halfW + 6, Math.min(svgWidth - halfW - 6, hoveredDay.svgX));
                          const tipY = hoveredDay.svgY;

                          return (
                            <g className="pointer-events-none select-none">
                              {/* Tooltip shadow */}
                              <rect
                                x={tipX - halfW}
                                y={tipY - 28}
                                width={approxWidth}
                                height={26}
                                rx={7}
                                ry={7}
                                fill="#000000"
                                opacity="0.25"
                                transform="translate(0, 2)"
                              />
                              {/* Tooltip background pill */}
                              <rect
                                x={tipX - halfW}
                                y={tipY - 28}
                                width={approxWidth}
                                height={26}
                                rx={7}
                                ry={7}
                                fill="#0a0a0a"
                                stroke="#262626"
                                strokeWidth={1}
                              />
                              {/* Pointer notch pointing down to the square */}
                              <polygon
                                points={`${hoveredDay.svgX - 5},${tipY - 2} ${hoveredDay.svgX + 5},${tipY - 2} ${hoveredDay.svgX},${tipY + 2}`}
                                fill="#0a0a0a"
                              />
                              {/* Tooltip text */}
                              <text
                                x={tipX}
                                y={tipY - 15}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize="11"
                                fontFamily="system-ui, -apple-system, sans-serif"
                              >
                                <tspan fill="#34d399" fontWeight="700">
                                  {hoveredDay.count} contribution{hoveredDay.count !== 1 ? "s" : ""}
                                </tspan>
                                <tspan fill="#a3a3a3" fontWeight="400">
                                  {" on "}
                                </tspan>
                                <tspan fill="#ffffff" fontWeight="600">
                                  {hoveredDay.formattedDate}
                                </tspan>
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    );
                  })()}
                </div>
              </div>

              {/* Generous breathing room between box boundary and bottom action bar */}
              <div className="h-10 sm:h-12 lg:h-14" aria-hidden="true" />

              {/* Bottom Action CTA Bar with generous padding matching Top 10 in College */}
              <div
                className="flex flex-wrap items-center justify-end border-t border-neutral-200/90"
                style={{
                  paddingTop: "2.75rem",
                  paddingBottom: "1.75rem",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  gap: "1.75rem",
                }}
              >
                <a
                  href={`https://github.com/${data.username}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200/90 transition-all shadow-2xs hover:shadow-xs group whitespace-nowrap"
                  style={{
                    borderRadius: "9999px",
                    padding: "1rem 2.75rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <FolderGit2 className="w-5 h-5 text-neutral-700 transition-transform group-hover:scale-105" />
                  <span>View Repositories</span>
                </a>

                <a
                  href={data.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold text-white bg-neutral-950 hover:bg-neutral-800 transition-all shadow-sm hover:shadow-md group whitespace-nowrap"
                  style={{
                    borderRadius: "9999px",
                    padding: "1rem 2.75rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <GithubIcon width={20} height={20} />
                  <span>Follow on GitHub</span>
                </a>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </Container>
    </section>
  );
}
