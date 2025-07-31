'use client';

import { AddressForm } from '@/components/personal-info';
import { ADDRESS_PLACEHOLDER } from '@/constants/personal-info';
import { useCreateAddress } from '@/hooks/mutations/addresses';
import type { CreateAddressRequest } from '@/lib/types/address';

const Page = () => {
  const createAddressMutation = useCreateAddress();

  const handleCreateAddress = (data: CreateAddressRequest) => {
    // API 호출
    createAddressMutation.mutate(data);
  };

  return <AddressForm item={ADDRESS_PLACEHOLDER} onClick={handleCreateAddress} />;
};

export default Page;
