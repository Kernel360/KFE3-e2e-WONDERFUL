'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HouseIcon, MessagesSquare, SearchIcon, UserRoundIcon } from 'lucide-react';

// route 작업 후 수정 필요
const NAV_MENU = [
  { name: '홈', href: '/', icon: HouseIcon },
  { name: '검색', href: '/search', icon: SearchIcon },
  { name: '채팅', href: '/chat', icon: MessagesSquare },
  { name: '프로필', href: '/profile', icon: UserRoundIcon },
];

const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="mx-auto w-full min-w-[320px] max-w-[480px] bg-white shadow-[var(--shadow-nav)]">
      <ul className="flex h-[88px] w-full">
        {NAV_MENU.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href} className="h-full w-1/4">
              <Link
                href={href}
                className={`flex h-full w-full flex-col items-center gap-1 pt-[12px] text-sm font-medium transition-colors ${
                  isActive ? 'text-primary-500' : 'hover:text-primary-500 text-neutral-400'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium leading-5">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
