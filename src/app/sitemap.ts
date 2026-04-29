import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/posts';

const SITE_URL = 'https://shiena.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${SITE_URL}/blog/`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/about/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  const postPages = getAllPostSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}
