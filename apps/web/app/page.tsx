'use client';

import HomePage from '@/views/HomePage';
import Container from '@/components/layout/container';
import { MainHeader } from '@/components/layout';

const Page = () => {
  return (
    <>
      <MainHeader />
      <Container className="px-4">
        <HomePage />
      </Container>
    </>
  );
};

export default Page;
