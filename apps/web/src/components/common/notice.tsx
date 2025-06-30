'use client';

interface statusClasses {}

const Notice = ({ children, status }: { children: React.ReactNode; status: string }) => {
  const typeClasses: Record<string, string> = {
    notice: 'bg-neutral-100',
    caution: 'bg-danger-50 text-danger-600',
  };

  return (
    <ul
      className={`[&_svg]:size-4.5 my-3 flex flex-col gap-1 rounded-md px-4 pb-3 pt-3.5 text-sm font-medium [&_li]:flex [&_li]:items-center [&_li]:gap-1 ${typeClasses[status] ?? typeClasses['info']}`}
    >
      {children}
    </ul>
  );
};

export default Notice;
