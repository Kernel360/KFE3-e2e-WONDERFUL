import React from 'react';

export default function AuctionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <>{children}</>;
}
