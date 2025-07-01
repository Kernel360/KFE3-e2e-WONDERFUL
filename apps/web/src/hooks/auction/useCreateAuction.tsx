// hooks/auction/usePostAuction.ts
import { useCallback } from 'react';

const useCreateAuction = () => {
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {}, []);

  return { handleSubmit };
};

export default useCreateAuction;
