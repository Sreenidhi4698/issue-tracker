'use client';
import React from 'react';
import { Select } from '@radix-ui/themes';
import { Status } from '@prisma/client';

const IssueStatusFilter = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'CLOSED' },
    { label: 'Closed', value: 'IN_PROGRESS' },
  ];
  return (
    <Select.Root>
      <Select.Trigger placeholder='Filter by status...'></Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item value={status.value || 'ALL'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
