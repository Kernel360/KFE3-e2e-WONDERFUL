'use client';

import React, { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface ThumbnailProps extends HTMLAttributes<HTMLDivElement> {
  url: string;
  alt: string;
}

const Thumbnail = ({ className, url, alt }: ThumbnailProps) => {
  return (
    <div className={cn('overflow-hidden rounded-sm border border-neutral-200', className)}>
      <img src={url} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
};

export default Thumbnail;
