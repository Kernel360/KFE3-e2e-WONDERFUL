/**
 * 이미지 URL이 유효한지 확인
 * @param url - 확인할 이미지 URL
 * @returns Promise<boolean>
 */
export const isValidImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

/**
 * 이미지 로딩 에러 시 기본 이미지로 대체
 * @param event - 이미지 에러 이벤트
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = event.target as HTMLImageElement;
  target.src = '/no-image.png'; // 기본 이미지 경로
  target.alt = '이미지를 불러올 수 없습니다'; // 대체 텍스트
  target.classList.add('object-cover'); // 스타일 적용
  target.classList.add('h-full'); // 높이 100% 적용
};
