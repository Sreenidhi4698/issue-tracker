import prisma from '@/prisma/client';
import React from 'react';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';
import { IssueStatusBadge, Link } from './components';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      user: true,
    },
  });
  return (
    <Card>
      <Heading size={'4'} mb={'5'}>
        Latest issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify={'between'}>
                  <Flex direction={'column'} align={'start'} gap={'2'}>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                  </Flex>
                  {issue.userId && (
                    <Avatar
                      src={issue.user?.image!}
                      fallback='?'
                      size={'2'}
                      radius='full'
                    ></Avatar>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
