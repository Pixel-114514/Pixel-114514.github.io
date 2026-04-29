import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { buildPageMetadata } from '@/lib/seo';
import { HeroSection } from '@/components/HeroSection';
import { PostCard } from '@/components/PostCard';

export const metadata = buildPageMetadata({
  title: '椎名立希 — Developer & AI Researcher',
  description: 'AI researcher, full-stack developer, and open-source contributor. Building intelligent systems and sharing knowledge.',
  path: '/',
});

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="grid-bg">
      {/* Hero */}
      <HeroSection />

      {/* Featured Posts */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-mono text-sm text-text-tertiary">
            <span className="text-accent">#</span> latest_writings
          </h2>
          <Link
            href="/blog/"
            className="font-mono text-xs text-accent hover:text-accent-hover transition-colors"
          >
            view all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
          {posts.length === 0 && (
            <div className="col-span-3 text-center py-16">
              <p className="font-mono text-sm text-text-tertiary">
                <span className="text-accent">$</span> No posts yet. Coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-border">
        <div className="text-center">
          <h2 className="font-mono text-lg text-text-primary mb-4">
            <span className="text-accent">$</span> Let&apos;s connect
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            I&apos;m always open to discussing AI research, open-source projects, or potential collaborations.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="mailto:maxkarl1921@gmail.com"
              className="font-mono text-sm px-5 py-2.5 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
            >
              Get in touch
            </a>
            <a
              href="https://github.com/Pixel-114514"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm px-5 py-2.5 border border-border text-text-primary rounded-md hover:border-accent hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
