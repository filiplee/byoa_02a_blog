import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import { PostBadge } from "./PostBadge";
import { DimensionsCompleteness } from "./DimensionsCompleteness";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/post/${post.slug}`} className="block">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)] mb-1.5">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-[var(--border)]">·</span>
          <PostBadge type={post.type} />
          <DimensionsCompleteness post={post} />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--sky)] transition-colors">
          {post.title}
        </h2>
        <p className="mt-1.5 text-[var(--muted)] leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </Link>
    </article>
  );
}
