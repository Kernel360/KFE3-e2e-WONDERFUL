import { ReactNode } from 'react';


export interface Props {
  size?: 'sm' | 'md' | 'lg'; 
  color?: 'primary' | 'secondary' | 'disabled'; 
  variant?: 'solid' | 'outlined'; 
  onClick?: () => void; 
  children: ReactNode; 
  className?: string; 
}

// 버튼 크기에 따른 Tailwind 클래스 매핑
const sizeClassMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-sm px-3 py-1.5',      
  md: 'text-base px-4 py-2',      
  lg: 'text-lg px-5 py-3',        
};

// 버튼 색상에 따른 Tailwind 클래스 매핑
const colorClassMap: Record<'primary' | 'secondary' | 'disabled', string> = {
  primary: 'text-white bg-blue-600 hover:bg-blue-700', 
  secondary: 'text-gray-800 bg-gray-200 hover:bg-gray-300', 
  disabled: 'text-gray-400 bg-gray-100 cursor-not-allowed',
};

// 버튼 스타일(variant)에 따른 Tailwind 클래스 매핑
const variantClassMap: Record<'solid' | 'outlined', string> = {
  solid: '', 
  outlined: 'bg-transparent border', 
};

// 버튼 컴포넌트 정의
const Button = ({
  size = 'md', 
  color = 'primary', 
  variant = 'solid', 
  children,
  onClick,
  className = '',
}: Props) => {
  const isDisabled = color === 'disabled'; // 'disabled' 색상일 경우 버튼 비활성화

  // 각각의 속성에 따라 적절한 클래스 추출
  const sizeClass = sizeClassMap[size];
  const colorClass = colorClassMap[color];
  const variantClass = variantClassMap[variant];

  console.log(sizeClass);
  
  return (
    <button
      // Tailwind 클래스 조합 및 추가 사용자 정의 클래스 포함
      className={`rounded-full font-semibold transition duration-200 ${sizeClass} ${colorClass} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={isDisabled} // 비활성화 여부 적용
    >
      {children} 
    </button>
  );
};

export default Button;