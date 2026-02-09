import type { PostType } from "@/lib/posts";

interface PostBadgeProps {
  type: PostType;
  className?: string;
}

const styles: Record<PostType, string> = {
  daily: "bg-[var(--sky-soft)] text-[var(--sky)]",
  weekly: "bg-[var(--lemon-soft)] text-[var(--lemon)]",
};

export function PostBadge({ type, className = "" }: PostBadgeProps) {
  const label = type === "daily" ? "Daily" : "Weekly round-up";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[type]} ${className}`}
    >
      {label}
    </span>
  );
}
