#!/usr/bin/env node
/**
 * Creates a new empty blog post with today's date.
 * Super-user only: runs only for allowed system users.
 * Run: node scripts/new-post.js
 * Or: npm run new-post
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const ALLOWED_USERS = ['filiplee'];

const currentUser = os.userInfo().username;
if (!ALLOWED_USERS.includes(currentUser)) {
  console.error(`Unauthorized: ${currentUser} is not an allowed user.`);
  process.exit(1);
}

const postsDir = path.join(__dirname, '../content/posts');

const now = new Date();
const day = now.getDate();
const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const month = monthNames[now.getMonth()];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayName = dayNames[now.getDay()];
const year = now.getFullYear();
const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

const slug = `daily-${month}-${day}`;
const filename = `${slug}.md`;
const filepath = path.join(postsDir, filename);

if (fs.existsSync(filepath)) {
  console.error(`Post already exists: ${filename}`);
  process.exit(1);
}

const template = `---
slug: ${slug}
title: "${dayName} ${day} ${month.charAt(0).toUpperCase() + month.slice(1)}"
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

fs.writeFileSync(filepath, template, 'utf8');
console.log(`Created: content/posts/${filename}`);
console.log(`Open: ${filepath}`);
