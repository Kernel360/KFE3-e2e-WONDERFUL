import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { title, content, fcmToken } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: '제목과 내용이 필요합니다.' }, { status: 400 });
    }

    const supabase = await createClient();
    const testUserId = '00000000-0000-0000-0000-000000000001'; // 테스트용 고정 ID

    // alerts 테이블에 데이터 삽입 (Database Webhook 트리거)
    const { data, error } = await supabase
      .from('alerts')
      .insert([
        {
          user_id: testUserId,
          title: title,
          content: content,
          alert_category: 'firebase_test',
          is_read: false,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase 삽입 에러:', error);
      return NextResponse.json({ error: 'Database 삽입 실패' }, { status: 500 });
    }

    // 🔥 통합 수정: FCM 토큰이 있다면 user_notifications 테이블에 저장/업데이트
    if (fcmToken) {
      const { error: tokenError } = await supabase.from('user_notifications').upsert(
        [
          {
            user_id: testUserId,
            notification_type: 'fcm', // 🔥 새로 추가: 알림 타입 지정
            token_data: fcmToken, // 🔥 수정: FCM 토큰을 직접 저장 (문자열)
            device_info: 'Test Device - Web',
            platform: 'web',
            is_active: true,
          },
        ],
        {
          onConflict: 'user_id,notification_type', // 🔥 수정: 복합 유니크 키로 중복 방지
        }
      );

      if (tokenError) {
        console.error('FCM 토큰 저장 에러:', tokenError);
        // 🔥 수정: 토큰 저장 실패해도 알림은 계속 진행
        console.log('토큰 저장에 실패했지만 알림은 계속 진행합니다.');
      } else {
        console.log('✅ FCM 토큰이 user_notifications 테이블에 저장되었습니다.');
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Firebase 테스트 알림이 Database Webhook을 통해 전송됩니다.',
      data: data,
      tokenSaved: !!fcmToken, // 🔥 추가: 토큰 저장 여부 표시
    });
  } catch (error) {
    console.error('API 에러:', error);
    return NextResponse.json({ error: '내부 서버 오류' }, { status: 500 });
  }
}
