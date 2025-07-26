'use client';

import Link from 'next/link';

import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui';

interface ButtonBoxProps {
  url: string;
}

const ButtonBox = ({ url }: ButtonBoxProps) => {
  // TODO: delete api 요청 함수 호출
  const handleDelete = () => {};

  return (
    <div className="flex">
      <Link href={url} className="flex size-10 items-center justify-center">
        <Pencil size={20} className="hover:text-primary-500 text-neutral-600" />
      </Link>
      <Button
        variant="solid"
        color="transparent"
        size="sm"
        onClick={handleDelete}
        className="hover:[&_svg]:text-danger-500"
      >
        <Trash2 size={20} className="text-neutral-600" />
      </Button>
    </div>
  );
};

export default ButtonBox;
