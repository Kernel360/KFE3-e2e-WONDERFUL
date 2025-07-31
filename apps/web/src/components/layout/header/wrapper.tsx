import { cn } from '@/lib/cn';

interface HeaderWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const HeaderWrapper = ({ children, className, style }: HeaderWrapperProps) => {
  return (
    <header
      className={cn('flex h-16 w-full items-center justify-between px-4', className)}
      style={style}
    >
      {children}
    </header>
  );
};

export default HeaderWrapper;
