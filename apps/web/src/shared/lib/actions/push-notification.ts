'use server';

import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:support@yourcompany.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: webpush.PushSubscription | null = null;

export const subscribeUser = async (sub: webpush.PushSubscription) => {
  subscription = sub;
  // 실제 환경에서는 데이터베이스에 저장
  // 예: await db.subscriptions.create({ data: sub })
  return { success: true };
};

export const unsubscribeUser = async () => {
  subscription = null;
  // 실제 환경에서는 데이터베이스에서 삭제
  // 예: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
};

export const sendNotification = async (message: string) => {
  if (!subscription) {
    throw new Error('구독 정보가 없습니다');
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: '경매 알림', // 알림 제목
        body: message, // 알림 내용
        icon: '/icon/medium', // 알림 아이콘
      })
    );
    return { success: true };
  } catch (error) {
    console.error('푸시 알림 전송 실패:', error);
    return { success: false, error: '알림 전송에 실패했습니다' };
  }
};
