import React from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, currentPage, pageSize }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <Flex align={'center'} gap={'2'}>
      <Button color='gray' variant='soft' disabled={currentPage == 1}>
        <DoubleArrowLeftIcon></DoubleArrowLeftIcon>
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage == 1}>
        <ChevronLeftIcon></ChevronLeftIcon>
      </Button>
      <Text size={'2'}>
        Page {currentPage} of {pageCount}{' '}
      </Text>
      <Button color='gray' variant='soft' disabled={currentPage == pageCount}>
        <ChevronRightIcon></ChevronRightIcon>
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage == pageCount}>
        <DoubleArrowRightIcon></DoubleArrowRightIcon>
      </Button>
    </Flex>
  );
};

export default Pagination;