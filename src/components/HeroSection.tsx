'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const roles = [
  'AI 算法工程师',
  'CVPR 2026 录用',
  '深度学习研究者',
  'RAG & Agent 开发',
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 40);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Text */}
          <div className="flex-1 opacity-0 animate-fade-in">
            <div className="font-mono text-xs text-accent mb-6 tracking-widest uppercase">
              Welcome to my digital space
            </div>
            <h1 className="text-display font-bold text-text-primary mb-6">
              椎名立希
            </h1>
            <div className="font-mono text-sm text-text-secondary mb-8 h-6">
              <span className="text-accent">&gt;</span> {displayText}
              <span className="animate-cursor-blink text-accent">|</span>
            </div>
            <p className="text-text-secondary leading-relaxed max-w-lg mb-10">
              Building intelligent systems at the intersection of AI and engineering.
              Focused on research, open-source, and making ideas real.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/blog/"
                className="font-mono text-sm px-5 py-2.5 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
              >
                Read my blog
              </Link>
              <Link
                href="/about/"
                className="font-mono text-sm px-5 py-2.5 border border-border text-text-primary rounded-md hover:border-accent hover:text-accent transition-colors"
              >
                About me
              </Link>
            </div>
          </div>

          {/* Avatar */}
          <div className="opacity-0 animate-fade-in stagger-2">
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
                <Image
                  src="/images/avatar.jpg"
                  alt="椎名立希"
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Decorative accent corner */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-2 border-accent rounded-2xl -z-10" />
              <div className="absolute -top-3 -left-3 w-8 h-8 border-2 border-accent/30 rounded-lg -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative grid line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}

function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const isExternal = href.startsWith('http');
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
