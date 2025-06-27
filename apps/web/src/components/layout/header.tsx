'use client';

import { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { LucideIcon } from 'lucide-react';

interface HeaderProps {
  title?: string;

  // 통합된 아이콘 방식
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;

  // 커스텀 컨텐츠 (셀렉트박스 등)
  leftContent?: ReactNode;
  rightContent?: ReactNode;

  // 클릭 핸들러
  onLeftClick?: () => void;
  onRightClick?: () => void;

  // 숨김 옵션
  hideLeft?: boolean;
  hideRight?: boolean;

  className?: string;
}

const Header = ({
  title,
  leftIcon,
  rightIcon,
  leftContent,
  rightContent,
  onLeftClick,
  onRightClick,
  hideLeft = false,
  hideRight = false,
  className = '',
}: HeaderProps) => {
  const router = useRouter();

  const renderLeftSection = () => {
    if (hideLeft) return null;

    // 커스텀 컨텐츠가 있으면 우선 렌더링
    if (leftContent) {
      return leftContent;
    }

    // 아이콘이 있으면 버튼으로 렌더링
    if (leftIcon) {
      const LeftIconComponent = leftIcon;
      return (
        <button
          onClick={onLeftClick || (() => router.back())}
          className="cursor-pointer p-1"
          aria-label="Left Icon Button"
        >
          <LeftIconComponent size={28} />
        </button>
      );
    }

    // 기본값: 빈 공간 (공간만 차지)
    return <div className="h-[40px] w-[40px]" />;
  };

  const renderRightSection = () => {
    if (hideRight) return null;

    // 커스텀 컨텐츠가 있으면 우선 렌더링
    if (rightContent) {
      return rightContent;
    }

    // 아이콘이 있으면 버튼으로 렌더링
    if (rightIcon) {
      const RightIconComponent = rightIcon;
      return (
        <button
          onClick={onRightClick}
          className="cursor-pointer p-1"
          aria-label="Right Icon Button"
        >
          <RightIconComponent size={28} />
        </button>
      );
    }

    return null;
  };

  // 왼쪽과 오른쪽 영역이 존재하는지 확인
  const hasLeftSection = !hideLeft && (leftContent || leftIcon !== undefined);
  const hasRightSection = !hideRight && (rightContent || rightIcon);

  // 양쪽 아이콘이 모두 없으면 헤더를 렌더링하지 않음
  if (!hasLeftSection && !hasRightSection && !title) {
    return null;
  }

  // 텍스트 정렬 결정
  // 왼쪽 아이콘이 있으면 중앙 정렬, 없으면 왼쪽 정렬
  const titleAlignment = hasLeftSection ? 'center' : 'left';

  return (
    <header
      className={`relative flex h-[50px] items-center justify-between bg-transparent px-[15px] py-[7px] ${className}`}
    >
      {/* 왼쪽 영역 */}
      {hasLeftSection && <div className="absolute left-[15px]">{renderLeftSection()}</div>}

      {/* 중앙/왼쪽 제목 */}
      {title && (
        <div
          className={`${
            titleAlignment === 'center'
              ? 'absolute left-1/2 -translate-x-1/2 transform'
              : hasLeftSection
                ? 'ml-4 flex-1'
                : 'flex-1'
          }`}
        >
          <h1
            className={`max-w-[300px] truncate text-[20px] font-semibold leading-[20px] text-[var(--color-neutral-900)] font-normal${
              titleAlignment === 'center' ? 'text-center' : 'text-left'
            }`}
          >
            {title}
          </h1>
        </div>
      )}

      {/* 오른쪽 영역 */}
      {hasRightSection && <div className="absolute right-[15px]">{renderRightSection()}</div>}
    </header>
  );
};

export default Header;
