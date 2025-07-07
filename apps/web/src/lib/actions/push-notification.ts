// apps/web/src/lib/actions/push-notification.ts
'use server';

import { createServerComponentClient } from '@/lib/supabase/server';

export interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

// 임시 테스트용 사용자 ID (실제로는 로그인된 사용자 ID 사용)
const TEMP_USER_ID = '00000000-0000-0000-0000-000000000001';

// 사용자 푸시 구독 등록
export const subscribeUser = async (subscription: PushSubscriptionData, deviceInfo?: string) => {
  try {
    const supabase = await createServerComponentClient();

    // 임시로 로그인 체크 제거하고 고정 사용자 ID 사용
    console.log('임시 테스트 모드: 고정 사용자 ID 사용');

    // 기존 구독 정보가 있다면 업데이트, 없다면 새로 생성
    const { error: upsertError } = await supabase.from('user_push_subscriptions').upsert(
      {
        user_id: TEMP_USER_ID,
        subscription_data: subscription,
        device_info: deviceInfo || 'Test Device',
        is_active: true,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id',
      }
    );

    if (upsertError) {
      console.error('구독 정보 저장 실패:', upsertError);
      return { success: false, error: '구독 정보 저장에 실패했습니다.' };
    }

    return { success: true, message: '푸시 알림 구독이 완료되었습니다.' };
  } catch (error) {
    console.error('subscribeUser 오류:', error);
    return { success: false, error: '구독 처리 중 오류가 발생했습니다.' };
  }
};

// 사용자 푸시 구독 해제
export const unsubscribeUser = async () => {
  try {
    const supabase = await createServerComponentClient();

    // 임시로 로그인 체크 제거하고 고정 사용자 ID 사용
    console.log('임시 테스트 모드: 고정 사용자 ID 사용');

    // 구독 정보를 비활성화 (삭제하지 않고 보관)
    const { error: updateError } = await supabase
      .from('user_push_subscriptions')
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', TEMP_USER_ID);

    if (updateError) {
      console.error('구독 해제 실패:', updateError);
      return { success: false, error: '구독 해제에 실패했습니다.' };
    }

    return { success: true, message: '푸시 알림 구독이 해제되었습니다.' };
  } catch (error) {
    console.error('unsubscribeUser 오류:', error);
    return { success: false, error: '구독 해제 중 오류가 발생했습니다.' };
  }
};

// 현재 사용자의 구독 상태 확인
export const getUserSubscriptionStatus = async () => {
  try {
    const supabase = await createServerComponentClient();

    // 임시로 로그인 체크 제거하고 고정 사용자 ID 사용
    console.log('임시 테스트 모드: 고정 사용자 ID 사용');

    // 사용자의 활성 구독 정보 확인
    const { data: subscription, error } = await supabase
      .from('user_push_subscriptions')
      .select('is_active, created_at')
      .eq('user_id', TEMP_USER_ID)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116: no rows returned
      console.error('구독 상태 확인 실패:', error);
      return { isSubscribed: false, error: '구독 상태 확인에 실패했습니다.' };
    }

    return {
      isSubscribed: !!subscription?.is_active,
      subscribedAt: subscription?.created_at,
    };
  } catch (error) {
    console.error('getUserSubscriptionStatus 오류:', error);
    return {
      isSubscribed: false,
      error: '구독 상태 확인 중 오류가 발생했습니다.',
    };
  }
};

// 테스트 알림 전송 (개발용)
export const sendTestNotification = async (message: string) => {
  try {
    const supabase = await createServerComponentClient();

    // 임시로 로그인 체크 제거하고 고정 사용자 ID 사용
    console.log('임시 테스트 모드: 고정 사용자 ID 사용');

    // alerts 테이블에 테스트 알림 추가 (webhook이 자동으로 푸시 알림 전송)
    const { error: insertError } = await supabase.from('alerts').insert({
      user_id: TEMP_USER_ID,
      title: '테스트 알림',
      content: message,
      alert_category: 'test',
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error('테스트 알림 생성 실패:', insertError);
      return { success: false, error: '테스트 알림 전송에 실패했습니다.' };
    }

    return { success: true, message: '테스트 알림이 전송되었습니다.' };
  } catch (error) {
    console.error('sendTestNotification 오류:', error);
    return {
      success: false,
      error: '테스트 알림 전송 중 오류가 발생했습니다.',
    };
  }
};
