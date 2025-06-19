'use client';

import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';

import { HouseIcon, MessageSquareIcon, SearchIcon, UserRoundIcon } from 'lucide-react';

// route 작업 후 수정 필요
const NAV_MENU = [
  { name: '홈', href: '/home', icon: <HouseIcon /> },
  { name: '검색', href: '/search', icon: <SearchIcon /> },
  { name: '채팅', href: '/chat', icon: <MessageSquareIcon /> },
  { name: '프로필', href: '/profile', icon: <UserRoundIcon /> },
];

const Footer = () => {
  return (
    <NavigationMenu className="w-full p-8">
      <NavigationMenuList className="flex justify-between">
        {NAV_MENU.map(({ name, href, icon }) => (
          <NavigationMenuItem key={href}>
            <NavigationMenuLink asChild>
              <button className="text-neutral-400">
                <Link href={href} className="flex flex-col items-center gap-1 text-sm font-medium">
                  {icon}
                  <span>{name}</span>
                </Link>
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Footer;
