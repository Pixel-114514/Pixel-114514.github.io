import { buildPageMetadata } from '@/lib/seo';
import Image from 'next/image';
import { ResumeGate } from '@/components/ResumeGate';

export const metadata = buildPageMetadata({
  title: 'About',
  description: 'Learn more about my background, skills, and experience in AI and software engineering.',
  path: '/about/',
});

const skills = {
  '编程语言': ['Python', 'C/C++', 'Go', 'JavaScript/TypeScript', 'Vue'],
  '深度学习框架': ['PyTorch', 'PaddlePaddle'],
  '大模型与部署': ['vLLM', 'DeepSpeed', 'Tritor', 'Tensor-RT'],
  '核心技术': ['RAG', 'MCP', 'Prompt Engineering', 'Multi-Agent', 'LangChain'],
  '数据库与中间件': ['MySQL', 'Redis', 'Neo4j', 'Elasticsearch', '向量数据库（Milvus）'],
  '工程与部署': ['Linux', 'Nginx', 'Docker', 'Git', 'CI/CD'],
};

const experience = [
  {
    title: 'Agent开发实习生',
    company: '杭州赤途计算科技有限公司',
    period: '2025.09 — 至今',
    highlights: [
      '基于OpenClaw、Claude Code等工具，深度优化Codex Agent系统，打造高性能AI Agent',
      '基于LangChain、MCP与多种大模型API，构建多Agent协作的智能系统',
      '开发工作流引擎：参数化节点、条件分支、多Agent协作编排',
      '设计并实现智能调度系统，支持Agent动态优先级调度与大规模任务分配',
      '基于Agent范式打造企业业务流程自动化AI驱动的系统',
    ],
  },
  {
    title: '后端开发实习生',
    company: '山东省和晟科技有限公司',
    period: '2025.01 — 2025.02',
    highlights: [
      '参与客户售后系统的开发与维护',
      '参与设计售后系统与用户知识图谱知识库（Neo4j + 大模型）',
      '通过知识图谱技术，提升客服系统回答准确率从60%到90%',
    ],
  },
  {
    title: '后端开发实习生',
    company: '杭州萤石网络股份有限公司',
    period: '2024.10 — 2024.12',
    highlights: [
      '优化现有框架和工具，更新前后端接口',
      '参与测试工具页面、测试报告展示页面以及自动化用例平台相关功能的开发',
    ],
  },
];

const projects = [
  {
    name: 'xiaomicare_prototype',
    description: '基于小米可穿戴设备数据，实现了隐私异常检测（联邦学习 + LLM推理）。参加小米AI竞赛。',
    tech: ['Python', 'PyTorch', 'LLM', '联邦学习'],
    link: 'https://github.com/Pixel-114514/xiaomicare_prototype',
  },
  {
    name: 'CASIA_HWDB_Dataset',
    description: 'CASIA手写汉字数据集处理与开源发布，支持模型训练与评估，覆盖海量手写样本（5.4w+数据集）。',
    tech: ['Python', 'Computer Vision', 'OCR'],
    link: 'https://github.com/Pixel-114514/CASIA_HWDB_Dataset',
  },
  {
    name: 'rl_algorithms',
    description: '强化学习算法库，实现PPO、SAC等主流算法，附带详细文档与基准测试。',
    tech: ['Python', 'PyTorch', 'Gymnasium', 'RL'],
    link: 'https://github.com/Pixel-114514/rl_algorithms',
  },
  {
    name: 'DreamTranslator',
    description: '多注意力机制特征增强的图文描述生成系统（MSCOCO数据集），用特征增强融合策略提升图文描述质量。',
    tech: ['Python', 'PyTorch', 'NLP', 'CV'],
    link: 'https://github.com/Pixel-114514/DreamTranslator',
  },
  {
    name: 'Cliproxyapi',
    description: '对GPT系列模型的邮件验证与安全分析，探索多邮件多模态交互漏洞。',
    tech: ['Python', 'Security', 'API'],
    link: 'https://github.com/Pixel-114514/Cliproxyapi',
  },
  {
    name: 'OpenClaw Extensions',
    description: '为OpenClaw项目开发自定义扩展，包括Docker沙箱、Win11沙箱、浏览器MCP控制。',
    tech: ['TypeScript', 'Docker', 'MCP'],
    link: 'https://github.com/Pixel-114514',
  },
];

const awards = [
  '2025 — 科大讯飞 AI 开发者大赛',
  '2024 — 全国大学生数学建模竞赛 省一等奖',
  '2024 — 美国大学生数学建模竞赛 M 奖',
  '2024 — 中国石油大学（华东）优秀学生',
];

export default function AboutPage() {
  return (
    <div className="grid-bg">
      <ResumeGate>
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
                本科 / 人工智能 / 中国石油大学（华东）
              </p>
              <p className="text-text-secondary leading-relaxed text-sm">
                2026年应届毕业生，专注AI Agent架构、大模型应用与开源贡献。
                对世界充满好奇，喜欢不断探索新技术，保持终身学习的态度。
                性格乐观，积极向上，抗压能力强，团队协作能力好。
              </p>
            </div>
          </div>

          {/* Contact */}
          <section className="mb-16 opacity-0 animate-fade-in stagger-1">
            <SectionTitle title="contact" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactItem label="phone" value="13255321729" />
              <ContactItem label="email" value="maxkarl1921@gmail.com" href="mailto:maxkarl1921@gmail.com" />
              <ContactItem label="github" value="Pixel-114514" href="https://github.com/Pixel-114514" />
              <ContactItem label="birth" value="2004.02" />
              <ContactItem label="籍贯" value="山东省" />
              <ContactItem label="政治面貌" value="共青团员" />
            </div>
          </section>

          {/* Education */}
          <section className="mb-16 opacity-0 animate-fade-in stagger-2">
            <SectionTitle title="education" />
            <div className="p-5 rounded-xl border border-border bg-bg-secondary/50">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-text-primary">中国石油大学（华东）</h3>
                <span className="font-mono text-xs text-text-tertiary shrink-0 ml-4">2022.09 — 2026.07</span>
              </div>
              <p className="text-sm text-accent font-mono">本科 / 人工智能</p>
              <ul className="mt-3 space-y-1.5">
                <li className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">▸</span>
                  2024.05 全国大学生数学建模竞赛 省一等奖
                </li>
                <li className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">▸</span>
                  2024.02 美国大学生数学建模竞赛 M 奖
                </li>
                <li className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">▸</span>
                  2024.10 中国石油大学（华东）优秀学生
                </li>
              </ul>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-16 opacity-0 animate-fade-in stagger-3">
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

          {/* Experience */}
          <section className="mb-16 opacity-0 animate-fade-in stagger-4">
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
      </ResumeGate>
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
