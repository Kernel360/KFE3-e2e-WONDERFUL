import { redirect } from 'next/navigation';

import { Container } from '@/components/layout';
import { PurchasesList } from '@/components/profile/purchases-list';

import { getCurrentUser } from '@/lib/utils/auth-server';

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <Container className="px-4">
      <PurchasesList userId={user.id} />
    </Container>
  );
};

export default Page;
