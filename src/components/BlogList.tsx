'use client';

import { useState } from 'react';
import type { PostMeta } from '@/lib/posts';
import { PostCard } from './PostCard';

export function BlogList({
  initialPosts,
  tags,
}: {
  initialPosts: PostMeta[];
  tags: string[];
}) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? initialPosts.filter((p) => p.tags.includes(selectedTag))
    : initialPosts;

  return (
    <>
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 opacity-0 animate-fade-in stagger-1">
          <button
            onClick={() => setSelectedTag(null)}
            className={`font-mono text-xs px-3 py-1 rounded-full border transition-all duration-200 ${
              selectedTag === null
                ? 'border-accent bg-accent-muted text-accent'
                : 'border-border text-text-tertiary hover:border-accent/50 hover:text-text-secondary'
            }`}
          >
            all
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`font-mono text-xs px-3 py-1 rounded-full border transition-all duration-200 ${
                selectedTag === tag
                  ? 'border-accent bg-accent-muted text-accent'
                  : 'border-border text-text-tertiary hover:border-accent/50 hover:text-text-secondary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Post list */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="font-mono text-sm text-text-tertiary">
            <span className="text-accent">$</span> No posts found{selectedTag ? ` for "${selectedTag}"` : ''}.
          </p>
        </div>
      )}
    </>
  );
}
