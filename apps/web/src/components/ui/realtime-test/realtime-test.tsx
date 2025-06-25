'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

const RealtimeTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected'
  >('connecting');
  const [testMessage, setTestMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  useEffect(() => {
    // Realtime 연결 상태 모니터링
    const channel = supabase
      .channel('realtime-test')
      .on('broadcast', { event: 'test-message' }, (payload) => {
        console.log('📨 메시지 받음:', payload);
        setReceivedMessages((prev) => [
          ...prev,
          `${new Date().toLocaleTimeString()}: ${payload.message}`,
        ]);
      })
      .subscribe((status) => {
        console.log('🔗 채널 상태:', status);
        if (status === 'SUBSCRIBED') {
          setConnectionStatus('connected');
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          setConnectionStatus('disconnected');
        }
      });

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendTestMessage = () => {
    if (!testMessage.trim()) return;

    const channel = supabase.channel('realtime-test');
    channel.send({
      type: 'broadcast',
      event: 'test-message',
      payload: { message: testMessage },
    });

    setTestMessage('');
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-600 bg-green-100';
      case 'disconnected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return '🟢 연결됨';
      case 'disconnected':
        return '🔴 연결 끊어짐';
      default:
        return '🟡 연결 중...';
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Realtime 연결 테스트</h2>

      {/* 연결 상태 표시 */}
      <div className={`mb-4 rounded-md px-3 py-2 text-sm font-medium ${getStatusColor()}`}>
        {getStatusText()}
      </div>

      {/* 메시지 전송 */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="테스트 메시지 입력..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && sendTestMessage()}
          />
          <button
            onClick={sendTestMessage}
            disabled={connectionStatus !== 'connected' || !testMessage.trim()}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            전송
          </button>
        </div>
      </div>

      {/* 받은 메시지들 */}
      <div>
        <h3 className="mb-2 text-sm font-medium text-gray-700">받은 메시지:</h3>
        <div className="max-h-32 overflow-y-auto rounded-md bg-gray-50 p-3">
          {receivedMessages.length === 0 ? (
            <p className="text-sm text-gray-500">아직 받은 메시지가 없습니다.</p>
          ) : (
            receivedMessages.map((msg, index) => (
              <div key={index} className="mb-1 text-sm text-gray-700">
                {msg}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 안내 메시지 */}
      <div className="mt-4 text-xs text-gray-500">
        💡 다른 브라우저 탭에서 이 페이지를 열어서 실시간 통신을 테스트 가능
      </div>
    </div>
  );
};

export default RealtimeTest;
