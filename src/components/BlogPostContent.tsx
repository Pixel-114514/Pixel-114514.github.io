'use client';

export function BlogPostContent({ content }: { content: string }) {
  return (
    <div
      className="prose opacity-0 animate-fade-in stagger-2"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
