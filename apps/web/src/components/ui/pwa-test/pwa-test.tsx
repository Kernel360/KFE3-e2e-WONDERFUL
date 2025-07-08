'use client';

import { useEffect, useState } from 'react';

import {
  getUserSubscriptionStatus, // 🔥 수정: 통합된 상태 확인 함수
  sendNotification,
  subscribeFCMUser,
  subscribeUser,
  unsubscribeUser,
} from '@/lib/actions/push-notification';
import { initializeFCM, onMessageListener } from '@/lib/firebase-config';

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
  const [browserInfo, setBrowserInfo] = useState('');

  // 🔥 수정: 통합된 상태 관리
  const [webpushSubscribed, setWebpushSubscribed] = useState(false);
  const [fcmSubscribed, setFcmSubscribed] = useState(false);

  // Firebase FCM 상태
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [fcmStatus, setFcmStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    // 브라우저 감지
    const { userAgent } = navigator;
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);

    setBrowserInfo(isSafari ? 'Safari' : isIOS ? 'iOS' : 'Chrome');

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      if (isSafari || isIOS) {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (!isStandalone) {
          console.warn('사파리에서는 홈 화면에 설치 후 푸시 알림 사용 가능');
          setIsSupported(false);
          return;
        }
      }

      setIsSupported(true);
      initializeBothSystems();
    }
  }, []);

  const initializeBothSystems = async () => {
    try {
      // 🔥 수정: 통합된 상태 확인
      await checkSubscriptionStatus();

      // 1. 기존 WebPush 시스템 초기화
      await registerServiceWorker();

      // 2. Firebase FCM 시스템 초기화
      await initializeFirebaseFCM();
    } catch (error) {
      console.error('시스템 초기화 실패:', error);
    }
  };

  // 🔥 수정: 통합된 구독 상태 확인
  const checkSubscriptionStatus = async () => {
    try {
      const status = await getUserSubscriptionStatus();
      setWebpushSubscribed(status.webpushSubscribed);
      setFcmSubscribed(status.fcmSubscribed);
      console.log('현재 구독 상태:', status);
    } catch (error) {
      console.error('구독 상태 확인 실패:', error);
    }
  };

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error('Service Worker 등록 실패:', error);
    }
  };

  const initializeFirebaseFCM = async () => {
    try {
      setFcmStatus('loading');

      // Firebase FCM 초기화
      const token = await initializeFCM();

      if (token) {
        setFcmToken(token);
        setFcmStatus('ready');

        // 🔥 새로 추가: FCM 토큰 서버에 저장
        const result = await subscribeFCMUser(token, 'Web Browser - FCM');
        if (result.success) {
          setFcmSubscribed(true);
          console.log('✅ FCM 토큰이 서버에 저장되었습니다.');
        } else {
          console.error('❌ FCM 토큰 저장 실패:', result.error);
        }

        // 포그라운드 메시지 리스너 설정
        onMessageListener()
          .then((payload: any) => {
            console.log('🔥 포그라운드 Firebase 메시지:', payload);
            // 커스텀 알림 표시 (선택사항)
            showCustomNotification(payload);
          })
          .catch((err: any) => console.log('Firebase 메시지 리스너 실패:', err));

        console.log('🔥 Firebase FCM 초기화 완료!');
      } else {
        setFcmStatus('error');
      }
    } catch (error) {
      console.error('❌ Firebase FCM 초기화 실패:', error);
      setFcmStatus('error');
    }
  };

  const showCustomNotification = (payload: any) => {
    console.log('🔍 포그라운드 알림 데이터:', payload); // 추가

    const title = payload.notification?.title || '알림';
    console.log('🔍 알림 제목:', title); // 추가

    if (Notification.permission === 'granted' && title !== 'undefined') {
      // 수정
      new Notification(title, {
        body: payload.notification?.body || '새로운 메시지입니다.',
        icon: '/icon/medium',
      });
    }
  };

  // 🔥 수정: WebPush 구독 처리 개선
  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      });
      setSubscription(sub);
      const serializedSub = JSON.parse(JSON.stringify(sub));
      const result = await subscribeUser(serializedSub);

      if (result.success) {
        setWebpushSubscribed(true);
        console.log('✅ WebPush 구독 완료');
      } else {
        console.error('❌ WebPush 구독 실패:', result.error);
      }
    } catch (error) {
      console.error('WebPush 구독 중 오류:', error);
    }
  };

  // 🔥 수정: WebPush 구독 해제 처리 개선
  const unsubscribeFromPush = async () => {
    try {
      await subscription?.unsubscribe();
      setSubscription(null);
      const result = await unsubscribeUser('webpush'); // 🔥 수정: WebPush만 해제

      if (result.success) {
        setWebpushSubscribed(false);
        console.log('✅ WebPush 구독 해제 완료');
      } else {
        console.error('❌ WebPush 구독 해제 실패:', result.error);
      }
    } catch (error) {
      console.error('WebPush 구독 해제 중 오류:', error);
    }
  };

  // 🔥 새로 추가: FCM 구독 해제
  const unsubscribeFromFCM = async () => {
    try {
      const result = await unsubscribeUser('fcm'); // FCM만 해제

      if (result.success) {
        setFcmSubscribed(false);
        console.log('✅ FCM 구독 해제 완료');
      } else {
        console.error('❌ FCM 구독 해제 실패:', result.error);
      }
    } catch (error) {
      console.error('FCM 구독 해제 중 오류:', error);
    }
  };

  const sendTestNotification = async () => {
    if (subscription) {
      await sendNotification(message);
      setMessage('');
    }
  };

  const sendFirebaseTestNotification = async () => {
    if (fcmToken) {
      try {
        // Supabase Database Webhook을 통한 Firebase 알림 테스트
        const response = await fetch('/api/test-firebase-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: '🔥 Firebase 테스트',
            content: message || 'Firebase Cloud Messaging 테스트 알림입니다!',
            fcmToken: fcmToken,
          }),
        });

        if (response.ok) {
          console.log('✅ Firebase 테스트 알림 전송 완료');
          setMessage('');
        } else {
          console.error('❌ Firebase 알림 전송 실패');
        }
      } catch (error) {
        console.error('❌ Firebase 알림 API 호출 실패:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-3xl font-bold">🧪 PWA + Firebase FCM 테스트 (통합)</h1>

        {/* 브라우저 정보 */}
        <div className="mx-auto mb-6 max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">🌐 브라우저 정보</h2>
          <p className="text-sm text-gray-600">현재 브라우저: {browserInfo}</p>
          {browserInfo === 'Safari' && (
            <p className="mt-2 text-sm text-orange-600">
              ⚠️ 사파리에서는 홈 화면에 설치 후 푸시 알림 사용 가능합니다.
            </p>
          )}
        </div>

        {/* 🔥 수정: 통합 상태 표시 */}
        <div className="mx-auto mb-6 max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">📊 알림 구독 상태</h2>
          <div className="space-y-2">
            <p className={`text-sm ${webpushSubscribed ? 'text-green-600' : 'text-gray-500'}`}>
              WebPush: {webpushSubscribed ? '✅ 구독 중' : '❌ 미구독'}
            </p>
            <p className={`text-sm ${fcmSubscribed ? 'text-green-600' : 'text-gray-500'}`}>
              Firebase FCM: {fcmSubscribed ? '✅ 구독 중' : '❌ 미구독'}
            </p>
          </div>
        </div>

        {/* Firebase FCM 상태 */}
        <div className="mx-auto mb-6 max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">🔥 Firebase Cloud Messaging</h2>
          {fcmStatus === 'loading' && <p className="text-blue-600">⏳ Firebase FCM 초기화 중...</p>}
          {fcmStatus === 'ready' && (
            <div className="space-y-2">
              <p className="text-green-600">✅ Firebase FCM 준비 완료!</p>
              <p className="break-all text-xs text-gray-500">
                토큰: {fcmToken?.substring(0, 50)}...
              </p>
              {/* 🔥 새로 추가: FCM 구독 해제 버튼 */}
              {fcmSubscribed && (
                <button
                  onClick={unsubscribeFromFCM}
                  className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  FCM 구독 해제
                </button>
              )}
            </div>
          )}
          {fcmStatus === 'error' && <p className="text-red-600">❌ Firebase FCM 초기화 실패</p>}
        </div>

        {/* PWA 설치 테스트 */}
        <div className="mx-auto mb-6 max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">📱 PWA 설치</h2>
          <p className="mb-4 text-sm text-gray-600">Chrome 주소창에서 설치 아이콘을 찾아보세요!</p>
        </div>

        {/* WebPush 알림 테스트 */}
        <div className="mx-auto mb-6 max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">🔔 WebPush 알림 (기존)</h2>

          {!isSupported ? (
            <p className="text-red-600">이 브라우저는 푸시 알림을 지원하지 않습니다.</p>
          ) : webpushSubscribed ? (
            <div className="space-y-4">
              <p className="text-sm text-green-600">✅ WebPush 알림이 활성화되었습니다.</p>
              <button
                onClick={unsubscribeFromPush}
                className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                WebPush 구독 해제
              </button>
              <div>
                <input
                  type="text"
                  placeholder="WebPush 테스트 메시지"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mb-2 w-full rounded border border-gray-300 px-3 py-2"
                />
                <button
                  onClick={sendTestNotification}
                  className="w-full rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                >
                  🚀 WebPush 테스트 알림
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">WebPush 알림이 비활성화되어 있습니다.</p>
              <button
                onClick={subscribeToPush}
                className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                🔔 WebPush 구독하기
              </button>
            </div>
          )}
        </div>

        {/* Firebase FCM 알림 테스트 */}
        <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">🔥 Firebase FCM 알림 (신규)</h2>

          {fcmStatus === 'ready' && fcmSubscribed ? (
            <div className="space-y-4">
              <p className="text-sm text-green-600">✅ Firebase FCM이 활성화되었습니다.</p>
              <div>
                <input
                  type="text"
                  placeholder="Firebase 테스트 메시지"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mb-2 w-full rounded border border-gray-300 px-3 py-2"
                />
                <button
                  onClick={sendFirebaseTestNotification}
                  className="w-full rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                  🔥 Firebase 테스트 알림
                </button>
              </div>
              <p className="text-xs text-gray-500">
                💡 이 버튼은 Database Webhook을 통해 Firebase 알림을 발송합니다.
              </p>
            </div>
          ) : (
            <p className="text-gray-600">Firebase FCM 구독을 기다리는 중...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PWATest;
