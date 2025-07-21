'use client';

import { useState } from 'react';

import TestChatRoom from './test-chat-room';
// 두 사용자의 실제 UUID 사용
const user1Id = '550e8400-e29b-41d4-a716-446655440001'; // 판매자
const user2Id = '550e8400-e29b-41d4-a716-446655440002'; // 구매자
const ChatTest = () => {
  const [testRoomId] = useState('550e8400-e29b-41d4-a716-446655440010'); // 테스트용 고정 룸 ID
  const [testUserId, setTestUserId] = useState(user1Id); // 테스트용 사용자 ID

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="mb-6 text-2xl font-bold">실시간 채팅 테스트</h2>

      {/* 사용자 선택 (테스트용) */}
      <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <h3 className="mb-3 font-semibold text-yellow-800">테스트 설정</h3>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="user"
              value={user1Id}
              checked={testUserId === user1Id}
              onChange={(e) => setTestUserId(e.target.value)}
              className="mr-2"
            />
            사용자 1 (판매자)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="user"
              value={user2Id}
              checked={testUserId === user2Id}
              onChange={(e) => setTestUserId(e.target.value)}
              className="mr-2"
            />
            사용자 2 (구매자)
          </label>
        </div>
        <p className="mt-2 text-sm text-yellow-700">
          💡 다른 브라우저 탭에서 이 페이지를 열고, 다른 사용자를 선택해서 실시간 채팅을 테스트 가능
        </p>
      </div>

      {/* 채팅방 정보 */}
      <div className="mb-4 rounded-lg bg-gray-100 p-3">
        <div className="text-sm text-gray-600">
          <div>
            <strong>룸 ID:</strong> {testRoomId}
          </div>
          <div>
            <strong>현재 사용자:</strong> {testUserId}
          </div>
          <div>
            <strong>테스트 상품:</strong> 아이폰 15 Pro
          </div>
        </div>
      </div>

      {/* 실제 채팅방 - Props 명시적으로 전달 */}
      <TestChatRoom roomId={testRoomId} currentUserId={testUserId} auctionTitle="아이폰 15 Pro" />

      {/* 안내 메시지 */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-semibold text-blue-800">테스트 방법:</h4>
        <ol className="space-y-1 text-sm text-blue-700">
          <li>1. 새 브라우저 탭을 열어서 같은 페이지로 이동</li>
          <li>2. 다른 탭에서는 다른 사용자를 선택</li>
          <li>3. 양쪽에서 메시지 전송 시도</li>
          <li>4. 실시간으로 메시지가 동기화되는지 확인</li>
        </ol>
      </div>
    </div>
  );
};

export default ChatTest;
