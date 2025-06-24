import React from 'react';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <TabsList>
      {CATEGORIES.map(({ id, name }) => {
        return (
          <TabsTrigger value={name} key={id}>
            {name}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
};

export default Categories;
