'use client';

import { HTMLAttributes } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/cn';

interface ThumbnailProps extends HTMLAttributes<HTMLDivElement> {
  url: string;
  alt: string;
  size: number;
  priority?: boolean;
}

const Thumbnail = ({
  className,
  url,
  alt,
  size = 104,
  priority = false,
  ...props
}: ThumbnailProps) => {
  return (
    <div className={cn('overflow-hidden rounded-md border border-neutral-200', className)}>
      <Image
        src={url}
        alt={alt}
        className="h-full w-full object-cover"
        width={size}
        height={size}
        sizes={`${size}px`}
        quality={80}
        priority={priority}
        {...props}
      />
    </div>
  );
};

export default Thumbnail;
