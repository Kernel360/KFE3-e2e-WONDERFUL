import React from 'react';
import { AuctionHeader, Container } from '@/components/layout';

// export default function EditLayout({
export default async function AuctionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // params: { id: string };
  params: Promise<{ id: string }>; //Promise로 변경
}) {
  const { id } = await params; //await 추가
  return (
    <>
      <AuctionHeader />
      <Container>{children}</Container>
    </>
  );
}
