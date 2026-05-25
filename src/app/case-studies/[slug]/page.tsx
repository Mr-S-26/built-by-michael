import { notFound } from 'next/navigation';
import { getCaseStudy, getAllSlugs } from '@/data/case-studies';
import CaseStudyContent from './CaseStudyContent';
import type { Metadata } from 'next';

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: 'Not Found' };
  return {
    title: `${cs.title} — Case Study | Michael Ryan`,
    description: cs.subtitle,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return <CaseStudyContent caseStudy={caseStudy} />;
}
