'use client';

import { useUsers } from '../hooks/api/users/useUsers';

const HomePage = () => {
  const { data, isLoading, error } = useUsers();

  console.log('data:', data);

  if (isLoading) return <div>데이터 로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">메인 홈 페이지</h1>
      <p className="text-lg">{data?.message}</p>
      <p>{data ? `연결 성공! 사용자 수: ${data.userCount}명` : '연결 실패'}</p>
    </div>
  );
};

export default HomePage;
