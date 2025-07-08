// lib/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage } from 'firebase/messaging';

// Firebase 프로젝트 설정 (하드코딩)
const firebaseConfig = {
  apiKey: 'AIzaSyCiv_0yM3e-TXnBOq7IgD5fq14zH3Plj1c',
  authDomain: 'living-auction-38e27.firebaseapp.com',
  projectId: 'living-auction-38e27',
  storageBucket: 'living-auction-38e27.appspot.com',
  messagingSenderId: '878761252572',
  appId: '1:878761252572:web:583ea665a0549fdaecc619',
};

// VAPID 키 환경변수에서 가져오기
const getVapidKey = () => {
  // Next.js 환경변수 접근
  if (typeof window !== 'undefined') {
    // 브라우저 환경: webpack.DefinePlugin에서 주입된 값 사용
    return process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  } else {
    // 서버 환경: 직접 process.env 접근
    return process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
  }
};

const vapidKey = getVapidKey();

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Messaging 인스턴스 생성 (브라우저에서만)
let messaging: Messaging | null = null;
if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
}

export { messaging };

// 서비스 워커 등록 및 설정 전달
const registerServiceWorkerAndSendConfig = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('✅ 서비스 워커 등록 성공:', registration);

      // 서비스 워커가 활성화될 때까지 대기
      await navigator.serviceWorker.ready;

      // Firebase 설정을 서비스 워커에 전달
      if (registration.active) {
        registration.active.postMessage({
          type: 'FIREBASE_CONFIG',
          config: firebaseConfig,
        });
        console.log('✅ Firebase 설정을 서비스 워커에 전달 완료');
      }

      return registration;
    } catch (error) {
      console.error('❌ 서비스 워커 등록 실패:', error);
      throw error;
    }
  } else {
    throw new Error('Service Worker가 지원되지 않는 브라우저입니다.');
  }
};

// FCM 토큰 가져오기 함수
export const getFCMToken = async () => {
  if (!messaging) {
    console.error('❌ Messaging 인스턴스가 없습니다.');
    return null;
  }

  if (!vapidKey) {
    console.error('❌ VAPID 키가 설정되지 않았습니다.');
    return null;
  }

  try {
    // 서비스 워커 등록 및 설정 전달
    const registration = await registerServiceWorkerAndSendConfig();

    // FCM 토큰 가져오기
    const currentToken = await getToken(messaging, {
      vapidKey: vapidKey,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      console.log('✅ FCM 토큰 획득:', currentToken);
      return currentToken;
    } else {
      console.log('❌ FCM 토큰을 가져올 수 없습니다. 알림 권한을 확인하세요.');
      return null;
    }
  } catch (err) {
    console.error('❌ FCM 토큰 가져오기 실패:', err);
    return null;
  }
};

// 포그라운드 메시지 수신 처리
export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return;

    onMessage(messaging, (payload) => {
      console.log('포그라운드 메시지 수신:', payload);
      resolve(payload);
    });
  });

// FCM 초기화 함수 (컴포넌트에서 호출)
export const initializeFCM = async () => {
  try {
    // 알림 권한 요청
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log('✅ 알림 권한 허용됨');

      // FCM 토큰 가져오기
      const token = await getFCMToken();

      if (token) {
        // 여기서 토큰을 서버에 저장하는 로직 추가
        console.log('🔥 FCM 초기화 완료, 토큰:', token);
        return token;
      }
    } else {
      console.log('❌ 알림 권한 거부됨');
    }
  } catch (error) {
    console.error('❌ FCM 초기화 실패:', error);
  }

  return null;
};
