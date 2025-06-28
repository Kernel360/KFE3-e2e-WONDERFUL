import React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs-categories';
import { TabItem } from '@/lib/constants/tabs';

interface CategoriesProps {
  items: TabItem[];
}

const Categories = ({ items }: CategoriesProps) => {
  if (!items || items.length === 0) {
    return <div>카테고리가 없습니다.</div>;
  }

  return (
    <Tabs defaultValue={items[0]!.id}>
      <TabsList className="my-3">
        {items.map(({ id, name }) => {
          return (
            <TabsTrigger key={id} value={id}>
              {name}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default Categories;
