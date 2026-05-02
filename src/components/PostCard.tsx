import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

export function PostCard({ post, index }: { post: PostMeta; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={`
        group block p-6 rounded-xl border border-border bg-bg-secondary/50
        hover:border-accent/50 hover:bg-bg-secondary transition-all duration-300
        opacity-0 animate-slide-up stagger-${index + 1}
      `}
    >
      <div className="font-mono text-xs text-text-tertiary mb-3 flex items-center gap-2">
        <span>
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
        </span>
        {post.readingTime && (
          <>
            <span className="text-border">·</span>
            <span>{post.readingTime}</span>
          </>
        )}
      </div>
      <h3 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-text-secondary line-clamp-2 mb-4">
        {post.summary}
      </p>
      <div className="flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border text-text-tertiary"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
