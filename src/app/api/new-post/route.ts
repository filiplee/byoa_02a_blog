import { NextResponse } from "next/server";
import { writeFileSync, existsSync } from "fs";
import path from "path";

const MONTH_NAMES = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];
const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

export async function POST(request: Request) {
  const secret = process.env.BLOG_ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Admin not configured" },
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

  const postsDir = path.join(process.cwd(), "content", "posts");
  const now = new Date();
  const day = now.getDate();
  const month = MONTH_NAMES[now.getMonth()];
  const dayName = DAY_NAMES[now.getDay()];
  const dateStr = now.toISOString().split("T")[0];
  const slug = `daily-${month}-${day}`;
  const filename = `${slug}.md`;
  const filepath = path.join(postsDir, filename);

  if (existsSync(filepath)) {
    return NextResponse.json(
      { error: `Post already exists: ${filename}` },
      { status: 409 }
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

  writeFileSync(filepath, template, "utf8");

  return NextResponse.json({
    ok: true,
    filename,
    slug,
  });
}
