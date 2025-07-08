'use server';

import { createClient } from '@/lib/supabase/server';

// 임시 테스트용 사용자 ID (실제로는 로그인된 사용자 ID 사용)
const TEMP_USER_ID = '00000000-0000-0000-0000-000000000001';

// FCM 구독 등록 함수
export const subscribeFCMUser = async (fcmToken: string, deviceInfo?: string) => {
  try {
    const supabase = await createClient();

    console.log('FCM 토큰 저장 시작:', fcmToken.substring(0, 50) + '...');

    const insertData = {
      user_id: TEMP_USER_ID,
      notification_type: 'fcm',
      token_data: fcmToken,
      device_info: deviceInfo || 'Test Device - FCM',
      platform: 'web',
      is_active: true,
    };

    const { error: upsertError } = await supabase.from('user_notifications').upsert([insertData], {
      onConflict: 'user_id,notification_type',
    });

    if (upsertError) {
      console.error('FCM 토큰 저장 세부 에러:', upsertError);
      return { success: false, error: `FCM 토큰 저장에 실패했습니다: ${upsertError.message}` };
    }

    console.log('✅ FCM 토큰이 user_notifications 테이블에 저장되었습니다.');
    return { success: true, message: 'FCM 알림 구독이 완료되었습니다.' };
  } catch (error) {
    console.error('subscribeFCMUser 오류:', error);
    return { success: false, error: 'FCM 구독 처리 중 오류가 발생했습니다.' };
  }
};

// FCM 구독 해제
export const unsubscribeFCMUser = async () => {
  try {
    const supabase = await createClient();

    const { error: updateError } = await supabase
      .from('user_notifications')
      .update({
        is_active: false,
      })
      .eq('user_id', TEMP_USER_ID)
      .eq('notification_type', 'fcm');

    if (updateError) {
      console.error('FCM 구독 해제 실패:', updateError);
      return { success: false, error: 'FCM 구독 해제에 실패했습니다.' };
    }

    return { success: true, message: 'FCM 알림 구독이 해제되었습니다.' };
  } catch (error) {
    console.error('unsubscribeFCMUser 오류:', error);
    return { success: false, error: 'FCM 구독 해제 중 오류가 발생했습니다.' };
  }
};

// FCM 구독 상태 확인
export const getFCMSubscriptionStatus = async () => {
  try {
    const supabase = await createClient();

    const { data: notification, error } = await supabase
      .from('user_notifications')
      .select('is_active, created_at')
      .eq('user_id', TEMP_USER_ID)
      .eq('notification_type', 'fcm')
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('FCM 구독 상태 확인 실패:', error);
      return {
        fcmSubscribed: false,
        error: 'FCM 구독 상태 확인에 실패했습니다.',
      };
    }

    return {
      fcmSubscribed: !!notification?.is_active,
      fcmSubscribedAt: notification?.created_at,
    };
  } catch (error) {
    console.error('getFCMSubscriptionStatus 오류:', error);
    return {
      fcmSubscribed: false,
      error: 'FCM 구독 상태 확인 중 오류가 발생했습니다.',
    };
  }
};
