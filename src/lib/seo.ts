import type { Metadata } from 'next';

const SITE_URL = 'https://shiena.dev';
const SITE_NAME = '椎名立希';

export function buildPageMetadata(opts: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = opts.path ? `${SITE_URL}${opts.path}` : SITE_URL;

  return {
    title: opts.title,
    description: opts.description,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      locale: 'zh_CN',
      type: 'website',
      images: opts.image ? [opts.image] : [`${SITE_URL}/images/avatar.jpg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: opts.image ? [opts.image] : [`${SITE_URL}/images/avatar.jpg`],
    },
    alternates: {
      canonical: url,
    },
  };
}
