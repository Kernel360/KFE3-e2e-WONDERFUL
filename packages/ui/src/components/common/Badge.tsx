export interface Props {
  title: string;
  color: 'teal' | 'rose' | 'neutral';
}

// 배경색 매핑
const colorClassMap: Record<Props['color'], string> = {
  teal: 'bg-[#00CFB6]',
  rose: 'bg-[#FF5A74]',
  neutral: 'bg-[#8F8F8F]',
};

const Badge = ({ title, color }: Props) => {
  const colorClass = colorClassMap[color];

  return (
    <div
      className={`text-white text-[8px] font-bold px-2 py-0.5 rounded-[20px] backdrop-blur-md inline-flex justify-center items-center gap-2.5 ${colorClass} `}
    >
      {title}
    </div>
  );
};

export default Badge;
