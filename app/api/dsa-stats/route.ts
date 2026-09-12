import { NextResponse } from "next/server";

// Cache response for 1 hour (3600 seconds)
export const revalidate = 3600;

interface PlatformStats {
  leetcode: {
    solved: number;
    easy: number;
    medium: number;
    hard: number;
  };
  geeksforgeeks: {
    solved: number;
    score: number;
    rank: number;
  };
  codeforces: {
    solved: number;
    submissions: number;
  };
  totalSolved: number;
}

export async function GET() {
  // Baseline fallback numbers in case any platform API is down
  const stats: PlatformStats = {
    leetcode: {
      solved: 72,
      easy: 46,
      medium: 26,
      hard: 0,
    },
    geeksforgeeks: {
      solved: 65,
      score: 123,
      rank: 8,
    },
    codeforces: {
      solved: 31,
      submissions: 78,
    },
    totalSolved: 168,
  };

  try {
    const results = await Promise.allSettled([
      // 1. LeetCode GraphQL API
      (async () => {
        const res = await fetch("https://leetcode.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
          body: JSON.stringify({
            query: `query getUserProfile($username: String!) {
              matchedUser(username: $username) {
                submitStats {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
            }`,
            variables: { username: "Pokemon_sg" },
          }),
          next: { revalidate: 3600 },
        });

        if (res.ok) {
          const data = await res.json();
          const list = data?.data?.matchedUser?.submitStats?.acSubmissionNum;
          if (Array.isArray(list)) {
            list.forEach((item: { difficulty: string; count: number }) => {
              if (item.difficulty === "All") stats.leetcode.solved = item.count;
              if (item.difficulty === "Easy") stats.leetcode.easy = item.count;
              if (item.difficulty === "Medium") stats.leetcode.medium = item.count;
              if (item.difficulty === "Hard") stats.leetcode.hard = item.count;
            });
          }
        }
      })(),

      // 2. GeeksforGeeks Profile Data
      (async () => {
        const res = await fetch("https://www.geeksforgeeks.org/profile/shambhavikikp", {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
          next: { revalidate: 3600 },
        });

        if (res.ok) {
          const html = await res.text();
          const scoreMatch = html.match(/"score":\s*(\d+)/);
          const solvedMatch = html.match(/"total_problems_solved":\s*(\d+)/);
          const rankMatch = html.match(/"institute_rank":\s*(\d+)/);

          if (scoreMatch) stats.geeksforgeeks.score = parseInt(scoreMatch[1], 10);
          if (solvedMatch) stats.geeksforgeeks.solved = parseInt(solvedMatch[1], 10);
          if (rankMatch) stats.geeksforgeeks.rank = parseInt(rankMatch[1], 10);
        }
      })(),

      // 3. Codeforces Public REST API
      (async () => {
        const res = await fetch("https://codeforces.com/api/user.status?handle=Pokemon_sg", {
          next: { revalidate: 3600 },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.status === "OK" && Array.isArray(data.result)) {
            const solved = new Set(
              data.result
                .filter((s: { verdict: string }) => s.verdict === "OK")
                .map(
                  (s: { problem: { contestId?: number; index?: string } }) =>
                    `${s.problem?.contestId ?? 0}_${s.problem?.index ?? ""}`
                )
            );
            stats.codeforces.solved = solved.size;
            stats.codeforces.submissions = data.result.length;
          }
        }
      })(),
    ]);

    // Recalculate combined total solved
    stats.totalSolved =
      stats.leetcode.solved + stats.geeksforgeeks.solved + stats.codeforces.solved;

    return NextResponse.json({
      success: true,
      data: stats,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    // If any unexpected error occurs, safely return fallback baseline
    stats.totalSolved =
      stats.leetcode.solved + stats.geeksforgeeks.solved + stats.codeforces.solved;

    return NextResponse.json({
      success: false,
      data: stats,
      error: error instanceof Error ? error.message : "Unknown error",
      updatedAt: new Date().toISOString(),
    });
  }
}
