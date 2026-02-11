"use client";

import Script from "next/script";

const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO;
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Comments";
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

const isConfigured =
  GISCUS_REPO &&
  GISCUS_REPO_ID &&
  GISCUS_CATEGORY_ID;

export function Comments() {
  if (!isConfigured) {
    return (
      <section
        className="mt-12 pt-8 border-t border-[var(--border)]"
        aria-label="Comments"
      >
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
          Comments
        </h2>
        <p className="text-sm text-[var(--muted)]">
          To enable comments, set up Giscus and add{" "}
          <code className="rounded bg-[var(--border)] px-1.5 py-0.5 text-xs">
            NEXT_PUBLIC_GISCUS_REPO
          </code>
          ,{" "}
          <code className="rounded bg-[var(--border)] px-1.5 py-0.5 text-xs">
            NEXT_PUBLIC_GISCUS_REPO_ID
          </code>
          , and{" "}
          <code className="rounded bg-[var(--border)] px-1.5 py-0.5 text-xs">
            NEXT_PUBLIC_GISCUS_CATEGORY_ID
          </code>{" "}
          in your <code className="rounded bg-[var(--border)] px-1.5 py-0.5 text-xs">.env.local</code>.
          Get your IDs at{" "}
          <a
            href="https://giscus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sky)] hover:underline"
          >
            giscus.app
          </a>
          .
        </p>
      </section>
    );
  }

  return (
    <section
      className="mt-12 pt-8 border-t border-[var(--border)]"
      aria-label="Comments"
    >
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
        Comments
      </h2>
      <Script
        src="https://giscus.app/client.js"
        data-repo={GISCUS_REPO}
        data-repo-id={GISCUS_REPO_ID}
        data-category={GISCUS_CATEGORY}
        data-category-id={GISCUS_CATEGORY_ID}
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light"
        data-lang="en"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    </section>
  );
}
