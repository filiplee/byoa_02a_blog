import { Suspense } from "react";
import { getAllPosts, type PostType } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

interface HomeProps {
  searchParams: Promise<{ filter?: string }>;
}

function PostList({ filter }: { filter?: string }) {
  const all = getAllPosts();
  const posts =
    filter === "daily" || filter === "weekly"
      ? all.filter((p) => p.type === (filter as PostType))
      : all;

  return (
    <ul className="space-y-12">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const { filter } = await searchParams;

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          Posts
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          {filter === "daily"
            ? "Daily notes and updates."
            : filter === "weekly"
              ? "Weekly round-ups and look-backs."
              : "Daily posts and weekly round-ups."}
        </p>
      </div>
      <Suspense fallback={<div className="text-[var(--muted)]">Loading…</div>}>
        <PostList filter={filter} />
      </Suspense>
    </div>
  );
}
