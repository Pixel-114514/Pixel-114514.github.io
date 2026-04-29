# 椎名立希 — Personal Website

A personal brand website and blog built with Next.js 14, TypeScript, and Tailwind CSS.

**Live**: [11114002.xyz](https://11114002.xyz)

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to /out
```

## Features

- Dark/light mode (default dark)
- Blog with Markdown, tag filtering, syntax highlighting
- Resume page with access-controlled quiz gate
- SEO: metadata, OG tags, sitemap.xml, robots.txt
- RSS feed at `/feed.xml`
- Static deployment (GitHub Pages + Actions CI/CD)

## Project Structure

See [CLAUDE.md](./CLAUDE.md) for full documentation.

## Writing Posts

Add `.md` files to `src/content/posts/`:

```yaml
---
title: "Your Post Title"
date: "2025-04-29"
summary: "A brief description."
tags: ["ai", "engineering"]
---

Your content here...
```

## Resume Gate

The `/about` page requires visitors to answer 3 questions before viewing.
Edit `src/components/ResumeGate.tsx` to update questions.

## Deployment

Push to `main` → GitHub Actions builds and deploys to GitHub Pages.

**Required**: Repo Settings → Pages → Source = "GitHub Actions"

## License

All content © 椎名立希. Code is open for reference.
