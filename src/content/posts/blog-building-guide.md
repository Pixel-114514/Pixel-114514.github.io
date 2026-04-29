---
title: "从零搭建个人博客：Next.js 静态站点实战指南"
date: "2025-04-30"
summary: "记录基于 Next.js 14、TypeScript、Tailwind CSS 搭建个人博客的完整过程，包括 Markdown 渲染、LaTeX 公式支持、评论系统和访客统计的接入。"
tags: ["web", "nextjs", "tutorial"]
---

# 从零搭建个人博客：Next.js 静态站点实战指南

最近用 Next.js 14 搭建了这个个人博客网站，部署在 GitHub Pages 上。过程中踩了不少坑，也学到了很多东西。这篇博客记录整个搭建过程，希望对想做类似事情的人有帮助。

---

## 一、技术选型

最终选择的技术栈：

| 技术 | 用途 |
|------|------|
| Next.js 14 (App Router) | 框架 |
| TypeScript | 语言 |
| Tailwind CSS | 样式 |
| next-themes | 深色/浅色主题切换 |
| gray-matter + remark | Markdown 解析 |
| rehype-highlight | 代码高亮 |
| GitHub Pages | 部署 |
| GitHub Actions | CI/CD |

为什么选 Next.js 而不是 Hexo、Hugo？

- 可以完全自定义 UI，不受主题限制
- 组件化开发，扩展方便
- `output: 'export'` 静态导出，不需要服务器
- TypeScript 全栈类型安全

---

## 二、项目结构

```
src/
├── app/
│   ├── layout.tsx          # 根布局（Header、Footer、主题、全局脚本）
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式 + 设计系统
│   ├── blog/
│   │   ├── page.tsx        # 博客列表（标签过滤）
│   │   └── [slug]/page.tsx # 博客文章页
│   ├── guestbook/page.tsx  # 留言板
│   └── about/page.tsx      # 简历页（答题解锁）
├── components/
│   ├── Header.tsx          # 导航栏
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx     # 深浅色切换
│   ├── BlogPostContent.tsx # 文章渲染
│   ├── Comments.tsx        # giscus 评论组件
│   └── ...
├── content/posts/          # Markdown 博客文章
└── lib/
    ├── posts.ts            # 文章读取/解析管线
    └── seo.ts              # SEO 元数据
```

---

## 三、Markdown 渲染管线

这是整个博客最核心的部分。把 Markdown 变成带语法高亮和数学公式的 HTML。

### 3.1 基础管线

最开始的管线很简单：

```typescript
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const result = await remark()
  .use(gfm)
  .use(html, { sanitize: false })
  .process(markdownContent);
```

`remark-gfm` 支持 GitHub Flavored Markdown（表格、删除线、任务列表等）。

### 3.2 加入数学公式

博客需要写 LaTeX 公式（比如 $\frac{dx}{dt} = v$），需要接入 KaTeX。

安装依赖：

```bash
npm install remark-math rehype-katex
```

**第一个坑：`remark-html` 会跳过 rehype 插件**

最初直接把 `rehype-katex` 加在 `remark-html` 后面：

```typescript
// 错误写法 — rehype-katex 不会执行！
remark()
  .use(gfm)
  .use(remarkMath)
  .use(html, { sanitize: false })
  .use(rehypeKatex)   // ← 这里拿不到 AST
  .process(content);
```

`remark-html` 直接把 remark AST 序列化成字符串，后面的 rehype 插件根本看不到 AST。

**正确方案**：用 `remark-rehype` + `rehype-stringify` 替代 `remark-html`：

```typescript
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

// 正确写法
remark()
  .use(gfm)           // GFM 支持
  .use(remarkMath)     // 解析 $...$ 和 $$...$$
  .use(remarkRehype, { allowDangerousHtml: true })  // remark → rehype AST
  .use(rehypeKatex)    // 数学公式 → KaTeX HTML
  .use(rehypeHighlight) // 代码高亮
  .use(rehypeStringify, { allowDangerousHtml: true }) // 序列化
  .process(content);
```

别忘了在 `layout.tsx` 引入 KaTeX CSS：

```tsx
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"
  crossOrigin="anonymous"
/>
```

使用方法：

```markdown
行内公式：$E = mc^2$

独立公式：
$$\mathcal{L} = \mathbb{E}|v_\theta(x_t, t) - u_t|^2$$
```

---

## 四、深色/浅色主题

用 `next-themes` 实现，默认深色：

```tsx
// ThemeProvider.tsx
import { ThemeProvider as NextThemes } from 'next-themes';

export function ThemeProvider({ children }) {
  return (
    <NextThemes attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </NextThemes>
  );
}
```

在 `globals.css` 中用 CSS 变量定义两套配色：

```css
:root {
  --bg-primary: #fafaf9;
  --text-primary: #1c1917;
  --accent: #0891b2;
}

.dark {
  --bg-primary: #0a0a0c;
  --text-primary: #e8e6e3;
  --accent: #22d3ee;
}
```

---

## 五、评论系统（giscus）

静态网站没有后端，评论通过第三方服务实现。选择了 giscus，因为它基于 GitHub Discussions，免费、无广告、支持 Markdown。

### 5.1 配置步骤

1. 安装 [giscus GitHub App](https://github.com/apps/giscus)
2. 在仓库 Settings 中开启 Discussions 功能
3. 到 [giscus.app](https://giscus.app) 生成配置参数

### 5.2 实现代码

因为是静态导出，用 `useEffect` 动态加载 giscus 脚本：

```tsx
// Comments.tsx
'use client';
import { useEffect, useRef } from 'react';

const GISCUS_CONFIG = {
  repo: 'your-username/your-repo',
  repoId: '从 giscus.app 获取',
  category: 'Announcements',
  categoryId: '从 giscus.app 获取',
  mapping: 'pathname',
  // ...
};

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-theme', 'custom');
    script.setAttribute('data-theme-url', '/giscus-theme.css');
    // ... 设置其他属性
    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="giscus" />;
}
```

### 5.3 自定义主题

giscus 支持自定义 CSS 主题。把主题文件放在 `public/` 目录下，通过 `data-theme="custom"` + `data-theme-url` 指定。

giscus 内部使用 GitHub 的 Primer CSS 变量体系，核心变量包括：

```css
main {
  --color-fg-default: #e8e6e3;       /* 主文字 */
  --color-canvas-default: #0a0a0c;   /* 背景 */
  --color-border-default: #3a3a45;   /* 边框 */
  --color-accent-fg: #22d3ee;        /* 强调色 */
  --color-btn-primary-bg: #22d3ee;   /* 主按钮 */
}
```

**第二个坑：暗色模式评论区边框不可见**

如果边框颜色和背景色太接近（比如 `#2a2a30` 在 `#0a0a0c` 背景上），评论区会和页面融为一体。解决方案：

1. 把 `--color-border-default` 调亮到 `#3a3a45`
2. 给评论区外层加一个容器边框：`border border-border bg-bg-secondary`

---

## 六、访客统计（Umami）

选择 Umami 是因为开源、轻量、隐私友好。

```bash
# 注册 Umami Cloud: https://cloud.umami.is
# 添加网站后获取 website-id
```

在 `layout.tsx` 的 `<head>` 中加入：

```tsx
<script
  defer
  src="https://cloud.umami.is/script.js"
  data-website-id="your-website-id"
/>
```

一行代码就完成了。

---

## 七、部署：GitHub Pages + Actions

### 7.1 Next.js 配置

```javascript
// next.config.mjs
const nextConfig = {
  output: 'export',     // 静态导出
  images: { unoptimized: true },  // 静态导出不支持图片优化
  trailingSlash: true,  // URL 统一带尾斜杠
};
```

### 7.2 GitHub Actions 工作流

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

推送 `main` 分支自动构建部署。

**第三个坑：deploy 步骤失败**

如果 Actions 的 deploy 步骤报错，检查仓库 Settings → Pages → Source 是否设为 **"GitHub Actions"**（不是 "Deploy from a branch"）。

### 7.3 仓库可以设为私有

GitHub Free 用户也可以用私有仓库启用 GitHub Pages，网站照常公开访问，别人看不到源代码。

---

## 八、写博客的流程

往 `src/content/posts/` 加一个 `.md` 文件：

```yaml
---
title: "文章标题"
date: "2025-04-30"
summary: "一句话摘要"
tags: ["tag1", "tag2"]
---

正文内容，支持 GFM、LaTeX、代码高亮...
```

加 `draft: true` 可以在构建时排除。

---

## 九、总结

搭建这个博客的过程让我理解了几件事：

1. **remark/rehype 管线**是 Markdown 处理的核心，理解 AST 转换流程很重要
2. **静态网站**也能有评论和统计，善用第三方服务
3. **GitHub Pages + Actions** 是零成本的部署方案
4. CSS 变量 + Tailwind 的组合做主题切换非常方便

整个项目的成本：**$0**。域名是免费的 `.xyz`，托管用 GitHub Pages，评论用 giscus，统计用 Umami 免费版。

如果你想搭建类似的博客，这个方案值得参考。
