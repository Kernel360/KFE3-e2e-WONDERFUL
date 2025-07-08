'use server';

import { createClient } from '@/lib/supabase/server';

export interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// 임시 테스트용 사용자 ID (실제로는 로그인된 사용자 ID 사용)
const TEMP_USER_ID = '00000000-0000-0000-0000-000000000001';

// 🔥 통합 수정: WebPush 구독 등록 (user_notifications 테이블 사용)
export const subscribeUser = async (subscription: PushSubscriptionData, deviceInfo?: string) => {
  try {
    const supabase = await createClient();

    console.log('임시 테스트 모드: 고정 사용자 ID 사용');

    // 🔥 통합 수정: user_notifications 테이블에 WebPush 구독 정보 저장
    const { error: upsertError } = await supabase.from('user_notifications').upsert(
      {
        user_id: TEMP_USER_ID,
        notification_type: 'webpush', // 🔥 새로 추가: WebPush 타입 지정
        token_data: subscription, // 🔥 수정: WebPush 구독 객체 전체 저장
        device_info: deviceInfo || 'Test Device - WebPush',
        platform: 'web',
        is_active: true,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,notification_type', // 🔥 수정: 복합 유니크 키
      }
    );

    if (upsertError) {
      console.error('WebPush 구독 정보 저장 실패:', upsertError);
      return { success: false, error: '구독 정보 저장에 실패했습니다.' };
    }

    console.log('✅ WebPush 구독 정보가 user_notifications 테이블에 저장되었습니다.');
    return { success: true, message: 'WebPush 알림 구독이 완료되었습니다.' };
  } catch (error) {
    console.error('subscribeUser 오류:', error);
    return { success: false, error: '구독 처리 중 오류가 발생했습니다.' };
  }
};

// 🔥 통합 수정: FCM 구독 등록 함수 (새로 추가)
export const subscribeFCMUser = async (fcmToken: string, deviceInfo?: string) => {
  try {
    const supabase = await createClient();

    // 🔥 디버깅: 어떤 키를 사용하는지 확인
    console.log('Supabase URL:', process.env.SUPABASE_URL?.substring(0, 30) + '...');
    console.log('Service Role Key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log('Anon Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    console.log('FCM 토큰 저장 시작:', fcmToken.substring(0, 50) + '...');

    // 🔥 수정: insertData 변수 정의
    const insertData = {
      user_id: TEMP_USER_ID,
      notification_type: 'fcm', // FCM 타입 지정
      token_data: fcmToken, // FCM 토큰 문자열 저장
      device_info: deviceInfo || 'Test Device - FCM',
      platform: 'web',
      is_active: true,
      updated_at: new Date().toISOString(),
    };

    console.log('저장할 데이터:', insertData); // 🔥 이제 정상 작동

    // 🔥 새로 추가: user_notifications 테이블에 FCM 토큰 저장
    const { error: upsertError } = await supabase.from('user_notifications').upsert([insertData], {
      onConflict: 'user_id,notification_type', // 복합 유니크 키
    });

    if (upsertError) {
      console.error('FCM 토큰 저장 세부 에러:', upsertError); // 🔥 수정
      return { success: false, error: `FCM 토큰 저장에 실패했습니다: ${upsertError.message}` };
    }

    console.log('✅ FCM 토큰이 user_notifications 테이블에 저장되었습니다.');
    return { success: true, message: 'FCM 알림 구독이 완료되었습니다.' };
  } catch (error) {
    console.error('subscribeFCMUser 오류:', error);
    return { success: false, error: 'FCM 구독 처리 중 오류가 발생했습니다.' };
  }
};

// 🔥 통합 수정: 사용자 구독 해제 (특정 타입 또는 전체)
export const unsubscribeUser = async (notificationType?: 'webpush' | 'fcm') => {
  try {
    const supabase = await createClient();

    console.log('임시 테스트 모드: 고정 사용자 ID 사용');

    let query = supabase
      .from('user_notifications')
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', TEMP_USER_ID);

    // 🔥 통합 수정: 특정 타입만 해제하거나 전체 해제
    if (notificationType) {
      query = query.eq('notification_type', notificationType);
      console.log(`${notificationType} 알림만 해제합니다.`);
    } else {
      console.log('모든 알림을 해제합니다.');
    }

    const { error: updateError } = await query;

    if (updateError) {
      console.error('구독 해제 실패:', updateError);
      return { success: false, error: '구독 해제에 실패했습니다.' };
    }

    const message = notificationType
      ? `${notificationType} 알림 구독이 해제되었습니다.`
      : '모든 알림 구독이 해제되었습니다.';

    return { success: true, message };
  } catch (error) {
    console.error('unsubscribeUser 오류:', error);
    return { success: false, error: '구독 해제 중 오류가 발생했습니다.' };
  }
};

// 🔥 통합 수정: 현재 사용자의 구독 상태 확인
export const getUserSubscriptionStatus = async () => {
  try {
    const supabase = await createClient();

    console.log('임시 테스트 모드: 고정 사용자 ID 사용');

    // 🔥 통합 수정: 모든 활성 알림 설정 확인
    const { data: notifications, error } = await supabase
      .from('user_notifications')
      .select('notification_type, is_active, created_at')
      .eq('user_id', TEMP_USER_ID)
      .eq('is_active', true);

    if (error && error.code !== 'PGRST116') {
      // PGRST116: no rows returned
      console.error('구독 상태 확인 실패:', error);
      return {
        webpushSubscribed: false,
        fcmSubscribed: false,
        error: '구독 상태 확인에 실패했습니다.',
      };
    }

    // 🔥 통합 수정: 타입별로 구독 상태 분리
    const webpushNotification = notifications?.find((n) => n.notification_type === 'webpush');
    const fcmNotification = notifications?.find((n) => n.notification_type === 'fcm');

    return {
      webpushSubscribed: !!webpushNotification?.is_active,
      fcmSubscribed: !!fcmNotification?.is_active,
      webpushSubscribedAt: webpushNotification?.created_at,
      fcmSubscribedAt: fcmNotification?.created_at,
      totalActiveNotifications: notifications?.length || 0,
    };
  } catch (error) {
    console.error('getUserSubscriptionStatus 오류:', error);
    return {
      webpushSubscribed: false,
      fcmSubscribed: false,
      error: '구독 상태 확인 중 오류가 발생했습니다.',
    };
  }
};

// 🔥 기존 함수: WebPush 테스트 알림 전송 (그대로 유지)
export const sendNotification = async (message: string) => {
  try {
    const supabase = await createClient();

    console.log('WebPush 테스트 알림 전송:', message);

    // alerts 테이블에 테스트 알림 추가 (webhook이 자동으로 푸시 알림 전송)
    const { error: insertError } = await supabase.from('alerts').insert({
      user_id: TEMP_USER_ID,
      title: '🔔 WebPush 테스트 알림',
      content: message || '기본 테스트 메시지입니다.',
      alert_category: 'webpush_test',
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error('테스트 알림 생성 실패:', insertError);
      return { success: false, error: '테스트 알림 전송에 실패했습니다.' };
    }

    return { success: true, message: 'WebPush 테스트 알림이 전송되었습니다.' };
  } catch (error) {
    console.error('sendNotification 오류:', error);
    return {
      success: false,
      error: '테스트 알림 전송 중 오류가 발생했습니다.',
    };
  }
};

// 🔥 기존 함수명도 유지 (하위 호환성)
export const sendTestNotification = sendNotification;
