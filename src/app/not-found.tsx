import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid-bg min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-6 opacity-0 animate-fade-in">
        <div className="font-mono text-8xl font-bold text-accent/20 mb-4">404</div>
        <div className="font-mono text-sm text-text-tertiary mb-2">
          <span className="text-accent">$</span> page --not-found
        </div>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="font-mono text-sm px-5 py-2.5 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors inline-block"
        >
          cd ~
        </Link>
      </div>
    </div>
  );
}
