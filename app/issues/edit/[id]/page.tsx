import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from './loading';
import { cache } from 'react';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton></IssueFormSkeleton>,
});

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const page = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  return <IssueForm issue={issue}></IssueForm>;
};

export default page;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: 'Edit details of issue - ' + issue?.id,
  };
}
