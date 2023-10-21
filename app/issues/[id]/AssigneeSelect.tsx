'use client';
import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch('/api/issues/' + issue.id, {
        userId: userId == 'unassigned' ? null : userId,
      });
    } catch (error) {
      toast.error('Changes could not be saved.');
    }
  };

  if (error) return null;

  if (isLoading) return <Skeleton></Skeleton>;

  return (
    <>
      <Select.Root
        defaultValue={issue.userId || 'unassigned'}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder='Assign...'></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value='unassigned'>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster></Toaster>
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
