import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllPosts,
  formatDate,
} from "@/lib/posts";
import { PostBadge } from "@/components/PostBadge";
import { PostBody } from "@/components/PostBody";
import { DailyDimensionsView } from "@/components/DailyDimensionsView";
import { DimensionsCompleteness } from "@/components/DimensionsCompleteness";
import { Comments } from "@/components/Comments";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/"
        className="text-sm text-[var(--muted)] hover:text-[var(--sky)] transition-colors"
      >
        ← Back to posts
      </Link>
      <header className="mt-6 mb-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)] mb-2">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="text-[var(--border)]">·</span>
          <PostBadge type={post.type} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-3 text-lg text-[var(--muted)] leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>
      <div className="text-[var(--foreground)]">
        {post.type === "daily" && post.dimensions ? (
          <>
            <div className="mb-6 flex items-center gap-2">
              <span className="text-sm font-medium text-[var(--muted)]">Dimensions</span>
              <DimensionsCompleteness post={post} />
            </div>
            <DailyDimensionsView dimensions={post.dimensions} />
            {post.body?.trim() ? (
              <div className="mt-8 pt-6 border-t border-[var(--border)]">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
                  Notes
                </h2>
                <PostBody body={post.body} />
              </div>
            ) : null}
          </>
        ) : (
          <PostBody body={post.body} />
        )}
      </div>
      <Comments />
    </article>
  );
}
