export interface GitHubOverviewStats {
  stars: number;
  commits: number;
  prs: number;
  issues: number;
  contributedTo: number;
  grade: string;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface StreakStats {
  totalContributions: number;
  totalRange: string;
  currentStreak: number;
  currentStreakRange: string;
  longestStreak: number;
  longestStreakRange: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0 to 4
}

export interface SparklinePoint {
  date: string;
  count: number;
}

export interface GitHubStatsData {
  username: string;
  name: string;
  avatarUrl: string;
  htmlUrl: string;
  overview: GitHubOverviewStats;
  languages: LanguageStat[];
  streak: StreakStats;
  last30Days: SparklinePoint[];
  contributions: ContributionDay[];
  totalContributionsYear: number;
  year: number;
  updatedAt: string;
}

// Initial baseline verified dataset matching live GitHub activity
export const INITIAL_GITHUB_DATA: GitHubStatsData = {
  username: "Shambhavi-goel",
  name: "Shambhavi Goel",
  avatarUrl: "https://avatars.githubusercontent.com/u/178323856?v=4",
  htmlUrl: "https://github.com/Shambhavi-goel",
  overview: {
    stars: 0,
    commits: 169,
    prs: 1,
    issues: 0,
    contributedTo: 7,
    grade: "C",
  },
  languages: [
    { name: "TypeScript", percentage: 77.33, color: "#3178c6" },
    { name: "Python", percentage: 12.68, color: "#3572A5" },
    { name: "C++", percentage: 7.17, color: "#f34b7d" },
    { name: "JavaScript", percentage: 1.34, color: "#f1e05a" },
    { name: "CSS", percentage: 1.33, color: "#563d7c" },
    { name: "HTML", percentage: 0.15, color: "#e34c26" },
  ],
  streak: {
    totalContributions: 182,
    totalRange: "Aug 13, 2024 - Present",
    currentStreak: 6,
    currentStreakRange: "Sep 7 - Sep 12",
    longestStreak: 7,
    longestStreakRange: "Mar 17 - Mar 23",
  },
  last30Days: [
    { date: "Aug 14", count: 0 },
    { date: "Aug 15", count: 0 },
    { date: "Aug 16", count: 0 },
    { date: "Aug 17", count: 2 },
    { date: "Aug 18", count: 0 },
    { date: "Aug 19", count: 0 },
    { date: "Aug 20", count: 0 },
    { date: "Aug 21", count: 0 },
    { date: "Aug 22", count: 0 },
    { date: "Aug 23", count: 0 },
    { date: "Aug 24", count: 0 },
    { date: "Aug 25", count: 0 },
    { date: "Aug 26", count: 0 },
    { date: "Aug 27", count: 8 },
    { date: "Aug 28", count: 3 },
    { date: "Aug 29", count: 0 },
    { date: "Aug 30", count: 0 },
    { date: "Aug 31", count: 0 },
    { date: "Sep 01", count: 2 },
    { date: "Sep 02", count: 5 },
    { date: "Sep 03", count: 0 },
    { date: "Sep 04", count: 0 },
    { date: "Sep 05", count: 0 },
    { date: "Sep 06", count: 0 },
    { date: "Sep 07", count: 2 },
    { date: "Sep 08", count: 3 },
    { date: "Sep 09", count: 18 },
    { date: "Sep 10", count: 7 },
    { date: "Sep 11", count: 20 },
    { date: "Sep 12", count: 13 },
  ],
  contributions: [], // dynamically loaded or generated
  totalContributionsYear: 182,
  year: 2026,
  updatedAt: new Date().toISOString(),
};
