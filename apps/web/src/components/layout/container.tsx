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
    base: 'w-full flex-1 h-full scrollbar-hide-y',
    variants: {
      noNav: {
        true: 'max-h-[calc(100vh-56px)]',
        false: 'max-h-[calc(100vh)]',
      },
    },
    defaultVariants: {
      noNav: false,
    },
  });
  return <main className={containerStyle({ noNav: noNav, className })}>{children}</main>;
};

export default Container;
