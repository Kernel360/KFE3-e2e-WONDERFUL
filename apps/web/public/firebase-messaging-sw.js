console.log('🚀 서비스 워커 시작');

// Firebase SDK를 순차적으로 로드
console.log('📦 Firebase SDK 로드 시작...');

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
console.log('✅ Firebase App 로드 완료');

importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');
console.log('✅ Firebase Messaging 로드 완료');

// Firebase 전역 객체 확인
if (typeof firebase !== 'undefined') {
  console.log('✅ Firebase 전역 객체 확인됨:', firebase);
  console.log('🔥 Firebase 메서드들:', Object.keys(firebase));
} else {
  console.error('❌ Firebase 전역 객체가 없습니다!');
}

// 전역 변수로 Firebase 설정 저장
let firebaseConfig = null;
let messaging = null;

// 이벤트 핸들러들을 최상단에서 등록 (Firebase 경고 해결)
self.addEventListener('push', function (event) {
  console.log('📱 Push 이벤트 수신:', event);
  console.log('🔍 서비스 워커 push 데이터:', event.data ? event.data.json() : 'no data');

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const isAppInForeground = clients.some((client) => client.visibilityState === 'visible');

      if (!isAppInForeground && event.data) {
        // 백그라운드일 때만 알림 생성
        // 포그라운드에서는 PWA 컴포넌트에서만, 백그라운드에서는 서비스 워커에서만 알림이 생성
        const data = event.data.json();
        return self.registration.showNotification(data.notification?.title || '알림', {
          body: data.notification?.body || '새로운 메시지입니다.',
          icon: '/icon/medium',
        });
      }
    })
  );
});

// 알림 클릭 처리 (최상단에서 등록)
self.addEventListener('notificationclick', function (event) {
  console.log('🔔 알림 클릭:', event.notification.data);

  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow('/'));
  }
});

// Push subscription 변경 처리 (최상단에서 등록)
self.addEventListener('pushsubscriptionchange', function (event) {
  console.log('🔄 Push subscription 변경:', event);
});

// 메인 앱으로부터 설정 받기
self.addEventListener('message', (event) => {
  console.log('📨 메시지 수신:', event.data);

  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    console.log('🔧 Firebase 설정 수신:', event.data.config);

    firebaseConfig = event.data.config;

    // Firebase 초기화 (직접 실행)
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

// 기존 push 이벤트 리스너 제거 (위로 이동했음)

// 기존 에러 처리
self.addEventListener('error', function (event) {
  console.error('Service Worker 오류:', event.error);
});

self.addEventListener('unhandledrejection', function (event) {
  console.error('처리되지 않은 Promise 거부:', event.reason);
  event.preventDefault();
});
