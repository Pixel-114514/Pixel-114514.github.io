import { buildPageMetadata } from '@/lib/seo';
import Image from 'next/image';

export const metadata = buildPageMetadata({
  title: 'About',
  description: 'Learn more about my background, skills, and experience in AI and software engineering.',
  path: '/about/',
});

const skills = {
  'Languages': ['Python', 'C/C++', 'Go', 'JavaScript', 'TypeScript', 'SQL'],
  'AI/ML': ['PyTorch', 'PaddlePaddle', 'Transformers', 'vLLM', 'DeepSpeed'],
  'Frameworks': ['Vue', 'React', 'Next.js', 'FastAPI', 'Flask'],
  'Infrastructure': ['Linux', 'Docker', 'Nginx', 'Git', 'CI/CD'],
  'Specialties': ['LLM Deployment', 'MCP', 'RAG', 'LangChain', 'Multi-Agent Systems'],
};

const experience = [
  {
    title: 'Agent Development Intern',
    company: 'Hangzhou Chitu Computing Technology',
    period: 'Sep 2025 — Present',
    highlights: [
      'Engineered high-performance AI Agent systems using Claude Code and OpenClaw',
      'Developed workflow engine with parameterized nodes, conditional branching, and multi-agent orchestration',
      'Implemented intelligent scheduling system with dynamic priority queues for large-scale agent coordination',
      'Built AI-driven business process automation using Agent paradigm',
    ],
  },
  {
    title: 'Backend Development Intern',
    company: 'Shandong Shenghe Sheng Technology',
    period: 'Jan 2025 — Feb 2025',
    highlights: [
      'Built customer service knowledge base with Neo4j graph database and large language models',
      'Improved answer accuracy from 60% to 90% through knowledge graph integration',
    ],
  },
];

const projects = [
  {
    name: 'xiaomicare_prototype',
    description: 'Privacy anomaly detection using federated learning and LLM-based reasoning. Participated in Xiaomi AI Competition.',
    tech: ['Python', 'PyTorch', 'LLM', 'Federated Learning'],
    link: 'https://github.com/Pixel-114514',
  },
  {
    name: 'rl_algorithms',
    description: 'Clean implementations of PPO, SAC, and other RL algorithms with documentation and benchmarks.',
    tech: ['Python', 'PyTorch', 'Gymnasium'],
    link: 'https://github.com/Pixel-114514',
  },
  {
    name: 'CASIA_HWDB_Dataset',
    description: 'Open-source handwriting recognition dataset processing toolkit with 54,000+ labeled samples.',
    tech: ['Python', 'Computer Vision', 'OCR'],
    link: 'https://github.com/Pixel-114514',
  },
  {
    name: 'DreamTranslator',
    description: 'Multi-attentive feature enhancement network for image captioning on MSCOCO dataset.',
    tech: ['Python', 'PyTorch', 'NLP'],
    link: 'https://github.com/Pixel-114514',
  },
];

const awards = [
  '2025 — iFLYTEK AI Developer Competition',
  '2024 — National Mathematical Modeling Competition, Provincial First Prize',
  '2024 — COMAP MCM/ICM, Meritorious Winner',
  '2024 — Outstanding Student Award',
];

export default function AboutPage() {
  return (
    <div className="grid-bg">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-16 opacity-0 animate-fade-in">
          <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-border shrink-0">
            <Image
              src="/images/avatar.jpg"
              alt="董盛伟"
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-heading font-bold text-text-primary mb-2">
              董盛伟
            </h1>
            <p className="font-mono text-sm text-accent mb-3">
              AI Researcher & Full-Stack Developer
            </p>
            <p className="text-text-secondary leading-relaxed text-sm">
              Undergraduate in Artificial Intelligence at China University of Petroleum (East China).
              Passionate about building intelligent systems, agent architectures, and contributing to open-source projects.
              Currently focused on LLM applications and multi-agent systems.
            </p>
          </div>
        </div>

        {/* Contact */}
        <section className="mb-16 opacity-0 animate-fade-in stagger-1">
          <SectionTitle title="contact" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ContactItem label="email" value="dengshengwei1@gmail.com" href="mailto:dengshengwei1@gmail.com" />
            <ContactItem label="github" value="Pixel-114514" href="https://github.com/Pixel-114514" />
            <ContactItem label="location" value="Shandong, China" />
            <ContactItem label="status" value="Open to opportunities" />
          </div>
        </section>

        {/* Education */}
        <section className="mb-16 opacity-0 animate-fade-in stagger-2">
          <SectionTitle title="education" />
          <div className="p-5 rounded-xl border border-border bg-bg-secondary/50">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-text-primary">China University of Petroleum (East China)</h3>
              <span className="font-mono text-xs text-text-tertiary shrink-0 ml-4">2022.09 — 2026.07</span>
            </div>
            <p className="text-sm text-accent font-mono">Bachelor of Engineering in Artificial Intelligence</p>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16 opacity-0 animate-fade-in stagger-3">
          <SectionTitle title="experience" />
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.company} className="p-5 rounded-xl border border-border bg-bg-secondary/50">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-text-primary">{exp.title}</h3>
                    <p className="text-sm text-accent font-mono">{exp.company}</p>
                  </div>
                  <span className="font-mono text-xs text-text-tertiary mt-1 md:mt-0">{exp.period}</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="text-accent mt-1.5 shrink-0">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16 opacity-0 animate-fade-in stagger-4">
          <SectionTitle title="skills" />
          <div className="space-y-4">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="p-5 rounded-xl border border-border bg-bg-secondary/50">
                <h3 className="font-mono text-xs text-accent mb-3 uppercase tracking-wider">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-3 py-1 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16 opacity-0 animate-fade-in stagger-5">
          <SectionTitle title="projects" />
          <div className="space-y-4">
            {projects.map((proj) => (
              <a
                key={proj.name}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-xl border border-border bg-bg-secondary/50 hover:border-accent/50 transition-colors group"
              >
                <h3 className="font-mono text-sm font-semibold text-text-primary group-hover:text-accent transition-colors mb-1">
                  {proj.name}
                </h3>
                <p className="text-sm text-text-secondary mb-3">{proj.description}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border text-text-tertiary">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section className="mb-16 opacity-0 animate-fade-in stagger-6">
          <SectionTitle title="awards" />
          <div className="space-y-3">
            {awards.map((award, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                <span className="text-accent font-mono mt-0.5">▸</span>
                {award}
              </div>
            ))}
          </div>
        </section>

        {/* Download PDF */}
        <section className="text-center py-10 border-t border-border">
          <p className="text-text-tertiary text-sm mb-4">Prefer a PDF version?</p>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 font-mono text-sm px-5 py-2.5 border border-border text-text-primary rounded-md hover:border-accent hover:text-accent transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download Resume
          </a>
        </section>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="font-mono text-sm text-text-tertiary mb-6">
      <span className="text-accent">#</span> {title}
    </h2>
  );
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-bg-secondary/30 hover:border-accent/30 transition-colors">
      <span className="font-mono text-xs text-accent w-16 shrink-0">{label}</span>
      <span className="text-sm text-text-secondary">{value}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
