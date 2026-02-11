import { getDailyDimensionsFilledCount } from "@/lib/posts";
import { DAILY_DIMENSION_KEYS } from "@/lib/posts";
import type { Post } from "@/lib/posts";

interface DimensionsCompletenessProps {
  post: Post;
  className?: string;
}

export function DimensionsCompleteness({ post, className = "" }: DimensionsCompletenessProps) {
  if (post.type !== "daily" || !post.dimensions) return null;

  const filled = getDailyDimensionsFilledCount(post);
  const total = DAILY_DIMENSION_KEYS.length;
  const complete = filled === total;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${complete ? "bg-[var(--mint-soft)] text-[var(--mint)]" : "bg-[var(--lemon-soft)] text-[var(--lemon)]"} ${className}`}
      title={`${filled} of ${total} dimensions filled`}
    >
      {filled}/{total}
    </span>
  );
}
