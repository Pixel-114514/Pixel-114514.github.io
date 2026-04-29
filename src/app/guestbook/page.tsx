import { buildPageMetadata } from '@/lib/seo';
import { Comments } from '@/components/Comments';

export const metadata = buildPageMetadata({
  title: 'Guestbook',
  description: 'Leave a message — comments powered by GitHub Discussions.',
  path: '/guestbook/',
});

export default function GuestbookPage() {
  return (
    <div className="grid-bg">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12 opacity-0 animate-fade-in">
          <h1 className="text-heading font-bold text-text-primary mb-4">
            Guestbook
          </h1>
          <p className="text-text-secondary leading-relaxed">
            随便写点什么吧，用 GitHub 账号登录即可留言。
          </p>
        </div>

        <div className="border-t border-border mb-10" />

        <div className="opacity-0 animate-fade-in stagger-2">
          <Comments />
        </div>
      </div>
    </div>
  );
}
