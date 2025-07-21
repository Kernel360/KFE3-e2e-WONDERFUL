import { useEffect, useRef, useState } from 'react';

import { createClient } from '@/lib/supabase/client';
import { BidType } from '@/lib/types/bid';

interface UseRealtimeBidsProps {
  auctionId: string;
  initialBids?: BidType[];
}
// 실시간 입찰 데이터 훅
export const useRealtimeBids = ({ auctionId, initialBids = [] }: UseRealtimeBidsProps) => {
  const [bids, setBids] = useState<BidType[]>(initialBids);
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef<any>(null); // 채널 참조 저장
  const isSetupRef = useRef(false); // 중복 방지용

  useEffect(() => {
    if (initialBids && initialBids.length > 0) {
      setBids(initialBids);
      console.log('📊 초기 입찰 데이터 설정:', initialBids.length, '개');
    }
  }, [initialBids]);

  useEffect(() => {
    if (isSetupRef.current) return;

    const supabase = createClient();

    // 이전 채널이 있으면 정리
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const setupRealtime = async () => {
      isSetupRef.current = true; // 설정 시작 표시
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        console.log('❌ 세션 토큰 없음');
        return;
      }

      supabase.realtime.setAuth(session.access_token);
      console.log('🔑 Realtime Auth 토큰 설정 완료');

      // 고유한 채널 이름 생성
      const channelName = `test-${Math.random().toString(36).substr(2, 9)}`;
      try {
        const channel = supabase
          .channel(channelName)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'bids',
              //filter: `item_id=eq.9f9ca798-39de-40fb-b74a-051a82c0508f`, // 하드코딩으로 테스트
            },
            (payload) => {
              console.log('🎯🎯🎯 [Realtime] 드디어 수신!!!:', payload);

              // 수정: payload.new에서 데이터 추출
              console.log('📊 [Realtime] payload.new:', payload.new);

              const newBid = payload.new;

              console.log('🎯 [Realtime] 입찰 수신:', {
                bidId: newBid.id,
                price: newBid.price,
                itemId: newBid.item_id,
                bidderId: newBid.bidder_id,
                timestamp: new Date().toLocaleTimeString(),
              });

              if (!newBid.item_id || newBid.item_id !== auctionId) {
                console.log('❌ 다른 경매의 입찰:', {
                  수신한ID: newBid.item_id,
                  현재ID: auctionId,
                });
                return;
              }
              console.log('✅ [Realtime] 올바른 경매의 입찰, 상태 업데이트 중...');

              const formattedBid: BidType = {
                id: newBid.id,
                item_id: newBid.item_id,
                bidder_id: newBid.bidder_id,
                price: newBid.price?.toString() || '0',
                createdAt: newBid.created_at,
                bidder: {
                  id: newBid.bidder_id,
                  nickname: '실시간 입찰자',
                  profileImg: null,
                },
              };

              console.log('🚀 [Realtime] 포맷된 입찰:', formattedBid);

              setBids((prevBids) => {
                console.log('📊 [Realtime] 입찰 목록 업데이트:', {
                  이전개수: prevBids.length,
                  새입찰가격: formattedBid.price,
                });

                const exists = prevBids.some((bid) => bid.id === formattedBid.id);
                if (exists) {
                  console.log('⚠️ 중복 입찰, 스킵');
                  return prevBids;
                }

                const updated = [formattedBid, ...prevBids];
                console.log('🎉 [Realtime] 업데이트 완료! 새 개수:', updated.length);
                return updated;
              });
            }
          )
          .subscribe((status, err) => {
            console.log('📡 Realtime 상태:', status, err?.message || '');
            setIsConnected(status === 'SUBSCRIBED');

            if (status !== 'SUBSCRIBED') {
              isSetupRef.current = false; // 실패 시 재시도 가능하게
            }
          });

        channelRef.current = channel;
      } catch (error) {
        console.error('채널 생성 에러:', error);
        isSetupRef.current = false;
      }
    };

    setupRealtime();

    return () => {
      if (channelRef.current) {
        try {
          supabase.removeChannel(channelRef.current);
        } catch (e) {
          console.log('정리 중 에러:', e);
        }
        channelRef.current = null;
      }
      isSetupRef.current = false; // 정리 시 재설정 가능하게
      setIsConnected(false);
    };
  }, [auctionId]); // 의존성 최소화

  return { bids, isConnected };
};
