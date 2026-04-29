'use client';

import { useEffect, useRef } from 'react';

const GISCUS_CONFIG = {
  repo: 'Pixel-114514/Pixel-114514.github.io',
  repoId: 'R_kgDOSC7EBw',
  category: 'Announcements',
  categoryId: 'DIC_kwDOSC7EB84C7-OI',
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom' as const,
  theme: 'custom',
  themeUrl: 'https://11114002.xyz/giscus-theme.css',
  lang: 'zh-CN',
};

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
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
    script.setAttribute('data-input-position', GISCUS_CONFIG.inputPosition);
    script.setAttribute('data-theme', GISCUS_CONFIG.theme);
    script.setAttribute('data-theme-url', GISCUS_CONFIG.themeUrl);
    script.setAttribute('data-lang', GISCUS_CONFIG.lang);

    ref.current.innerHTML = '';
    ref.current.appendChild(script);
  }, []);

  return (
    <div className="mt-8 p-4 rounded-xl border border-border bg-bg-secondary">
      <div ref={ref} className="giscus" />
    </div>
  );
}
