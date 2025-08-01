import React from 'react';

import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface ItemImagesProps {
  urls?: string[];
}

const ItemImages = ({ urls }: ItemImagesProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const timer = setTimeout(() => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    }, 50);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    return () => clearTimeout(timer);
  }, [api, urls]);

  return (
    <Carousel className="relative w-full" setApi={setApi}>
      <CarouselContent>
        {urls?.map((url, index) => (
          <CarouselItem key={index}>
            <Image
              src={url}
              alt={`item-${index}`}
              className="aspect-square w-full object-cover"
              width={480}
              height={480}
              priority={index === 0}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              quality={80}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: count }).map((_, idx) => (
          <span
            key={idx}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              current - 1 === idx ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
};

export default ItemImages;
