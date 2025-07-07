import React from 'react';

import Link from 'next/link';

interface MenuItem {
  title: string;
  route: string;
}

interface MenuSection {
  id: string; // 고유 ID 추가!
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    id: 'account', // 고유 ID
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
    id: 'support',
    title: '고객 지원',
    items: [
      { title: '고객센터', route: '/support' },
      { title: '설정', route: '/settings' },
    ],
  },
];

export const MenuList = () => {
  return (
    <nav aria-label="마이페이지 메뉴 목록">
      {menuSections.map((section) => (
        <section key={section.id} className="mb-14 w-full space-y-6 px-6">
          <h2 className="mb-6 text-lg font-bold text-neutral-900">{section.title}</h2>
          <ul className="space-y-6">
            {section.items.map((item) => (
              <li key={item.route}>
                <Link
                  href={item.route}
                  className="block text-sm font-medium leading-[24px] text-neutral-900"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
};
