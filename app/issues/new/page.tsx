import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import { Metadata } from 'next';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton></IssueFormSkeleton>,
});

const NewIssuePage = () => {
  return <IssueForm></IssueForm>;
};

export default NewIssuePage;

export const metadata: Metadata = {
  title: 'Issue Tracker - New Issue',
  description: 'Create new issue',
};
