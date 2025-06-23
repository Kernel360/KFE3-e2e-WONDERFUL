import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import React from 'react';

interface ItemImagesProps {
  urls: string[];
}

const dummyUrls: string[] = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1580618672594-16c1fb0156ec?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519741491124-950d73ef6fde?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
];

const ItemImages = ({ urls = dummyUrls }: ItemImagesProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel className="relative w-full" setApi={setApi}>
      <CarouselContent>
        {urls.map((url, index) => (
          <CarouselItem key={index}>
            <img
              src={url}
              alt={`item-${index}`}
              className="aspect-square w-full rounded-md object-cover"
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
