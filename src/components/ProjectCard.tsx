'use client';

export function ProjectCard({
  project,
  index,
}: {
  project: { title: string; description: string; tech: string[]; link: string };
  index: number;
}) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group block p-6 rounded-xl border border-border bg-bg-secondary/50
        hover:border-accent/50 hover:bg-bg-secondary transition-all duration-300
        opacity-0 animate-slide-up stagger-${index + 1}
      `}
    >
      <div className="flex items-center gap-2 mb-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-text-tertiary group-hover:text-accent transition-colors"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
        <h3 className="font-mono text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
          {project.title}
        </h3>
      </div>
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border text-text-tertiary"
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}
