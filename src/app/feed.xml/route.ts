import { getAllPosts } from '@/lib/posts';
import { Feed } from 'feed';

const SITE_URL = 'https://shiena.dev';

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: '椎名立希 — Blog',
    description: 'Thoughts on AI, software engineering, and open-source development.',
    id: SITE_URL,
    link: SITE_URL,
    language: 'zh-CN',
    copyright: `© ${new Date().getFullYear()} 椎名立希`,
    author: {
      name: '椎名立希',
      email: 'dengshengwei1@gmail.com',
      link: SITE_URL,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/blog/${post.slug}/`,
      link: `${SITE_URL}/blog/${post.slug}/`,
      description: post.summary,
      date: new Date(post.date),
      author: [{ name: '椎名立希' }],
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
