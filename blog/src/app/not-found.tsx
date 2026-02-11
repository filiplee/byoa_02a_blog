import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold text-[var(--foreground)]">
        Page not found
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        The post or page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-[var(--sky)] hover:underline"
      >
        Back to posts
      </Link>
    </div>
  );
}
