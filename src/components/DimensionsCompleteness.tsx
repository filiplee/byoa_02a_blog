import {
  getDailyDimensionsFilledCount,
  DAILY_DIMENSION_KEYS,
  DAILY_DIMENSION_LABELS,
} from "@/lib/posts";
import type { Post } from "@/lib/posts";

interface DimensionsCompletenessProps {
  post: Post;
  className?: string;
  /** Show which dimensions are hit vs missed (for front page preview) */
  showBreakdown?: boolean;
}

export function DimensionsCompleteness({
  post,
  className = "",
  showBreakdown = false,
}: DimensionsCompletenessProps) {
  if (post.type !== "daily" || !post.dimensions) return null;

  const filled = getDailyDimensionsFilledCount(post);
  const total = DAILY_DIMENSION_KEYS.length;
  const complete = filled === total;

  const badge = (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${complete ? "bg-[var(--mint-soft)] text-[var(--mint)]" : "bg-[var(--lemon-soft)] text-[var(--lemon)]"} ${className}`}
      title={`${filled} of ${total} dimensions filled`}
    >
      {filled}/{total}
    </span>
  );

  if (!showBreakdown) return badge;

  const items = DAILY_DIMENSION_KEYS.map((key) => {
    const isFilled = (post.dimensions![key]?.trim() ?? "").length > 0;
    const label = DAILY_DIMENSION_LABELS[key];
    return { key, label, isFilled };
  });

  return (
    <span className="inline-flex flex-col gap-0.5">
      {badge}
      <span className="text-xs text-[var(--muted)] flex flex-col gap-0.5" aria-label="Dimensions hit and missed">
        {items.map(({ key, label, isFilled }) => (
          <span
            key={key}
            className={isFilled ? "text-[var(--mint)]" : "text-[var(--muted)] opacity-70"}
          >
            {label} {isFilled ? "✓" : "—"}
          </span>
        ))}
      </span>
    </span>
  );
}
