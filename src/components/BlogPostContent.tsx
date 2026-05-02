'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { PostMeta } from '@/lib/posts';

export function BlogPostContent({
  content,
  headings,
  relatedPosts,
}: {
  content: string;
  headings?: { id: string; text: string; level: number }[];
  relatedPosts?: PostMeta[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Inject copy buttons into code blocks
  useEffect(() => {
    if (!ref.current) return;
    const pres = ref.current.querySelectorAll('pre');
    pres.forEach((pre) => {
      if (pre.querySelector('.code-copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        const text = code ? code.textContent : pre.textContent;
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
            btn.classList.remove('copied');
          }, 2000);
        } catch { /* ignore */ }
      });
      pre.style.position = 'relative';
      pre.appendChild(btn);
    });
  }, [content]);

  return (
    <div className="flex gap-10">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div
          ref={ref}
          className="prose opacity-0 animate-fade-in stagger-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {relatedPosts && relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </div>

      {/* TOC sidebar — desktop only */}
      {headings && headings.length > 2 && (
        <TOCSidebar headings={headings} />
      )}
    </div>
  );
}

function TOCSidebar({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="hidden xl:block w-48 shrink-0">
      <div className="sticky top-20">
        <div className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest mb-3">
          Table of Contents
        </div>
        <ul className="space-y-1.5 border-l border-border">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`
                  block text-xs leading-relaxed transition-colors duration-200
                  ${h.level === 3 ? 'pl-6' : 'pl-3'}
                  ${activeId === h.id
                    ? 'text-accent border-l-2 border-accent -ml-px'
                    : 'text-text-tertiary hover:text-text-secondary'
                  }
                `}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="font-mono text-sm text-text-tertiary mb-4">
        <span className="text-accent">#</span> related_posts
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="group block p-4 rounded-lg border border-border bg-bg-secondary/30 hover:border-accent/40 transition-all duration-200"
          >
            <h4 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors line-clamp-1">
              {post.title}
            </h4>
            <p className="text-xs text-text-tertiary mt-1 line-clamp-1">{post.summary}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const onScroll = useCallback(() => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  if (progress < 2) return null;

  return (
    <div className="fixed top-14 left-0 right-0 z-40 h-[2px] bg-transparent">
      <div
        className="h-full bg-accent/60 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-40 w-10 h-10 flex items-center justify-center rounded-lg border border-border bg-bg-secondary/80 backdrop-blur-sm text-text-tertiary hover:text-accent hover:border-accent/50 transition-all duration-200 animate-fade-in"
      aria-label="Scroll to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
