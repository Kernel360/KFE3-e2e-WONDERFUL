import React from 'react';

import Link from 'next/link';

interface MenuItem {
  title: string;
  route: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: '계정 정보',
    items: [
      { title: '판매 내역', route: '/profile/sales' },
      { title: '구매 내역', route: '/profile/purchases' },
      { title: '관심 목록', route: '/profile/wishlist' },
      { title: '위치 정보 설정', route: '/profile/location' },
      { title: '결제 정보 설정', route: '/profile/payment' },
    ],
  },
  {
    title: '고객 지원',
    items: [
      { title: '고객센터', route: '/support' },
      { title: '설정', route: '/settings' },
    ],
  },
];

export const MenuList = () => {
  return (
    <div className="space-y-14">
      {menuSections.map((section) => (
        <div key={section.title} className="w-full px-6">
          <div className="mb-6 font-['Noto_Sans_KR'] text-lg font-bold text-neutral-900">
            {section.title}
          </div>
          <div className="space-y-6">
            {section.items.map((item) => (
              <Link
                key={item.title}
                href={item.route}
                className="block font-['Noto_Sans_KR'] text-sm font-medium leading-[24px] text-neutral-900"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
