import React from 'react';

// export default function EditLayout({
export default async function EditLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // params: { id: string };
  params: Promise<{ id: string }>; //Promise로 변경
}) {
  const { id } = await params; //await 추가

  return <>{children}</>;
}
