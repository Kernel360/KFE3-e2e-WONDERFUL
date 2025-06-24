// apps/web/src/hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';

import { getUsers } from '@/api/users';

import { UsersResponse } from '@/types/users';

export const useUsers = () => {
  return useQuery<UsersResponse>({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};
