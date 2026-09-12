// ─────────────────────────────────────────────────────────────
// data/dsa.ts — Data Structures, Algorithms & Competitive Programming Journey
// ─────────────────────────────────────────────────────────────

export interface DSAProfile {
  id: string;
  name: string;
  handle: string;
  url: string;
  image: string;
  tagline: string;
  stats: string;
  badge: string;
  badgeColor: string;
  cardBorder: string;
  accentBg: string;
  textColor: string;
  gradient: string;
  glowColor: string;
  description: string;
  longDescription: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  tags: string[];
}

export const DSA_OVERVIEW_STATS = [
  {
    value: "168+",
    label: "Problems Solved",
    subtext: "Across LeetCode, GFG & Codeforces",
    border: "border-emerald-100/90 hover:border-emerald-300",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    value: "Rank #8",
    label: "Institute Rank (GFG)",
    subtext: "Faculty of Technology, DU",
    border: "border-purple-100/90 hover:border-purple-300",
    iconBg: "bg-purple-50 text-purple-600",
  },
  {
    value: "12+ Topics",
    label: "Algorithmic Patterns",
    subtext: "From Arrays to DP & Graph Theory",
    border: "border-blue-100/90 hover:border-blue-300",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    value: "C++ & Python",
    label: "Core Languages",
    subtext: "Mastered STL, Memory & Complexity",
    border: "border-orange-100/90 hover:border-orange-300",
    iconBg: "bg-orange-50 text-orange-600",
  },
];

export const DSA_PROFILES: DSAProfile[] = [
  {
    id: "leetcode",
    name: "LeetCode",
    handle: "Pokemon_sg",
    url: "https://leetcode.com/u/Pokemon_sg/",
    image: "/LeetCode.png",
    tagline: "Consistent problem solver with 70+ algorithmic problems solved across Easy & Medium tiers.",
    stats: "70+ Problems Solved",
    badge: "Consistent Solver",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200/80",
    cardBorder: "border-amber-100/90 hover:border-amber-300",
    accentBg: "bg-amber-50 text-amber-600",
    textColor: "text-amber-600",
    gradient: "from-amber-950/80 via-neutral-900 to-neutral-950",
    glowColor: "rgba(245, 158, 11, 0.15)",
    description:
      "Structured algorithmic problem solving focusing on Dynamic Programming, Two Pointers, Tree Traversals, and Binary Search.",
    longDescription:
      "Active problem solver on LeetCode with 70+ accepted solutions. Focuses on mastering recurring interview patterns including sliding window, prefix sums, binary search on answer, tree and graph DFS/BFS, and memoized dynamic programming. Emphasizes clean C++ and Python implementations with optimal time and space complexity bounds.",
    metrics: [
      { label: "Problems Solved", value: "70+" },
      { label: "Easy & Medium", value: "46 & 26" },
      { label: "Primary Stack", value: "C++ / Python" },
    ],
    highlights: [
      "Solved 70+ curated problems across standard Blind 75 and LeetCode Top Interview patterns.",
      "Balanced ratio of 46 Easy and 26 Medium problems demonstrating progressive complexity mastery.",
    ],
    tags: ["Dynamic Programming", "Two Pointers", "Trees & Graphs", "Binary Search", "Sliding Window"],
  },
  {
    id: "geeksforgeeks",
    name: "GeeksforGeeks",
    handle: "shambhavikikp",
    url: "https://www.geeksforgeeks.org/profile/shambhavikikp?tab=activity",
    image: "/gfg.png",
    tagline: "Rank #8 at Faculty of Technology, Delhi University with a 123 coding score.",
    stats: "Rank #8 · Score 123",
    badge: "Top 10 in College",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    cardBorder: "border-emerald-100/90 hover:border-emerald-300",
    accentBg: "bg-emerald-50 text-emerald-600",
    textColor: "text-emerald-600",
    gradient: "from-emerald-950/80 via-neutral-900 to-neutral-950",
    glowColor: "rgba(16, 185, 129, 0.15)",
    description:
      "Extensive foundational data structures practice achieving Top 10 college ranking. Practiced arrays, recursion, linked lists, and bit manipulation.",
    longDescription:
      "Ranked #8 at Faculty of Technology (University of Delhi) on GeeksforGeeks with a coding score of 123 and 65+ problems solved. Demonstrates strong foundational grasp over classical data structures including doubly linked lists, binary heaps, recursion trees, matrix operations, and bitwise logic.",
    metrics: [
      { label: "Problems Solved", value: "65+" },
      { label: "Institute Rank", value: "#8 FoT DU" },
      { label: "Coding Score", value: "123" },
    ],
    highlights: [
      "Attained Institute Rank #8 among all students at Faculty of Technology, University of Delhi.",
      "Accumulated 123 coding score across core data structures and algorithmic challenges.",
      "Deep practice in recursion, linked list manipulation, matrix algorithms, and bitwise tricks.",
    ],
    tags: ["Arrays & Matrices", "Recursion", "Hashing", "Linked Lists", "Bit Magic", "Sorting"],
  },
  {
    id: "codeforces",
    name: "Codeforces",
    handle: "Pokemon_sg",
    url: "https://codeforces.com/profile/Pokemon_sg",
    image: "/codeforces.png",
    tagline: "Algorithmic problem solver practicing speed, constructive logic, and mathematical optimization.",
    stats: "Algorithmic Problem Solving",
    badge: "Logic & Math DSA",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200/80",
    cardBorder: "border-blue-100/90 hover:border-blue-300",
    accentBg: "bg-blue-50 text-blue-600",
    textColor: "text-blue-600",
    gradient: "from-blue-950/80 via-neutral-900 to-neutral-950",
    glowColor: "rgba(59, 130, 246, 0.15)",
    description:
      "Rigorous algorithmic problem solving developing intuition for mathematical proofs, greedy strategies, constructive algorithms, and sub-second execution limits.",
    longDescription:
      "Active problem solver on Codeforces sharpening speed, mathematical deduction, and edge-case handling. Focuses on constructive algorithms, number theory, modular arithmetic, and greedy heuristics coded cleanly in C++ using the Standard Template Library (STL).",
    metrics: [
      { label: "Core Focus", value: "Speed & Logic" },
      { label: "Techniques", value: "Greedy & Math" },
      { label: "Language Stack", value: "C++ (STL)" },
    ],
    highlights: [
      "Regular algorithmic practice to develop rapid problem classification and edge-case detection.",
      "High proficiency with C++ STL containers (vectors, sets, maps, priority queues, binary search).",
      "Rigorous emphasis on edge-case detection, off-by-one errors, and boundary constraints.",
    ],
    tags: ["Greedy Algorithms", "Number Theory", "Constructive Problems", "Optimization", "C++ STL"],
  },
];

export const CORE_DSA_TOPICS = [
  "Arrays & Hashing",
  "Two Pointers & Sliding Window",
  "Binary Search",
  "Trees & Binary Search Trees",
  "Graphs, BFS & DFS",
  "Dynamic Programming",
  "Greedy Algorithms",
  "Recursion & Backtracking",
  "Heap & Priority Queue",
  "Bit Manipulation",
  "Linked Lists",
  "Math & Number Theory",
];
