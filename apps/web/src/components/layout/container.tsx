const Container = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <main className={`h-full overflow-auto bg-white ${className} `}>{children}</main>;
};

export default Container;
