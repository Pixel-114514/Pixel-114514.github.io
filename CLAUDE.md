# CLAUDE.md — Project Context

## Project Overview

This is a personal brand website/blog for **椎名立希** (public name) / **董盛伟** (real name, resume only).
Domain: `11114002.xyz` (GitHub Pages)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS variables
- **Theme**: next-themes (dark/light toggle, default dark)
- **Blog**: Markdown files parsed with gray-matter + remark + rehype-highlight
- **Deployment**: Static export (`output: 'export'`) → GitHub Pages via Actions
- **CI/CD**: `.github/workflows/deploy.yml`

## Commands

```bash
npm install          # install deps
npm run dev          # local dev server
npm run build        # production build (generates /out)
```

## Directory Structure

```
.
├── CLAUDE.md                    # this file
├── CNAME                        # custom domain (GitHub Pages)
├── .nojekyll                    # disable Jekyll on GitHub Pages
├── next.config.mjs              # Next.js config (static export)
├── tailwind.config.ts           # Tailwind + design tokens
├── tsconfig.json
├── package.json
├── public/
│   ├── CNAME                    # domain file (copied from root)
│   ├── .nojekyll
│   ├── robots.txt
│   └── images/
│       └── avatar.jpg           # profile photo
├── src/
│   ├── app/
│   │   ├── globals.css          # all styles + design system + syntax theme
│   │   ├── layout.tsx           # root layout (header, footer, theme)
│   │   ├── page.tsx             # home page
│   │   ├── not-found.tsx        # 404 page
│   │   ├── sitemap.ts           # sitemap.xml generator
│   │   ├── robots.ts            # robots.txt generator
│   │   ├── about/
│   │   │   └── page.tsx         # resume page (behind quiz gate)
│   │   ├── blog/
│   │   │   ├── page.tsx         # blog list
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # individual blog post
│   │   └── feed.xml/
│   │       └── route.ts         # RSS feed
│   ├── components/
│   │   ├── Header.tsx           # site header + nav
│   │   ├── Footer.tsx           # site footer
│   │   ├── ThemeProvider.tsx    # next-themes wrapper
│   │   ├── ThemeToggle.tsx      # dark/light toggle button
│   │   ├── HeroSection.tsx      # home page hero with typewriter
│   │   ├── PostCard.tsx         # blog post card component
│   │   ├── ProjectCard.tsx      # project card component
│   │   ├── BlogList.tsx         # blog list with tag filtering
│   │   ├── BlogPostContent.tsx  # blog post HTML renderer
│   │   └── ResumeGate.tsx       # quiz gate for /about page
│   ├── content/
│   │   └── posts/               # blog posts (Markdown)
│   │       ├── hello-world.md
│   │       ├── ai-agent-patterns.md
│   │       ├── diffusion-and-flow-matching.md
│   │       └── ppo-algorithm.md
│   └── lib/
│       ├── posts.ts             # blog post reader/parser
│       └── seo.ts               # SEO metadata builder
└── .github/
    └── workflows/
        └── deploy.yml           # GitHub Pages deployment
```

## Naming Convention (IMPORTANT)

| Context | Name | Notes |
|---------|------|-------|
| Public branding | **椎名立希** | Homepage, nav, footer, SEO, OG, RSS |
| Real name | **董盛伟** | Only in `/about` resume page |

If either name appears in the wrong context, fix it immediately.

## Resume Access Gate

The `/about` page is protected by `ResumeGate.tsx` — a client-side quiz component.
Visitors must answer 3 questions correctly before seeing the resume.

To update questions: edit `src/components/ResumeGate.tsx` → `questions` array.
Each question has: `id`, `question`, `options` (4 choices), `answer` (correct index).

## Adding Blog Posts

1. Create a `.md` file in `src/content/posts/`
2. Add frontmatter:
```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
summary: "One-line description"
tags: ["tag1", "tag2"]
---
```
3. Write content in Markdown (GFM supported)
4. Code blocks get syntax highlighting automatically
5. Posts with `draft: true` in frontmatter are excluded from build

### Math / LaTeX in Blog Posts

LaTeX math is rendered via `remark-math` + `rehype-katex` (KaTeX CSS loaded from CDN in `layout.tsx`).

- Inline math: `$E = mc^2$`
- Display math: `$$\frac{dx}{dt} = f(x, t)$$`

Pipeline in `src/lib/posts.ts`: `remark-gfm → remark-math → remark-rehype → rehype-katex → rehype-highlight → rehype-stringify`

## Comments (giscus)

Blog posts have a comment section powered by [giscus](https://giscus.app), which stores comments in GitHub Discussions.

Configuration is in `src/components/Comments.tsx` → `GISCUS_CONFIG`.

If you ever need to reconfigure:

1. Go to https://giscus.app
2. Enter repository: `Pixel-114514/Pixel-114514.github.io`
3. Choose mapping: **pathname**, category: **Announcements**
4. Copy the generated `data-repo-id` and `data-category-id` into `GISCUS_CONFIG`

Prerequisites:
- giscus GitHub App installed on the repo: https://github.com/apps/giscus
- Discussions enabled in repo Settings → Features

## Analytics (Umami)

Visitor tracking via [Umami](https://cloud.umami.is). The tracking script is in `src/app/layout.tsx` → `<head>`.

Dashboard: https://cloud.umami.is (login required)

If you need to reconfigure:
1. Log into Umami dashboard
2. Go to the website settings to find the `data-website-id`
3. Update the `<script>` tag in `layout.tsx`

## Design System

### Colors (CSS variables in globals.css)

Light mode: warm stone palette, cyan accent (`#0891b2`)
Dark mode: near-black bg (`#0a0a0c`), cyan accent (`#22d3ee`)

### Fonts

- **Body**: Instrument Sans + Noto Sans JP
- **Code/Mono**: JetBrains Mono

### Key Design Elements

- Grid background texture (subtle lines)
- Terminal-style prompts (`$` prefix)
- Cursor blink animation on logo
- Staggered fade-in animations
- Noise overlay (very subtle)
- Rounded cards with border hover effects

## Deployment

1. Push to `main` triggers GitHub Actions
2. Actions runs `npm ci && npm run build`
3. Static files in `/out` are deployed to GitHub Pages
4. **Must set**: Repo Settings → Pages → Source = "GitHub Actions"

## Git Branches

| Branch | Purpose |
|--------|---------|
| `main` | Production (auto-deploys) |
| `develop` | Active development |
| `legacy` | Old site backup |
