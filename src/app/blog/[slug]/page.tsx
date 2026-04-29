import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { buildPageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BlogPostContent } from '@/components/BlogPostContent';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}/`,
  });
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="grid-bg">
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Back */}
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-tertiary hover:text-accent transition-colors mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          back to blog
        </Link>

        {/* Header */}
        <header className="mb-12 opacity-0 animate-fade-in">
          <div className="font-mono text-xs text-text-tertiary mb-4">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}
          </div>
          <h1 className="text-heading font-bold text-text-primary mb-4">
            {post.title}
          </h1>
          {post.summary && (
            <p className="text-text-secondary leading-relaxed">
              {post.summary}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/?tag=${tag}`}
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border text-text-tertiary hover:border-accent hover:text-accent transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className="border-t border-border mb-10" />

        {/* Content */}
        <BlogPostContent content={post.content} />

        {/* Footer */}
        <div className="border-t border-border mt-16 pt-8">
          <div className="flex items-center justify-between">
            <Link
              href="/blog/"
              className="font-mono text-xs text-text-tertiary hover:text-accent transition-colors"
            >
              ← All posts
            </Link>
            <a
              href={`https://github.com/Pixel-114514/Pixel-114514.github.io/edit/main/src/content/posts/${post.slug}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-tertiary hover:text-accent transition-colors"
            >
              Edit on GitHub
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
