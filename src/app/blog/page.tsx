import { getAllPosts, getAllTags } from '@/lib/posts';
import { buildPageMetadata } from '@/lib/seo';
import { BlogList } from '@/components/BlogList';

export const metadata = buildPageMetadata({
  title: 'Blog',
  description: 'Thoughts on AI, software engineering, and open-source development.',
  path: '/blog/',
});

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="grid-bg">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12 opacity-0 animate-fade-in">
          <h1 className="text-heading font-bold text-text-primary mb-3">
            Blog
          </h1>
          <p className="text-text-secondary max-w-lg">
            Writing about AI agents, machine learning, system design, and the tools I build along the way.
          </p>
        </div>

        <BlogList initialPosts={posts} tags={tags} />
      </div>
    </div>
  );
}
