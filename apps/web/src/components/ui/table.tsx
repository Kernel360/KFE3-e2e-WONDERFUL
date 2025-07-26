'use client';

import * as React from 'react';

import { cn } from '@/lib/cn';

const Table = ({ className, ...props }: React.ComponentProps<'table'>) => {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
};

const TableHeader = ({ className, ...props }: React.ComponentProps<'thead'>) => {
  return (
    <thead
      data-slot="table-header"
      className={cn('border-zinc-500 [&_tr]:border-b', className)}
      {...props}
    />
  );
};

const TableBody = ({ className, ...props }: React.ComponentProps<'tbody'>) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
};

const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => {
  return (
    <tr
      data-slot="table-row"
      className={cn('flex justify-between transition-colors', className)}
      {...props}
    />
  );
};

const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'flex h-10 w-full items-center justify-start whitespace-nowrap px-2 font-semibold text-zinc-500',
        className
      )}
      {...props}
    />
  );
};

const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => {
  return (
    <td
      data-slot="table-cell"
      className={cn('flex w-full justify-start p-2.5 text-zinc-950', className)}
      {...props}
    />
  );
};

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
