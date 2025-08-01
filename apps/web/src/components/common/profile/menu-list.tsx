import Link from 'next/link';

interface MenuItem {
  title: string;
  route: string;
}

interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    id: 'setting',
    title: '설정',
    items: [
      { title: '내 동네 설정', route: '/profile/location' },
      { title: '거래 주소 관리', route: '/address' },
      { title: '거래 계좌 관리', route: '/account' },
    ],
  },
  {
    id: 'support',
    title: '고객 지원',
    items: [
      { title: 'Q&A', route: '/profile/support' },
      { title: '설정', route: '/profile/settings' },
    ],
  },
];

const MenuList = () => (
  <nav aria-label="마이페이지 메뉴 목록" className="px-8">
    {menuSections.map((section) => (
      <section key={section.id} className="mt-8">
        <h2 className="mb-4 text-sm font-bold text-neutral-400">{section.title}</h2>
        <ul className="space-y-4">
          {section.items.map((item) => (
            <li key={item.route}>
              <Link href={item.route} className="block py-1 text-sm font-medium text-neutral-900">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </nav>
);

export default MenuList;
