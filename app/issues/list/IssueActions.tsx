import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = ({ children }: PropsWithChildren) => {
  return (
    <Flex justify={'between'}>
      <IssueStatusFilter></IssueStatusFilter>
      {children}
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
