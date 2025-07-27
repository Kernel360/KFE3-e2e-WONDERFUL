'use client';

import { AddressForm } from '@/components/personal-info';
import { useUpdateAddress } from '@/hooks/mutations/addresses';
import type { CreateAddressRequest } from '@/lib/types/address';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const updateAddressMutation = useUpdateAddress();

  const dummy = {
    name: '김커널',
    address: '서울 강남구 강남대로 364',
    detail: '11층 A룸',
    phone: '010-1234-5678',
  };

  const handleUpdateAddress = (data: CreateAddressRequest) => {
    // API 호출
    updateAddressMutation.mutate({ id, data });
  };

  return <AddressForm item={dummy} onClick={handleUpdateAddress} />;
};

export default Page;
