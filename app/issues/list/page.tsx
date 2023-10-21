import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import Pagination from '../_components/Pagination';
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction={'column'} gap={'3'}>
      <IssueActions>
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        ></Pagination>
      </IssueActions>
      <IssueTable searchParams={searchParams} issues={issues}></IssueTable>
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};
