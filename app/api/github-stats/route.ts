import { NextResponse } from "next/server";
import { INITIAL_GITHUB_DATA, GitHubStatsData, ContributionDay } from "@/data/github";

export const revalidate = 3600; // ISR cache for 1 hour

const USERNAME = "Shambhavi-goel";

export async function GET() {
  try {
    const headers = {
      "User-Agent": "Portfolio-App-NextJS",
      Accept: "application/vnd.github.v3+json",
    };

    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${USERNAME}`, {
      headers,
      next: { revalidate: 3600 },
    });

    let profileData: any = null;
    if (userRes.ok) {
      profileData = await userRes.json();
    }

    // 2. Fetch Contributions
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      {
        headers: { "User-Agent": "Portfolio-App-NextJS" },
        next: { revalidate: 3600 },
      }
    );

    let contributions: ContributionDay[] = [];
    let totalContributionsYear = INITIAL_GITHUB_DATA.totalContributionsYear;

    if (contribRes.ok) {
      const contribData = await contribRes.json();
      if (Array.isArray(contribData?.contributions)) {
        contributions = contribData.contributions.map((c: any) => ({
          date: c.date,
          count: Number(c.count) || 0,
          level: Number(c.level) || 0,
        }));
      }
      if (contribData?.total?.lastYear) {
        totalContributionsYear = Number(contribData.total.lastYear);
      }
    }

    // 3. Fetch Repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    let totalStars = 0;
    let repoCount = profileData?.public_repos ?? INITIAL_GITHUB_DATA.overview.contributedTo;
    let languageCounts: Record<string, number> = {};

    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        repos.forEach((repo: any) => {
          totalStars += Number(repo.stargazers_count) || 0;
        });

        // Fetch precise byte-level language distribution across all repositories
        try {
          const langPromises = repos.map(async (repo: any) => {
            if (!repo.languages_url) return;
            try {
              const lRes = await fetch(repo.languages_url, {
                headers,
                next: { revalidate: 3600 },
              });
              if (lRes.ok) {
                const lData = await lRes.json();
                for (const [langName, bytes] of Object.entries(lData)) {
                  languageCounts[langName] = (languageCounts[langName] || 0) + Number(bytes);
                }
              }
            } catch {
              // fallback if individual call fails
              if (repo.language) {
                languageCounts[repo.language] = (languageCounts[repo.language] || 0) + (repo.size || 1);
              }
            }
          });
          await Promise.all(langPromises);
        } catch {
          // ignore
        }
      }
    }

    // Calculate streak stats if contributions array is available
    let currentStreak = INITIAL_GITHUB_DATA.streak.currentStreak;
    let currentStreakRange = INITIAL_GITHUB_DATA.streak.currentStreakRange;
    let longestStreak = INITIAL_GITHUB_DATA.streak.longestStreak;
    let longestStreakRange = INITIAL_GITHUB_DATA.streak.longestStreakRange;
    let last30Days = INITIAL_GITHUB_DATA.last30Days;

    if (contributions.length > 0) {
      // Last 30 days sparkline
      const slice30 = contributions.slice(-30);
      last30Days = slice30.map((item) => {
        const d = new Date(item.date);
        const month = d.toLocaleDateString("en-US", { month: "short" });
        const day = String(d.getDate()).padStart(2, "0");
        return {
          date: `${month} ${day}`,
          count: item.count,
        };
      });

      // Calculate streaks
      let current = 0;
      let curStart = "";
      let curEnd = "";
      let maxStreak = 0;
      let maxStart = "";
      let maxEnd = "";

      let tempStreak = 0;
      let tempStart = "";

      // Walk through contributions in chronological order
      for (let i = 0; i < contributions.length; i++) {
        const day = contributions[i];
        if (day.count > 0) {
          if (tempStreak === 0) tempStart = day.date;
          tempStreak++;
          if (tempStreak > maxStreak) {
            maxStreak = tempStreak;
            maxStart = tempStart;
            maxEnd = day.date;
          }
        } else {
          tempStreak = 0;
        }
      }

      // Calculate current streak backwards from today/yesterday
      let i = contributions.length - 1;
      // Allow current day to have 0 if checked early in the morning
      if (i >= 0 && contributions[i].count === 0 && i - 1 >= 0 && contributions[i - 1].count > 0) {
        i--;
      }

      while (i >= 0 && contributions[i].count > 0) {
        if (current === 0) curEnd = contributions[i].date;
        current++;
        curStart = contributions[i].date;
        i--;
      }

      const formatDateRange = (s: string, e: string) => {
        if (!s || !e) return "";
        const sD = new Date(s);
        const eD = new Date(e);
        const sM = sD.toLocaleDateString("en-US", { month: "short" });
        const eM = eD.toLocaleDateString("en-US", { month: "short" });
        return `${sM} ${sD.getDate()} - ${eM} ${eD.getDate()}`;
      };

      if (current > 0) {
        currentStreak = current;
        currentStreakRange = formatDateRange(curStart, curEnd);
      }
      if (maxStreak > 0) {
        longestStreak = maxStreak;
        longestStreakRange = formatDateRange(maxStart, maxEnd);
      }
    }

    // Languages calculation with nice color matching
    const languageColorMap: Record<string, string> = {
      TypeScript: "#3178c6",
      Python: "#3572A5",
      "C++": "#f34b7d",
      JavaScript: "#f1e05a",
      CSS: "#563d7c",
      HTML: "#e34c26",
      Shell: "#89e051",
      "Jupyter Notebook": "#DA5B0B",
      C: "#555555",
      Java: "#b07219",
      Go: "#00ADD8",
      Rust: "#dea584",
    };

    let languages = INITIAL_GITHUB_DATA.languages;
    const totalLangBytes = Object.values(languageCounts).reduce((a, b) => a + b, 0);
    if (totalLangBytes > 0 && Object.keys(languageCounts).length > 3) {
      languages = Object.entries(languageCounts)
        .map(([name, count]) => ({
          name,
          percentage: Number(((count / totalLangBytes) * 100).toFixed(2)),
          color: languageColorMap[name] || "#6e7681",
        }))
        .filter((lang) => lang.percentage >= 0.05)
        .sort((a, b) => b.percentage - a.percentage);
    }

    const payload: GitHubStatsData = {
      username: USERNAME,
      name: profileData?.name || INITIAL_GITHUB_DATA.name,
      avatarUrl: profileData?.avatar_url || INITIAL_GITHUB_DATA.avatarUrl,
      htmlUrl: profileData?.html_url || INITIAL_GITHUB_DATA.htmlUrl,
      overview: {
        stars: totalStars,
        commits: totalContributionsYear > 0 ? totalContributionsYear - 13 : INITIAL_GITHUB_DATA.overview.commits,
        prs: 1,
        issues: 0,
        contributedTo: repoCount || INITIAL_GITHUB_DATA.overview.contributedTo,
        grade: "C",
      },
      languages,
      streak: {
        totalContributions: totalContributionsYear,
        totalRange: INITIAL_GITHUB_DATA.streak.totalRange,
        currentStreak,
        currentStreakRange,
        longestStreak,
        longestStreakRange,
      },
      last30Days,
      contributions,
      totalContributionsYear,
      year: 2026,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error fetching live GitHub stats:", error);
    return NextResponse.json(INITIAL_GITHUB_DATA);
  }
}
