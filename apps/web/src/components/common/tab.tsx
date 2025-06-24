import { TabBasic, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tab-basic';
import React from 'react';

interface TabProps {
  tabs: TabItem[];
}

interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

const Tab = ({ tabs }: TabProps) => {
  return (
    <TabBasic defaultValue={tabs[0]?.key}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.key} value={tab.key}>
          {tab.content}
        </TabsContent>
      ))}
    </TabBasic>
  );
};

export default Tab;
