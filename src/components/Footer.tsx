export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-text-tertiary">
            <span className="text-accent">&copy;</span> {new Date().getFullYear()} 椎名立希
            <span className="mx-2 text-border">|</span>
            Built with Next.js
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Pixel-114514"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-tertiary hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:maxkarl1921@gmail.com"
              className="font-mono text-xs text-text-tertiary hover:text-accent transition-colors"
            >
              Email
            </a>
            <a
              href="/feed.xml"
              className="font-mono text-xs text-text-tertiary hover:text-accent transition-colors"
            >
              RSS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
