import { NextResponse } from "next/server";

const MONTH_NAMES = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];
const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

const GITHUB_OWNER = "filiplee";
const GITHUB_REPO = "byoa_02a_blog";
const GITHUB_BRANCH = "main";

export async function POST(request: Request) {
  const secret = process.env.BLOG_ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Admin not configured" },
      { status: 500 }
    );
  }

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  let body: { secret?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid body" },
      { status: 400 }
    );
  }

  if (body.secret !== secret) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const now = new Date();
  const day = now.getDate();
  const month = MONTH_NAMES[now.getMonth()];
  const dayName = DAY_NAMES[now.getDay()];
  const dateStr = now.toISOString().split("T")[0];
  const slug = `daily-${month}-${day}`;
  const filename = `${slug}.md`;
  const githubPath = `content/posts/${filename}`;

  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${githubPath}`;
  const githubHeaders = {
    Authorization: `Bearer ${githubToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Check whether this post already exists in the repo
  const existingRes = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, {
    headers: githubHeaders,
  });
  if (existingRes.status === 200) {
    return NextResponse.json(
      { error: `Post already exists: ${filename}` },
      { status: 409 }
    );
  }
  if (existingRes.status !== 404) {
    const errText = await existingRes.text();
    return NextResponse.json(
      { error: `GitHub check failed: ${existingRes.status} ${errText}` },
      { status: 502 }
    );
  }

  const title = `${dayName} ${day} ${month.charAt(0).toUpperCase() + month.slice(1)}`;
  const template = `---
slug: ${slug}
title: "${title}"
excerpt: ""
date: "${dateStr}"
type: daily
dimensions:
  personalProject: ""
  healthWellness: ""
  work: ""
  familyFriendship: ""
---

`;

  // Commit the new post file to GitHub — this is what actually persists it,
  // and it triggers Vercel to redeploy automatically.
  const createRes = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      ...githubHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Add daily post: ${filename}`,
      content: Buffer.from(template, "utf8").toString("base64"),
      branch: GITHUB_BRANCH,
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    return NextResponse.json(
      { error: `GitHub commit failed: ${createRes.status} ${errText}` },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    filename,
    slug,
  });
}
