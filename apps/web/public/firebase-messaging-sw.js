console.log('🚀 Firebase FCM 서비스 워커 시작');

// Firebase SDK를 순차적으로 로드
console.log('📦 Firebase SDK 로드 시작...');

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
console.log('✅ Firebase App 로드 완료');

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');
console.log('✅ Firebase Messaging 로드 완료');

// Firebase 전역 객체 확인
if (typeof firebase !== 'undefined') {
  console.log('✅ Firebase 전역 객체 확인됨:', firebase);
} else {
  console.error('❌ Firebase 전역 객체가 없습니다!');
}

// 전역 변수로 Firebase 설정 저장
let firebaseConfig = null;
let messaging = null;

// 알림 클릭 처리
self.addEventListener('notificationclick', function (event) {
  console.log('🔔 알림 클릭:', event.notification.data);
  event.notification.close();

  let targetUrl = '/';
  if (event.notification && event.notification.data && event.notification.data.url) {
    targetUrl = event.notification.data.url;
  }

  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow(targetUrl));
  }
});

// 메인 앱으로부터 Firebase 설정 받기
self.addEventListener('message', (event) => {
  console.log('📨 메시지 수신:', event.data);

  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    console.log('🔧 Firebase 설정 수신:', event.data.config);

    firebaseConfig = event.data.config;

    // Firebase 초기화
    if (typeof firebase !== 'undefined') {
      try {
        console.log('🔥 Firebase 초기화 시작...');
        firebase.initializeApp(firebaseConfig);
        messaging = firebase.messaging();

        // 백그라운드 메시지 처리
        messaging.onBackgroundMessage((payload) => {
          console.log('📱 Firebase 백그라운드 메시지:', payload);

          const notificationTitle = payload.notification?.title || payload.data?.title || '알림';
          const notificationOptions = {
            body: payload.notification?.body || payload.data?.body || '새로운 알림이 도착했습니다.',
            icon: payload.notification?.icon || '/icon/medium',
            badge: '/icon/small',
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: '1',
              fcmData: payload.data,
            },
          };

          self.registration.showNotification(notificationTitle, notificationOptions);
        });

        console.log('✅ Firebase 초기화 완료!');
      } catch (error) {
        console.error('❌ Firebase 초기화 실패:', error);
      }
    } else {
      console.error('❌ Firebase 객체가 없어서 초기화 불가!');
    }
  }
});

// 에러 처리
self.addEventListener('error', function (event) {
  console.error('Service Worker 오류:', event.error);
});

self.addEventListener('unhandledrejection', function (event) {
  console.error('처리되지 않은 Promise 거부:', event.reason);
  event.preventDefault();
});
