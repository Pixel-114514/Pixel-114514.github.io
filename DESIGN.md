# 博客网站设计规范

## 1. 身份与命名

- 首页、导航栏、页脚、侧边栏公开显示名：**椎名立希**
- 简历页（about/）真实姓名：**董盛伟**
- 首页、SEO meta、导航栏、页脚出现真实姓名时，改回公开名
- 简历内容、验证问题、联系方式等保留真实姓名

## 2. 技术栈

- 纯静态 HTML/CSS/JS，无框架依赖
- CSS：单文件 `css/style.css`，包含所有样式
- JS：单文件 `js/main.js`，vanilla JS，约 120 行
- 外部 CDN：FontAwesome 6.5.1（图标）、typed.js 2.1.0（首页打字动画，懒加载）、busuanzi（访客统计，懒加载）
- 无 jQuery、无 Bootstrap、无 Hexo/Butterfly

## 3. 目录结构

```
/
├── index.html                    ← 首页
├── about/index.html              ← 关于我 + 答题验证
├── 2026/04/15/
│   ├── cliproxyapi-linux/index.html
│   ├── gpt-multi-email/index.html
│   ├── self-hosted-email/index.html
│   └── hello-world/index.html
├── archives/index.html           ← 归档页
├── categories/index.html         ← 分类页
├── tags/index.html               ← 标签页
├── css/style.css                 ← 全局样式
├── js/main.js                    ← 全局脚本
├── img/                          ← 图片资源
├── CNAME                         ← 自定义域名
├── .nojekyll                     ← 禁用 Jekyll
└── DESIGN.md                     ← 本文档
```

## 4. 配色方案

### 亮色模式
| 变量 | 色值 | 用途 |
|------|------|------|
| `--ink` | `#163247` | 主文字色 |
| `--teal` | `#2c7a72` | 主题色（链接、徽标、强调） |
| `--copper` | `#c66b4b` | 次强调色（hover、渐变终点） |
| `--gold` | `#d8a85f` | 装饰色（渐变、下划线） |
| `--paper` | `rgba(255,251,245,0.92)` | 卡片背景 |
| `--paper-strong` | `rgba(255,253,249,0.96)` | 文章内容背景 |
| `--line` | `rgba(22,50,71,0.1)` | 边框线 |
| `--shadow-1` | `0 18px 44px rgba(20,34,52,0.1)` | 默认阴影 |
| `--shadow-2` | `0 24px 58px rgba(20,34,52,0.14)` | hover 阴影 |

### 暗色模式
| 变量 | 色值 | 用途 |
|------|------|------|
| 背景 | `#0f1318 → #141a22` | body 渐变背景 |
| 卡片 | `rgba(20,26,34,0.85)` | 卡片/侧边栏背景 |
| 文字 | `#e0ddd8` | 主文字色 |
| 次文字 | `rgba(224,221,216,0.72)` | 描述文字 |
| 边框 | `rgba(255,255,255,0.06)` | 边框线 |

### 背景渐变（亮色）
```css
body {
  background:
    radial-gradient(circle at 0 0, rgba(198,107,75,0.16), transparent 24%),
    radial-gradient(circle at 100% 10%, rgba(44,122,114,0.16), transparent 20%),
    radial-gradient(circle at 50% 38%, rgba(216,168,95,0.08), transparent 30%),
    linear-gradient(180deg, #f6efe7 0%, #fcfaf6 42%, #f2ece5 100%);
}
```

## 5. 字体

```css
--font-sans: "Manrope", "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", "Microsoft YaHei", sans-serif;
--font-serif: "Noto Serif SC", "Songti SC", "STSong", serif;
```

- 正文：sans-serif
- 标题（h1-h4）：serif
- 代码：`"JetBrains Mono", "Fira Code", monospace`
- Noto Serif SC 通过 Google Fonts `@import` 加载

## 6. 圆角规范

| 元素 | 圆角值 |
|------|--------|
| 大卡片（文章卡片、hero 区） | 30px |
| 中卡片（侧边栏、分类卡片） | 22px |
| 小元素（按钮、标签、输入框） | 14px |
| 头像 | 24px（padding 6px 内圆角 18px） |
| 标签/徽标 | 999px（胶囊形） |
| 代码块 | 14px |

## 7. 首页设计

### Hero 区
- 全屏高度（min-height: 100vh）
- 背景：深色渐变 + SVG 图 + 装饰性光圈（`.hero-orbit`）
- 内容：徽标 → 标题 → 打字副标题 → 说明文案 → 社交图标 → CTA 按钮 → 统计条 → 焦点卡片
- 滚动提示箭头

### 内容区（双栏布局：主内容 + 侧边栏）
- 快速入口卡片（3 列）
- 信号板（3 列）
- Spotlight 欢迎模块（2 列）
- 编辑部头条 + "进入完整归档"链接
- 文章列表（卡片式，图片 + 文字左右交替）

### 侧边栏
- 作者卡片（头像、名字、徽标、统计数据、简历按钮、社交链接）
- 公告面板（带左侧渐变竖线）
- 最新文章列表（缩略图 + 标题 + 日期）
- 分类列表（带子分类缩进）
- 标签云（胶囊形标签）
- 归档列表
- 网站资讯

## 8. 文章页设计

### 文章头部
- 全宽封面图作为背景，深色渐变遮罩
- 标题（白色，大字号）
- 元信息：日期、分类

### 文章内容
- 白色卡片背景，圆角 30px
- 图片：圆角 20px，带阴影
- 代码块：深色背景 `#1e293b`，圆角 14px
- 引用块：左侧 3px teal 竖线，浅色背景
- Note 提示框：info（teal 边）、warning（gold 边）、success（绿色边）

### 文章底部
- 标签列表（胶囊形）
- 上下篇导航（带封面缩略图）

### 侧边栏
- TOC 目录（如有）
- 作者卡片
- 最新文章
- 分类、标签、归档、网站资讯

## 9. 关于我页面

### Profile Hero
- 深色渐变背景（`rgba(17,40,60,0.96)`）
- 左侧：kicker 徽标 + 标题 + 自我介绍 + 操作按钮
- 右侧：2×2 统计网格（毕业年份、CVPR、城市、岗位方向）

### 内容区
- 3 列卡片网格：教育经历、求职意向、核心技能
- 项目经历（带左侧渐变竖线时间轴）
- 3 列卡片网格：在校经历、自我评价、联系我

### 答题验证弹窗
- 固定定位遮罩层，毛玻璃背景
- 白色卡片，顶部渐变条（teal → gold → copper）
- 标题带锁图标
- 两个输入框（答对任意一个即可）
- 验证逻辑：
  - 问题 1：`我的初三时期的班主任是谁？` → 答案：`黄慧红`
  - 问题 2：`我的名字是什么？` → 答案：`董盛伟`
  - 答案去除空格后精确匹配
  - 验证成功后存入 `sessionStorage`，当前会话内不再弹出
  - 未验证时页面内容模糊（`filter: blur(8px)`）

## 10. 列表页设计

### 归档页
- 按月份分组，每组标题带文章数徽标
- 每篇文章：日期 + 标题链接

### 分类页
- 网格布局（auto-fill, minmax 280px）
- 每个分类卡片：分类名 + 文章数 + 文章列表

### 标签页
- 顶部标签云（大字号标签更大）
- 下方按标签分组的文章列表

## 11. 动画规范

### 入场动画
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
```
- 使用 `.anim-up` 类
- 子元素通过 `:nth-child` 设置递增延迟（0.08s 间隔）

### 交互动画
- 卡片 hover：`translateY(-3px)` + 阴影增强，0.25s ease
- 文章封面 hover：`scale(1.04)`，0.45s ease
- 暗色模式切换图标 hover：`rotate(180deg)`，0.4s ease
- 滚动到顶部按钮：显示/隐藏通过 opacity + pointer-events

### 无障碍
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

## 12. 响应式断点

| 断点 | 布局变化 |
|------|----------|
| ≤1024px | 双栏 → 单栏，侧边栏变为 2 列网格 |
| ≤900px | 侧边栏变为单列，文章卡片图片在上文字在下，hero 焦点卡单列 |
| ≤768px | 导航链接隐藏改为汉堡菜单，hero 标题缩小，按钮全宽，侧边栏单列 |

## 13. JS 功能清单

| 功能 | 实现方式 |
|------|----------|
| 暗色模式切换 | `localStorage` 持久化，`data-theme` 属性切换 |
| 导航栏滚动效果 | `scroll` 事件 + `requestAnimationFrame`，添加 `.scrolled` 类 |
| 移动端菜单 | 切换 `.open` 类，点击链接自动关闭 |
| 回到顶部按钮 | scroll > 400px 时显示，`scrollTo({ behavior: 'smooth' })` |
| 打字动画 | typed.js CDN 懒加载，`data-strings` 属性传入字符串数组 |
| 访客统计 | busuanzi CDN 懒加载 |
| 答题验证 | sessionStorage 存储验证状态，答案去空格精确匹配 |

## 14. Git 分支说明

| 分支 | 用途 |
|------|------|
| `main` | 当前博客（纯静态，无模板） |
| `hexo` | 旧版 Hexo + Butterfly 构建备份 |

## 15. 域名与部署

- 自定义域名：`11114002.xyz`（通过 CNAME 文件配置）
- GitHub Pages 部署，需在仓库设置中将 Source 分支改为 `main`
- `.nojekyll` 文件禁用 Jekyll 构建
