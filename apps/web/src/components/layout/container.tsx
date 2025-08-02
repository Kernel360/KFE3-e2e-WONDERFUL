import { tv } from 'tailwind-variants';

const Container = ({
  children,
  className = '',
  noNav = false,
}: {
  children: React.ReactNode;
  className?: string;
  noNav?: boolean;
}) => {
  const containerStyle = tv({
    base: 'pb-6 w-full flex-1 h-full scrollbar-hide-y `',
    variants: {
      noNav: {
        true: 'max-h-[calc(100vh-56px)]',
        false: 'min-h-[calc(100vh-136px)]',
      },
    },
    defaultVariants: {
      noNav: false,
    },
  });
  return <main className={containerStyle({ noNav: noNav, className })}>{children}</main>;
};

export default Container;
