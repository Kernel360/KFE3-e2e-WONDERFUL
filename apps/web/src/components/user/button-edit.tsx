'use client';
import { FC } from 'react';

import { useRouter } from 'next/navigation';

import { Pen } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ButtonEditProps {
  onClick?: () => void;
}

const ButtonEdit: FC<ButtonEditProps> = ({ onClick }) => {
  const router = useRouter();
  const handleClick = () => {
    if (onClick) return onClick();
    router.push('/profile/edit');
  };
  return (
    <Button variant="outline" size="sm" onClick={handleClick}>
      <Pen />
      수정완료
    </Button>
  );
};

export default ButtonEdit;
