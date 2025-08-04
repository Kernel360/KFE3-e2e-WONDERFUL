'use client';

import { AddressEditForm } from '@/components/personal-info';
import { use } from 'react';

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return <AddressEditForm addressId={id} />;
};

export default Page;
