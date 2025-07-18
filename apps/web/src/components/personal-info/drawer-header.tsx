import { DrawerTitle } from '@/components/ui';

interface DrawerHeaderProps {
  title: string;
  description: string;
}

const DrawerHeader = ({ title, description }: DrawerHeaderProps) => {
  return (
    <div className="flex flex-col gap-1 px-3">
      <DrawerTitle className="text-lg font-semibold text-neutral-900">{title}</DrawerTitle>
      <span className="text-sm font-medium text-neutral-600">{description}</span>
    </div>
  );
};

export default DrawerHeader;
