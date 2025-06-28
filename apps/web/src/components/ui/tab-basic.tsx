'use client';

import * as React from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/cn';

const TabBasic = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex w-full flex-col gap-2 bg-white', className)}
      {...props}
    />
  );
};

const TabsList = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) => {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex h-9 w-full items-center justify-center bg-transparent p-[3px]',
        className
      )}
      {...props}
    />
  );
};

const TabsTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'border-b-1 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap border-neutral-200 py-4 text-sm font-medium text-neutral-500 transition-[color,box-shadow] focus-visible:border-b-2 data-[state=active]:border-b-2 data-[state=active]:border-neutral-600 data-[state=active]:bg-transparent data-[state=active]:text-neutral-600',
        className
      )}
      {...props}
    />
  );
};

const TabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 p-3 outline-none', className)}
      {...props}
    />
  );
};

export { TabBasic, TabsContent, TabsList, TabsTrigger };
