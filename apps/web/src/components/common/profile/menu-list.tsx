import Link from 'next/link';
import { menuSections } from '@/constants/profile';

const MenuList = () => (
  <nav aria-label="마이페이지 메뉴 목록" className="px-8">
    {menuSections.map((section) => (
      <section key={section.id} className="mt-8">
        <h2 className="mb-4 text-sm font-bold text-neutral-400">{section.title}</h2>
        <ul className="space-y-4">
          {section.items.map((item) => (
            <li key={item.route || item.url}>
              {item.route ? (
                <Link href={item.route} className="block py-1 text-sm font-medium text-neutral-900">
                  {item.title}
                </Link>
              ) : item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medium block py-1 text-sm no-underline"
                >
                  {item.title}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    ))}
  </nav>
);

export default MenuList;
