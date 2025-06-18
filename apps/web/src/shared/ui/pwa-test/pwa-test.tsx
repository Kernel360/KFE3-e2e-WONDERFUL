'use client';

import { useEffect, useState } from 'react';

import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from '@/src/shared/lib/actions/push-notification';

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const PWATest = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState('');
  const [browserInfo, setBrowserInfo] = useState(''); // 사파리 브라우저 감지

  useEffect(() => {
    // 브라우저 감지
    const { userAgent } = navigator;
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent); // 사파리 브라우저 감지
    const isIOS = /iPad|iPhone|iPod/.test(userAgent); // iOS 디바이스 감지

    setBrowserInfo(isSafari ? 'Safari' : isIOS ? 'iOS' : 'Chrome');

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      // 사파리에서는 푸시 알림 지원 확인
      if (isSafari || isIOS) {
        // 사파리/iOS는 PWA로 설치된 경우에만 푸시 알림 지원
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (!isStandalone) {
          console.warn('사파리에서는 홈 화면에 설치 후 푸시 알림 사용 가능');
          setIsSupported(false);
          return;
        }
      }

      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  };

  const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  };

  const unsubscribeFromPush = async () => {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  };

  const sendTestNotification = async () => {
    if (subscription) {
      await sendNotification(message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-3xl font-bold">🧪 PWA 테스트 페이지</h1>

        {/* ✅ 브라우저 정보 표시 */}
        <div className="mx-auto mb-6 max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">🌐 브라우저 정보</h2>
          <p className="text-sm text-gray-600">현재 브라우저: {browserInfo}</p>
          {browserInfo === 'Safari' && (
            <p className="mt-2 text-sm text-orange-600">
              ⚠️ 사파리에서는 홈 화면에 설치 후 푸시 알림 사용 가능합니다.
            </p>
          )}
        </div>

        {/* PWA 설치 테스트 */}
        <div className="mx-auto mb-6 max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">📱 PWA 설치</h2>
          <p className="mb-4 text-sm text-gray-600">Chrome 주소창에서 설치 아이콘을 찾아보세요!</p>
        </div>

        {/* 푸시 알림 테스트 */}
        <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">🔔 푸시 알림</h2>

          {!isSupported ? (
            <p className="text-red-600">이 브라우저는 푸시 알림을 지원하지 않습니다.</p>
          ) : subscription ? (
            <div className="space-y-4">
              <p className="text-sm text-green-600">✅ 푸시 알림이 활성화되었습니다.</p>
              <button
                onClick={unsubscribeFromPush}
                className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                구독 해제
              </button>
              <div>
                <input
                  type="text"
                  placeholder="테스트 메시지를 입력하세요"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mb-2 w-full rounded border border-gray-300 px-3 py-2"
                />
                <button
                  onClick={sendTestNotification}
                  className="w-full rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                >
                  🚀 테스트 알림 보내기
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">푸시 알림이 비활성화되어 있습니다.</p>
              <button
                onClick={subscribeToPush}
                className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                🔔 알림 구독하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWATest;
