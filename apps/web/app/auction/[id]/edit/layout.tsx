import React from 'react';

export default function EditLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <>{children}</>;
}
