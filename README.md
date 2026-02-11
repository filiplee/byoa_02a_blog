# BYOA Blog

This repo is the source for the BYOA blog (Next.js app).

## Where’s the app?

The app lives in the **`blog/`** folder (so the repo root has a single `blog/` directory).  
Vercel is configured with **Root Directory** `blog`, so deployments build from that folder.

## Run locally

```bash
cd blog
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in the terminal).

## Edit posts

Add or edit Markdown files in **`blog/content/posts/`**. Each file needs front matter with `slug`, `title`, `excerpt`, `date`, and `type` (`daily` or `weekly`).
