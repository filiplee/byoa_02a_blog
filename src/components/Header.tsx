import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-5">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--foreground)] hover:text-[var(--sky)] transition-colors"
        >
          Blog
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link
            href="/?filter=daily"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Daily
          </Link>
          <Link
            href="/?filter=weekly"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Weekly
          </Link>
        </nav>
      </div>
    </header>
  );
}
