import Link from 'next/link';
import { ShoppingCart, Tag, Heart } from 'lucide-react';

const items = [
  { icon: <ShoppingCart className="h-6 w-6" />, label: '구매목록', href: '/profile/purchases' },
  { icon: <Tag className="h-6 w-6" />, label: '판매목록', href: '/profile/sales' },
  { icon: <Heart className="h-6 w-6" />, label: '관심목록', href: '/profile/wishlist' },
];

const ProfileShortcutMenu = () => (
  <div className="flex justify-around border-b-4 border-neutral-100 bg-white py-5">
    {items.map(({ icon, label, href }) => (
      <Link key={label} href={href} className="flex flex-col items-center gap-2">
        {icon}
        <span className="text-xs text-neutral-600">{label}</span>
      </Link>
    ))}
  </div>
);

export default ProfileShortcutMenu;
