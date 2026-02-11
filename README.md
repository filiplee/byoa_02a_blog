# BYOA Blog

Next.js blog (daily posts and weekly round-ups).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in the terminal).

## Edit posts

Add or edit Markdown files in **`content/posts/`**. Each file needs front matter with `slug`, `title`, `excerpt`, `date`, and `type` (`daily` or `weekly`).

## Deploy (Vercel)

Set **Root Directory** to empty (repo root). The app is at the root of this repo.
