import { redirect } from 'next/navigation';

import { Container } from '@/components/layout';
import { WishlistClient } from '@/components/profile/wishlist-client';

import { getCurrentUser } from '@/lib/utils/auth-server';
export const dynamic = 'force-dynamic';

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <Container className="px-4">
      <WishlistClient userId={user.id} />
    </Container>
  );
};

export default Page;
