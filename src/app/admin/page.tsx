"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleNewPost(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/new-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || `Error ${res.status}`);
        return;
      }
      setStatus("success");
      setMessage(`Created ${data.filename}. You can edit it in your repo or add a link here later.`);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Request failed");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          ← Back to posts
        </Link>
      </div>
      <h1 className="text-2xl font-semibold text-[var(--foreground)]">
        Admin – New post
      </h1>
      <form onSubmit={handleNewPost} className="space-y-4 max-w-sm">
        <div>
          <label
            htmlFor="secret"
            className="block text-sm font-medium text-[var(--foreground)] mb-1"
          >
            Admin secret
          </label>
          <input
            id="secret"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="From BLOG_ADMIN_SECRET"
            className="w-full px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 rounded-md bg-[var(--sky)] text-white font-medium hover:opacity-90 disabled:opacity-50"
        >
          {status === "loading" ? "Creating…" : "New post"}
        </button>
      </form>
      {message && (
        <p
          className={
            status === "error"
              ? "text-[var(--coral)]"
              : "text-[var(--mint)]"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}
