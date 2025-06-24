'use client';

// apps/web/app/page.tsx에 추가
import ChatTest from '@/components/chat/chat-test';
import RealtimeTest from '@/components/ui/realtime-test';
const HomePage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">경매 서비스 - Realtime 테스트</h1>

      {/* 기본 Realtime 연결 테스트 */}
      <div className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">1. Realtime 연결 테스트</h2>
        <RealtimeTest />
      </div>

      {/* 실시간 채팅 테스트 */}
      <div className="mb-12">
        <h2 className="mb-4 text-xl font-semibold">2. 실시간 채팅 테스트</h2>
        <ChatTest />
      </div>
    </div>
  );
};

export default HomePage;
