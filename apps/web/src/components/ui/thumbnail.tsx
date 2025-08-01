'use client';

import { HTMLAttributes } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/cn';

interface ThumbnailProps extends HTMLAttributes<HTMLDivElement> {
  url: string;
  alt: string;
}

const Thumbnail = ({ className, url, alt, ...props }: ThumbnailProps) => {
  return (
    <div className={cn('overflow-hidden rounded-md border border-neutral-200', className)}>
      <Image
        src={url}
        alt={alt}
        className="h-full w-full object-cover"
        {...props}
        width={104}
        height={104}
        sizes="104px"
        quality={80}
      />
    </div>
  );
};

export default Thumbnail;
