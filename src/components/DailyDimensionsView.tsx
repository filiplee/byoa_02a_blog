import {
  DAILY_DIMENSION_KEYS,
  DAILY_DIMENSION_LABELS,
  type DailyDimensions,
} from "@/lib/posts";

const DIMENSION_STYLES: Record<(typeof DAILY_DIMENSION_KEYS)[number], string> = {
  personalProject: "border-l-[var(--violet)] bg-[var(--violet-soft)]",
  healthWellness: "border-l-[var(--mint)] bg-[var(--mint-soft)]",
  work: "border-l-[var(--sky)] bg-[var(--sky-soft)]",
  familyFriendship: "border-l-[var(--coral)] bg-[var(--coral-soft)]",
};

interface DailyDimensionsViewProps {
  dimensions: DailyDimensions;
  /** Show empty state (e.g. "—" or "Nothing today") for unfilled dimensions */
  showEmptyState?: boolean;
}

export function DailyDimensionsView({
  dimensions,
  showEmptyState = true,
}: DailyDimensionsViewProps) {
  return (
    <div className="space-y-4" role="list" aria-label="Daily update dimensions">
      {DAILY_DIMENSION_KEYS.map((key) => {
        const value = dimensions[key]?.trim() ?? "";
        const isEmpty = value.length === 0;
        const display = isEmpty && showEmptyState ? "—" : value || "—";

        return (
          <section
            key={key}
            className={`rounded-r-md border-l-4 py-3 px-4 ${DIMENSION_STYLES[key]} ${isEmpty && showEmptyState ? "opacity-80" : ""}`}
            aria-labelledby={`dimension-${key}`}
          >
            <h3
              id={`dimension-${key}`}
              className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-1.5"
            >
              {DAILY_DIMENSION_LABELS[key]}
            </h3>
            <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
              {display}
            </p>
          </section>
        );
      })}
    </div>
  );
}
