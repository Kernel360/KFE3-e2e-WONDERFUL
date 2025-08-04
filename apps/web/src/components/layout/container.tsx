const Container = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={`scrollbar-hide-y scroll-touch h-full w-full overflow-y-auto overscroll-contain ${className}`}
    >
      {children}
    </main>
  );
};

export default Container;
