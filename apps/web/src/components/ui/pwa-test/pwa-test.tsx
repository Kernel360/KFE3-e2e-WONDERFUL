'use client';

import { useEffect, useState } from 'react';

import {
  getFCMSubscriptionStatus,
  subscribeFCMUser,
  unsubscribeFCMUser,
} from '@/lib/actions/push-notification';
import { initializeFCM, onMessageListener } from '@/lib/firebase-config';

const PWATest = () => {
  const [message, setMessage] = useState('');
  const [browserInfo, setBrowserInfo] = useState('');
  const [fcmSubscribed, setFcmSubscribed] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [fcmStatus, setFcmStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    // 브라우저 감지
    const { userAgent } = navigator;
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);

    setBrowserInfo(isSafari ? 'Safari' : isIOS ? 'iOS' : 'Chrome');

    initializeFirebaseFCM();
  }, []);

  const initializeFirebaseFCM = async () => {
    try {
      setFcmStatus('loading');

      // FCM 구독 상태 확인
      await checkFCMSubscriptionStatus();

      // Firebase FCM 초기화
      const token = await initializeFCM();

      if (token) {
        setFcmToken(token);
        setFcmStatus('ready');

        // FCM 토큰 서버에 저장
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

  const checkFCMSubscriptionStatus = async () => {
    try {
      const status = await getFCMSubscriptionStatus();
      setFcmSubscribed(status.fcmSubscribed);
      console.log('현재 FCM 구독 상태:', status);
    } catch (error) {
      console.error('FCM 구독 상태 확인 실패:', error);
    }
  };

  const showCustomNotification = (payload: any) => {
    console.log('🔍 포그라운드 알림 데이터:', payload);

    const title = payload.notification?.title || '알림';
    console.log('🔍 알림 제목:', title);

    if (Notification.permission === 'granted' && title !== 'undefined') {
      new Notification(title, {
        body: payload.notification?.body || '새로운 메시지입니다.',
        icon: '/icon/medium',
      });
    }
  };

  const unsubscribeFromFCM = async () => {
    try {
      const result = await unsubscribeFCMUser();

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

  const sendFirebaseTestNotification = async () => {
    if (fcmToken) {
      try {
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
        <h1 className="mb-8 text-center text-3xl font-bold">🔥 Firebase FCM 테스트</h1>

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

        {/* FCM 구독 상태 */}
        <div className="mx-auto mb-6 max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">📊 FCM 구독 상태</h2>
          <p className={`text-sm ${fcmSubscribed ? 'text-green-600' : 'text-gray-500'}`}>
            Firebase FCM: {fcmSubscribed ? '✅ 구독 중' : '❌ 미구독'}
          </p>
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

        {/* Firebase FCM 알림 테스트 */}
        <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">🔥 Firebase FCM 알림 테스트</h2>

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
