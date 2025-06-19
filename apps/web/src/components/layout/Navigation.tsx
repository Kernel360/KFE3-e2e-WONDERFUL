'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HouseIcon, MessagesSquare, SearchIcon, UserRoundIcon } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

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
    <NavigationMenu className="flex-none flex-shrink-0 bg-white shadow-[var(--shadow-nav)]">
      <NavigationMenuList className="flex flex-1 items-center justify-center gap-0">
        {NAV_MENU.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <NavigationMenuItem
              key={href}
              className="flex w-[25vw] flex-col items-center justify-center"
            >
              <NavigationMenuLink asChild>
                <Link
                  href={href}
                  className={`group w-full items-center px-[24px] pb-[28px] pt-[12px] text-sm font-medium ${
                    isActive ? 'text-primary-500' : 'hover:text-primary-500 text-neutral-400'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-[12px] font-medium leading-[20px]">{name}</span>{' '}
                  {/* 색상 클래스 제거 */}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
