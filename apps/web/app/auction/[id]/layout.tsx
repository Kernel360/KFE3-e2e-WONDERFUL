import React from 'react';

// export default function AuctionLayout({
export default async function AuctionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // params: { id: string };
  params: Promise<{ id: string }>; // Promise로 변경
}) {
  const { id } = await params; // await 추가
  return <>{children}</>;
}
