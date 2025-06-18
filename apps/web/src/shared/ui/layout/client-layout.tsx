'use client';

import { QueryProvider } from '~shared/lib/providers/query-provider';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default ClientLayout;
