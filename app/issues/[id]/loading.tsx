import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Box, Card, Flex } from '@radix-ui/themes';
import React from 'react';

const LoadingIssueDetailPage = () => {
  return (
    <Box>
      <Skeleton className='max-w-xl'></Skeleton>
      <Flex className='space-x-3' my='2'>
        <Skeleton width='5rem'></Skeleton>
        <Skeleton width='8rem'></Skeleton>
      </Flex>
      <Card className='prose mt-4'>
        <Skeleton count={3}></Skeleton>
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
