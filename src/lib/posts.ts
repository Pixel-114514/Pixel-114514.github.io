import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import gfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

function estimateReadingTime(text: string): string {
  const words = text.replace(/[#*`\[\]()>|-]/g, '').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft?: boolean;
  readingTime?: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface Post extends PostMeta {
  content: string;
  headings: Heading[];
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

export function getPostMeta(slug: string): PostMeta | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const filePath = fs.existsSync(fullPath) ? fullPath : fs.existsSync(mdxPath) ? mdxPath : null;

  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || '2024-01-01',
    summary: data.summary || '',
    tags: data.tags || [],
    draft: data.draft || false,
    readingTime: estimateReadingTime(content),
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostMeta(slug))
    .filter((post): post is PostMeta => post !== null && !post.draft)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const filePath = fs.existsSync(fullPath) ? fullPath : fs.existsSync(mdxPath) ? mdxPath : null;

  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(gfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  let html = processedContent.toString();

  // Extract headings and inject IDs
  const headings: Heading[] = [];
  let headingCounter = 0;
  html = html.replace(/<(h[2-4])>(.*?)<\/\1>/g, (_, tag, text) => {
    headingCounter++;
    const plain = text.replace(/<[^>]+>/g, '');
    const id = plain.toLowerCase().replace(/[^\w\s一-鿿-]/g, '').replace(/\s+/g, '-').slice(0, 60) || `heading-${headingCounter}`;
    const level = parseInt(tag[1]);
    headings.push({ id, text: plain, level });
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  return {
    slug,
    title: data.title || slug,
    date: data.date || '2024-01-01',
    summary: data.summary || '',
    tags: data.tags || [],
    draft: data.draft || false,
    readingTime: estimateReadingTime(content),
    content: html,
    headings,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 2): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== currentSlug);
  return all
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.post);
}
