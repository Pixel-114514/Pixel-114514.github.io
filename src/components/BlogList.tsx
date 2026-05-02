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
  const [search, setSearch] = useState('');

  const filteredPosts = initialPosts.filter((p) => {
    const matchesTag = !selectedTag || p.tags.includes(selectedTag);
    if (!search.trim()) return matchesTag;
    const q = search.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchesTag && matchesSearch;
  });

  return (
    <>
      {/* Search */}
      <div className="mb-8 opacity-0 animate-fade-in">
        <div className="relative max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full font-mono text-sm pl-9 pr-4 py-2 rounded-lg border border-border bg-bg-secondary/50 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-accent transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

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
            <span className="text-accent">$</span> No posts found{selectedTag ? ` for "${selectedTag}"` : ''}{search ? ` matching "${search}"` : ''}.
          </p>
        </div>
      )}
    </>
  );
}
