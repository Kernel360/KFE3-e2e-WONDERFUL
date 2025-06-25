import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs-categories';

interface CategoriesProps {
  id: string;
  name: string;
}

const CATEGORIES: CategoriesProps[] = [
  {
    id: '1',
    name: 'NOW 🔥',
  },
  {
    id: '2',
    name: '가전제품',
  },
  {
    id: '3',
    name: '생활용품',
  },
  {
    id: '4',
    name: '가구',
  },
  {
    id: '5',
    name: '뷰티/미용',
  },
  {
    id: '6',
    name: '교환권/쿠폰',
  },
  {
    id: '7',
    name: '유아동',
  },
];

const Categories = () => {
  return (
    <Tabs defaultValue={CATEGORIES[0]!.id}>
      <TabsList className="my-3">
        {CATEGORIES.map(({ id, name }) => {
          return (
            <TabsTrigger value={id} key={name}>
              {name}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default Categories;
