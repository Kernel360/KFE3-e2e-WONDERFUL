interface DrawerHeaderProps {
  title: string;
  description: string;
}

const drawerHeader = ({ title, description }: DrawerHeaderProps) => {
  return (
    <div className="flex flex-col gap-1 px-3">
      <p className="text-lg font-semibold text-neutral-900">{title}</p>
      <span className="text-sm font-medium text-neutral-600">{description}</span>
    </div>
  );
};

export default drawerHeader;
