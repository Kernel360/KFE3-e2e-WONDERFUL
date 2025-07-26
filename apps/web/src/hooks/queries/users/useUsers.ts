import { useQuery } from '@tanstack/react-query';

import { getUsers } from '@/lib/api/users';
import { UsersResponse } from '@/lib/types/users';

export const useUsers = () => {
  return useQuery<UsersResponse>({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};
