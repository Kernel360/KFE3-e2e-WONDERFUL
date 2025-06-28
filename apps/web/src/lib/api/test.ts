// 테스트용 API 함수
export const fetchTestData = async (): Promise<{ message: string; timestamp: number }> => {
  // 실제로는 API 호출
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    message: 'TanStack Query 작동 중!',
    timestamp: Date.now(),
  };
};
