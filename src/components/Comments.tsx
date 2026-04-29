'use client';

import { useEffect, useRef } from 'react';

const GISCUS_CONFIG = {
  repo: 'Pixel-114514/Pixel-114514.github.io',
  repoId: '', // TODO: fill from giscus.app
  category: 'Announcements',
  categoryId: '', // TODO: fill from giscus.app
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
};

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Skip if config is incomplete
    if (!GISCUS_CONFIG.repoId || !GISCUS_CONFIG.categoryId) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', GISCUS_CONFIG.repo);
    script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId);
    script.setAttribute('data-category', GISCUS_CONFIG.category);
    script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId);
    script.setAttribute('data-mapping', GISCUS_CONFIG.mapping);
    script.setAttribute('data-reactions-enabled', GISCUS_CONFIG.reactionsEnabled);
    script.setAttribute('data-emit-metadata', GISCUS_CONFIG.emitMetadata);
    script.setAttribute('data-theme', GISCUS_CONFIG.theme);
    script.setAttribute('data-lang', GISCUS_CONFIG.lang);

    ref.current.innerHTML = '';
    ref.current.appendChild(script);
  }, []);

  // Show hint when config is incomplete
  if (!GISCUS_CONFIG.repoId || !GISCUS_CONFIG.categoryId) {
    return (
      <div className="mt-8 py-6 text-center font-mono text-xs text-text-tertiary border border-border rounded-lg">
        Comments section — configure giscus to enable
      </div>
    );
  }

  return <div ref={ref} className="giscus mt-8" />;
}
