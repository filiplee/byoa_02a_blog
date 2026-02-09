export type PostType = "daily" | "weekly";

/** Daily posts can optionally fill these 4 dimensions to force a balanced update. */
export const DAILY_DIMENSION_KEYS = [
  "personalProject",
  "healthWellness",
  "work",
  "familyFriendship",
] as const;

export type DailyDimensionKey = (typeof DAILY_DIMENSION_KEYS)[number];

export const DAILY_DIMENSION_LABELS: Record<DailyDimensionKey, string> = {
  personalProject: "Personal / project",
  healthWellness: "Health / wellness",
  work: "Work",
  familyFriendship: "Family / friendship",
};

export interface DailyDimensions {
  personalProject: string;
  healthWellness: string;
  work: string;
  familyFriendship: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  type: PostType;
  body: string;
  /** For daily posts: structured update across 4 dimensions. Optional; if missing, only body is shown. */
  dimensions?: DailyDimensions;
}

// Sample posts – in a real app you'd load from MD/MDX or a CMS
export const posts: Post[] = [
  {
    slug: "week-in-review-feb-3-9",
    title: "Week in review: 3–9 Feb",
    excerpt: "A look back at the week: wins, learnings, and what’s next.",
    date: "2025-02-09",
    type: "weekly",
    body: `This week was about consistency. I shipped small improvements every day and kept the main goal in sight.

**Highlights**
- Shipped the new onboarding flow and saw completion rate go up.
- Fixed the long-standing bug in the export feature.
- Started the design system doc so the team can align on components.

**Learnings**
- Breaking work into same-day chunks works better than multi-day tasks for me.
- A short walk before deep work makes a real difference.

**Next week**
- Launch the beta invite and gather feedback.
- Finalise the design system and add the missing tokens.`,
  },
  {
    slug: "daily-feb-9",
    title: "Monday, 9 February",
    excerpt: "Clearing the deck and setting the tone for the week.",
    date: "2025-02-09",
    type: "daily",
    body: "",
    dimensions: {
      personalProject: "Sketched the week ahead in the notebook. No side-project time today.",
      healthWellness: "Morning walk. Decent sleep. Ate properly.",
      work: "Cleared email and calendar, blocked morning for beta launch checklist. Finished checklist and got first invite batch ready. Afternoon: support and small fixes.",
      familyFriendship: "Quick call with Mum. Dinner with flatmates.",
    },
  },
  {
    slug: "daily-feb-8",
    title: "Sunday, 8 February",
    excerpt: "A quiet day of reading and planning.",
    date: "2025-02-08",
    type: "daily",
    body: "Sometimes the best “productivity” is not doing much and letting the mind reset. Back at it tomorrow.",
    dimensions: {
      personalProject: "Read for an hour. No project work—intentional rest.",
      healthWellness: "Long walk, no screens for most of the day. Early night.",
      work: "Nothing. Day off.",
      familyFriendship: "Lunch with a friend. Chilled at home with family.",
    },
  },
  {
    slug: "daily-feb-7",
    title: "Saturday, 7 February",
    excerpt: "Side project progress and an afternoon offline.",
    date: "2025-02-07",
    type: "daily",
    body: "",
    dimensions: {
      personalProject: "Side project: got auth flow working and first API hooked up. Felt good to see it come together.",
      healthWellness: "Gym in the morning. Afternoon outside, no screens.",
      work: "Checked Slack once. No real work.",
      familyFriendship: "Rest of the day offline—just people and outside.",
    },
  },
  {
    slug: "daily-feb-6",
    title: "Friday, 6 February",
    excerpt: "Wrapped the week with docs and a team sync.",
    date: "2025-02-06",
    type: "daily",
    body: "We decided to ship the beta invite next Monday.",
    dimensions: {
      personalProject: "Didn't touch side project. Focused on day job.",
      healthWellness: "Short walk at lunch. Slept okay.",
      work: "Wrote design system overview, added core components to the doc. Team sync and short retro.",
      familyFriendship: "Drinks after work with the team.",
    },
  },

  {
    slug: "daily-feb-5",
    title: "Thursday, 5 February",
    excerpt: "Export bug fixed and a bit of refactor.",
    date: "2025-02-05",
    type: "daily",
    body: "",
    dimensions: {
      personalProject: "",
      healthWellness: "Lunch at desk (bad). Did get a walk later.",
      work: "Finally fixed the export bug—timezone edge case in the date formatter. One-line fix after hours of digging. Small refactor on settings page.",
      familyFriendship: "Nothing specific. Long day.",
    },
  },
  {
    slug: "daily-feb-4",
    title: "Wednesday, 4 February",
    excerpt: "Onboarding tweaks and first metrics.",
    date: "2025-02-04",
    type: "daily",
    body: "Will give it a few more days before calling the onboarding win definitive.",
    dimensions: {
      personalProject: "Half an hour on the side project—just planning.",
      healthWellness: "Good sleep. Ate well. No exercise.",
      work: "Shipped updated onboarding flow. Early numbers look good—completion rate up. Rest of day: support and UI polish.",
      familyFriendship: "Coffee with a former colleague.",
    },
  },
  {
    slug: "week-in-review-jan-27-feb-2",
    title: "Week in review: 27 Jan – 2 Feb",
    excerpt: "Reflecting on the past week and what’s ahead.",
    date: "2025-02-02",
    type: "weekly",
    body: `A solid week of execution. The main theme was “finish what we started.”

**Shipped**
- Onboarding flow v2 (design and copy)
- Export fixes (in progress)
- Design system doc (first draft)

**Reflections**
- We’re close to beta. One more week of polish and we can invite the first users.
- I want to get better at writing these round-ups so they’re useful later—not just lists but actual reflections.

**Next week**
- Ship onboarding and monitor completion.
- Fix the export bug and ship.
- Prep beta invite list and messaging.`,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostsByType(type: PostType): Post[] {
  return getAllPosts().filter((p) => p.type === type);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getDailyDimensionsFilledCount(post: Post): number {
  if (post.type !== "daily" || !post.dimensions) return 0;
  return DAILY_DIMENSION_KEYS.filter(
    (key) => post.dimensions![key]?.trim().length > 0
  ).length;
}
