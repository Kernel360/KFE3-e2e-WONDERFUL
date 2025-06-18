self.addEventListener('push', function (event) {
  if (event.data) {
    try {
      const data = event.data.json();
      const options = {
        body: data.body,
        // icon2.tsx는 Next.js가 인식하는 파일명 (크기에 따라 적절한 아이콘 선택)
        icon: data.icon || '/icon/medium',
        badge: '/icon/small',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2',
        },
      };
      event.waitUntil(self.registration.showNotification(data.title, options));
    } catch (error) {
      console.error('알림 데이터 처리 중 오류 발생:', error);

      // JSON 파싱에 실패한 경우 텍스트 데이터 그대로 사용
      const textData = event.data ? event.data.text() : '새로운 알림';

      event.waitUntil(
        self.registration.showNotification('알림', {
          body: `${textData}`, // 파싱 실패한 원본 텍스트를 본문으로 사용
          icon: '/icon/medium',
          badge: '/icon/small',
          vibrate: [100, 50, 100],
        })
      );
    }
  } else {
    console.log('푸시 이벤트에 데이터가 없습니다.');
    event.waitUntil(
      self.registration.showNotification('알림', {
        body: '새로운 알림이 도착했습니다.',
        icon: '/icon/medium',
        badge: '/icon/small',
        vibrate: [100, 50, 100],
      })
    );
  }
});

// 추가
self.addEventListener('error', function (event) {
  console.error('Service Worker 오류:', event.error);
});

self.addEventListener('unhandledrejection', function (event) {
  console.error('처리되지 않은 Promise 거부:', event.reason);
  event.preventDefault();
});
