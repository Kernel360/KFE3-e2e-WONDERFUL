'use client';

import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui';

const ButtonBox = () => {
  // TODO: full-page 모달 연결
  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <div className="flex">
      <Button variant="solid" color="transparent" size="sm" onClick={handleEdit}>
        <Pencil className="text-neutral-600" />
      </Button>
      <Button variant="solid" color="transparent" size="sm" onClick={handleDelete}>
        <Trash2 className="text-neutral-600" />
      </Button>
    </div>
  );
};

export default ButtonBox;
