import { createClient } from '@supabase/supabase-js';

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, string | number>;
}

// FCM 액세스 토큰 생성 함수
async function getFCMAccessToken() {
  try {
    // 새로운 방식 (환경 변수에서 JSON 읽기)
    const serviceAccountJson = Deno.env.get('FIREBASE_SERVICE_ACCOUNT')!;
    const serviceAccount = JSON.parse(serviceAccountJson);

    // JWT 생성을 위한 헤더와 페이로드
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/firebase.messaging',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    };

    // Base64URL 인코딩
    const encodeBase64URL = (data: { [key: string]: string | number }) => {
      return btoa(JSON.stringify(data)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };

    const encodedHeader = encodeBase64URL(header);
    const encodedPayload = encodeBase64URL(payload);
    const unsignedToken = `${encodedHeader}.${encodedPayload}`;

    // 개인키로 JWT 서명
    const privateKey = serviceAccount.private_key;
    const keyData = privateKey
      .replace(/-----BEGIN PRIVATE KEY-----/, '')
      .replace(/-----END PRIVATE KEY-----/, '')
      .replace(/\s/g, '');

    const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));

    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8',
      binaryKey,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      new TextEncoder().encode(unsignedToken)
    );

    const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    const jwt = `${unsignedToken}.${encodedSignature}`;

    // OAuth2 토큰 요청
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(`토큰 생성 실패: ${JSON.stringify(tokenData)}`);
    }

    return tokenData.access_token;
  } catch (error) {
    console.error('FCM 액세스 토큰 생성 실패:', error);
    throw error;
  }
}

// FCM으로 푸시 알림 전송
async function sendFCMNotification(fcmToken: string, payload: PushPayload) {
  try {
    const accessToken = await getFCMAccessToken();
    const FCM_PROJECT_ID = Deno.env.get('FCM_PROJECT_ID')!;

    const message = {
      message: {
        token: fcmToken,
        notification: {
          title: payload.title,
          body: payload.body,
          image: payload.icon,
        },
        data: payload.data
          ? Object.fromEntries(
              Object.entries(payload.data).map(([key, value]) => [key, String(value)])
            )
          : {},
        webpush: {
          notification: {
            icon: payload.icon || '/icon/medium',
            badge: payload.badge || '/icon/small',
            vibrate: [100, 50, 100],
            requireInteraction: false,
          },
        },
      },
    };

    console.log('FCM 메시지 전송:', JSON.stringify(message, null, 2));

    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${FCM_PROJECT_ID}/messages:send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('FCM 전송 실패:', result);
      return { success: false, error: result };
    }

    console.log('FCM 전송 성공:', result);
    return { success: true, result };
  } catch (error) {
    console.error('FCM 전송 중 오류:', error);
    return { success: false, error: error instanceof Error ? error.message : '알 수 없는 오류' };
  }
}

Deno.serve(async (req) => {
  // CORS 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('FCM Edge Function 트리거됨');
    console.log('요청 메서드:', req.method);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SERVICE_ROLE_KEY') ?? ''
    );

    const requestBody = await req.text();
    console.log('요청 본문:', requestBody);

    let payload;
    try {
      payload = JSON.parse(requestBody);
    } catch (e) {
      console.error('JSON 파싱 실패:', e);
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('파싱된 페이로드:', payload);

    // Database Webhook에서 오는 데이터 처리
    if (payload.type === 'INSERT' && payload.table === 'alerts') {
      const alertData = payload.record;
      console.log('새로운 알림 데이터:', alertData);

      // 🔥 통합 수정: user_notifications 테이블에서 모든 알림 설정 가져오기
      const { data: notifications, error: notificationError } = await supabaseClient
        .from('user_notifications')
        .select('*')
        .eq('user_id', alertData.user_id)
        .eq('is_active', true);

      if (notificationError) {
        console.error('알림 설정 조회 실패:', notificationError);
        return new Response(JSON.stringify({ error: 'Failed to fetch notification settings' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('찾은 알림 설정:', notifications);

      if (!notifications || notifications.length === 0) {
        console.log('활성 알림 설정이 없습니다.');
        return new Response(JSON.stringify({ message: 'No active notification settings found' }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const pushResults = [];

      // 🔥 통합 수정: notification_type에 따라 처리 방식 결정
      for (const notification of notifications) {
        const pushPayload: PushPayload = {
          title: alertData.title || '새 알림',
          body: alertData.content || '새로운 알림이 도착했습니다.',
          icon: '/icon/medium',
          badge: '/icon/small',
          data: {
            alertId: alertData.id,
            category: alertData.alert_category,
            timestamp: Date.now(),
          },
        };

        console.log(`${notification.notification_type} 알림 처리 시작:`, pushPayload);

        let fcmToken: string | null = null;

        let result: {
          success: boolean;
          error?: string | Record<string, unknown>;
          result?: Record<string, unknown>;
        } | null = null;

        // 🔥 통합 수정: notification_type에 따른 토큰 추출
        // 🔥 더 안전한 수정
        if (notification.notification_type === 'fcm') {
          // FCM: JSONB에서 문자열 추출
          const rawToken = notification.token_data;
          if (typeof rawToken === 'string') {
            fcmToken = rawToken.replace(/^"|"$/g, ''); // 따옴표 제거
          } else {
            fcmToken = rawToken; // 이미 문자열인 경우
          }
        }

        if (!fcmToken) {
          console.error(
            `${notification.notification_type} 토큰을 찾을 수 없습니다:`,
            notification.token_data
          );
          pushResults.push({
            type: notification.notification_type,
            notification_id: notification.id,
            result: { success: false, error: 'Token not found' },
          });
          continue;
        }

        // FCM으로 알림 전송
        result = await sendFCMNotification(fcmToken, pushPayload);

        pushResults.push({
          type: notification.notification_type,
          notification_id: notification.id,
          result: result,
        });

        console.log(`${notification.notification_type} 전송 결과:`, result);

        // 🔥 통합 수정: 실패한 알림 설정 비활성화, 문자열 변환 후 체크
        if (
          !result.success &&
          (String(result.error).includes('UNREGISTERED') ||
            String(result.error).includes('INVALID_ARGUMENT'))
        ) {
          console.log('유효하지 않은 알림 설정 비활성화:', notification.id);
          await supabaseClient
            .from('user_notifications')
            .update({ is_active: false })
            .eq('id', notification.id);
        }
      }

      // 🔥 통합 수정: 타입별 개수 계산
      const fcmCount = notifications.filter((n) => n.notification_type === 'fcm').length;
      const webpushCount = notifications.filter((n) => n.notification_type === 'webpush').length;

      return new Response(
        JSON.stringify({
          message: 'Push notifications processed with unified system',
          results: pushResults,
          alertData: alertData,
          totalNotifications: notifications.length,
          fcmCount: fcmCount,
          webpushCount: webpushCount,
          service: 'Unified Firebase Cloud Messaging',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 직접 호출된 경우 (테스트용)
    return new Response(
      JSON.stringify({
        message: 'Unified FCM Edge Function executed',
        payload,
        service: 'Unified Firebase Cloud Messaging',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Edge Function 실행 중 오류:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : '알 수 없는 오류',
        stack: error instanceof Error ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
