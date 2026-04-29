import { buildPageMetadata } from '@/lib/seo';
import { ResumeGate } from '@/components/ResumeGate';

export const metadata = buildPageMetadata({
  title: 'About',
  description: 'AI算法工程师 — 华南农业大学人工智能专业，CVPR顶会论文录用经验。',
  path: '/about/',
});

const skills = {
  '编程语言与基础': ['Python', 'Linux', 'Git'],
  '框架与算法': ['PyTorch', 'LangGraph', 'Diffusion Model', 'RAG', 'Transformer'],
  '语言能力': ['CET-4', 'CET-6'],
};

const experience = [
  {
    title: 'AI 算法工程师实习',
    company: '（求职中）',
    period: '期望薪资 6k-7k',
    city: '深圳',
    highlights: [],
  },
];

const projects = [
  {
    name: '基于物理一致性的高效流场超分辨率重建',
    role: '第二作者 | CVPR 2026 录用',
    period: '2025.07 — 2025.12',
    link: 'https://github.com/Pixel-114514/DiffSR-clean',
    highlights: [
      '负责前期文献调研，针对传统模型在流场重建中易引入伪影、忽略物理约束的问题，创新性地提出将残差扩散模型应用于流体超分任务',
      '搭建基于 PyTorch 的统一训练与评估框架，实现日志记录、模型断点重训、推理及多 GPU 并行训练；清洗整理 NS2D、ERA5 等流体数据集',
      '完成 SR3、EDSR、LIIF 及 ResShift 等多个 baseline 复现与对比；对 ReMD 模型深度调优，NS2D 4倍超分 RMSE 从 0.0700 降至 0.0484，所有数据集均达 SOTA',
      '分析采样步数对模型性能影响，完成消融实验；绘制能量谱误差图与帕累托成本曲线，验证模型高效性与物理保真度',
    ],
    tech: ['PyTorch', 'Diffusion Model', '超分辨率', 'CVPR'],
  },
  {
    name: '铁路标准纠正性检索增强生成系统',
    role: '独立开发',
    period: '2025.12 — 2026.02',
    link: 'https://github.com/Pixel-114514/railway_aide',
    highlights: [
      '通过爬虫模块抓取标准预览图；利用 MinerU 2.5 视觉模型解析复杂排版，输出结构化 Markdown 知识库',
      '实现置信度评估器（Evaluator），使用小模型对检索文档打分，通过阈值机制实现自纠错路由（本地知识细化/网络搜索/混合增强）',
      '解决传统 RAG 的"检索无关文档"和"知识库时效性"痛点',
    ],
    tech: ['Python', 'CRAG', 'Tavily API', 'text2vec-base-chinese'],
  },
  {
    name: '数据驱动的海洋风险灾害智能预警系统',
    role: '省级大创项目',
    period: '2024.06 — 2025.06',
    highlights: [
      '针对海洋观测数据缺失问题，负责基于 LSTM 的海洋叶绿素浓度时序预测填补模型的训练',
      '根据前 30 个时刻的数据预测后 5 个时刻的数据，实现缺失海洋叶绿素浓度数据的填充',
      '项目获省级大创结题',
    ],
    tech: ['Python', 'LSTM', '时序预测'],
  },
];

export default function AboutPage() {
  return (
    <div className="grid-bg">
      <ResumeGate>
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-16 opacity-0 animate-fade-in">
            <h1 className="text-heading font-bold text-text-primary mb-2">
              董盛伟
            </h1>
            <p className="font-mono text-sm text-accent mb-3">
              AI 算法工程师 | 华南农业大学 人工智能 本科
            </p>
            <p className="text-text-secondary leading-relaxed text-sm">
              人工智能专业背景，对 AI 发展有浓厚兴趣，具备扎实的深度学习算法基础，拥有 CVPR 顶会论文录用经验。
              动手能力强，具备快速上手新技术的学习敏锐度。
            </p>
          </div>

          {/* Basic Info */}
          <section className="mb-16 opacity-0 animate-fade-in stagger-1">
            <SectionTitle title="basic_info" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="电话" value="19867750545" />
              <InfoItem label="邮箱" value="maxkarl1921@gmail.com" href="mailto:maxkarl1921@gmail.com" />
              <InfoItem label="性别" value="男" />
              <InfoItem label="年龄" value="22" />
              <InfoItem label="学历" value="本科" />
              <InfoItem label="意向岗位" value="AI 算法工程师" />
              <InfoItem label="意向城市" value="深圳" />
              <InfoItem label="期望薪资" value="6k-7k" />
              <InfoItem label="求职类型" value="实习" />
            </div>
          </section>

          {/* Education */}
          <section className="mb-16 opacity-0 animate-fade-in stagger-2">
            <SectionTitle title="education" />
            <div className="p-5 rounded-xl border border-border bg-bg-secondary/50">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-1">
                <h3 className="font-semibold text-text-primary">华南农业大学 (双一流)</h3>
                <span className="font-mono text-xs text-text-tertiary mt-1 md:mt-0">2023.09 — 2027.09</span>
              </div>
              <p className="text-sm text-accent font-mono mb-3">人工智能 | 本科</p>
              <div className="text-sm text-text-secondary mb-2">
                <span className="text-text-tertiary font-mono text-xs">主修课程：</span>
                人工智能导论、模式识别与机器学习、数据库系统概论、计算智能、程序设计基础
              </div>
              <div className="text-sm text-text-secondary">
                <span className="text-text-tertiary font-mono text-xs">在校经历：</span>
                院团委宣传部干事、人工智能协会培训部干事
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-16 opacity-0 animate-fade-in stagger-3">
            <SectionTitle title="skills" />
            <div className="space-y-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="p-5 rounded-xl border border-border bg-bg-secondary/50">
                  <h3 className="font-mono text-xs text-accent mb-3">{category}</h3>
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
          <section className="mb-16 opacity-0 animate-fade-in stagger-4">
            <SectionTitle title="projects" />
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.name} className="p-5 rounded-xl border border-border bg-bg-secondary/50">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-1">
                    <h3 className="font-semibold text-text-primary">
                      {proj.link ? (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors underline underline-offset-4 decoration-accent/30 hover:decoration-accent">
                          {proj.name}
                        </a>
                      ) : proj.name}
                    </h3>
                    <span className="font-mono text-xs text-text-tertiary mt-1 md:mt-0 shrink-0 ml-4">{proj.period}</span>
                  </div>
                  <p className="text-sm text-accent font-mono mb-3">{proj.role}</p>
                  <ul className="space-y-2 mb-4">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="text-accent mt-1 shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-border text-text-tertiary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Self Evaluation */}
          <section className="mb-16 opacity-0 animate-fade-in stagger-5">
            <SectionTitle title="self_evaluation" />
            <div className="p-5 rounded-xl border border-border bg-bg-secondary/50">
              <p className="text-sm text-text-secondary leading-relaxed">
                人工智能专业背景，对 AI 发展有浓厚兴趣，具备扎实的深度学习算法基础，拥有 CVPR 顶会论文录用经验。
                动手能力强，具备快速上手新技术的学习敏锐度。
              </p>
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

function InfoItem({
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
      <span className="font-mono text-xs text-accent w-20 shrink-0">{label}</span>
      <span className="text-sm text-text-secondary">{value}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
