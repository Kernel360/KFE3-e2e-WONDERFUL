'use client';

import Header from './Header';
import Navigation from './Navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="mx-auto flex h-screen min-w-[320px] max-w-[480px] flex-col">
      <Header />
      <main className="flex-1 overflow-auto bg-white p-[15px]">{children}</main>
      <Navigation />
    </div>
  );
};

export default MainLayout;
