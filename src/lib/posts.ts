import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function parsePostFile(filePath: string): Post {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const dimensions = data.dimensions as DailyDimensions | undefined;
  if (dimensions && typeof dimensions === "object") {
    // Ensure all dimension keys exist (gray-matter may omit empty/missing)
    const normalized: DailyDimensions = {
      personalProject: dimensions.personalProject ?? "",
      healthWellness: dimensions.healthWellness ?? "",
      work: dimensions.work ?? "",
      familyFriendship: dimensions.familyFriendship ?? "",
    };
    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      type: data.type,
      body: (content ?? "").trim(),
      dimensions: normalized,
    };
  }

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    type: data.type,
    body: (content ?? "").trim(),
  };
}

function loadAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR);
  const posts: Post[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const filePath = path.join(POSTS_DIR, file);
    try {
      posts.push(parsePostFile(filePath));
    } catch (e) {
      console.warn(`Skipping invalid post file: ${file}`, e);
    }
  }
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  const files = fs.existsSync(POSTS_DIR) ? fs.readdirSync(POSTS_DIR) : [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const filePath = path.join(POSTS_DIR, file);
    const post = parsePostFile(filePath);
    if (post.slug === slug) return post;
  }
  return undefined;
}

export function getAllPosts(): Post[] {
  return loadAllPosts().sort(
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
