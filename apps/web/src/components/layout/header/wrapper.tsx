const HeaderWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header className={`flex h-16 w-full items-center justify-between px-4 ${className}`}>
      {children}
    </header>
  );
};

export default HeaderWrapper;
