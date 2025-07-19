import Link from 'next/link';

import { Plus } from 'lucide-react';

interface ButtonManageProps {
  url: string;
  title: string;
}

const ButtonManage = ({ url, title }: ButtonManageProps) => {
  return (
    <Link href={url} className="flex items-center gap-1 p-3 font-semibold text-neutral-900">
      <Plus />
      {title}
    </Link>
  );
};

export default ButtonManage;
