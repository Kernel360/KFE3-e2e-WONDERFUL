// 260652 18:52 금영 수정 ::FormField 맞춰 type 수정
'use server';

import { createClient } from '@/lib/supabase/server';
import { convertHoursToTimestamp } from '@/lib/utils/date';

import { AuctionFormData } from '@/types/auction';

// Create
export const createAuction = async (data: AuctionFormData, userId: string) => {
  try {
    console.log('=== createAuction 시작 ===');

    const supabase = await createClient();
    console.log('✅ Supabase 클라이언트 생성 완료');

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log('✅ 사용자 인증 확인:', user?.id);

    // auction_items 삽입
    console.log('🔄 auction_items 삽입 시도...');
    const { data: itemInsertResult, error: itemError } = await supabase
      .from('auction_items')
      .insert({
        seller_id: userId,
        title: data.title,
        description: data.description,
        category_id: data.category_id,
        location_id: data.location_id ?? null,
        start_time: data.start_time ?? null,
        end_time: convertHoursToTimestamp(data.end_time),
        auction_type: data.auction_type || 'normal',
        thumbnail_url: data.images[0] || '',
        status: 'ACTIVE',
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (itemError) {
      console.error('❌ auction_items 에러:', itemError);
      throw new Error(`auction_items 저장 실패: ${itemError?.message}`);
    }

    console.log('✅ auction_items 삽입 성공:', itemInsertResult.id);

    // 일단 여기서 리턴 (auction_prices, auction_images 제거)
    return itemInsertResult.id;
  } catch (error) {
    console.error('❌ createAuction 전체 에러:', error as Error);
    throw error;
  }
};

// Update
export const updateAuction = async (data: AuctionFormData, itemId: string) => {
  const supabase = await createClient();
  const end_time = convertHoursToTimestamp(data.end_time);

  const { error: itemError } = await supabase
    .from('auction_items')
    .update({
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      location_id: data.location_id ?? null,
      end_time: end_time,
      thumbnail_url: data.images[0] || '',
    })
    .eq('id', itemId);

  if (itemError) {
    throw new Error(`auction_items 수정 실패: ${itemError.message}`);
  }

  const { error: priceError } = await supabase
    .from('auction_prices')
    .update({
      start_price: data.prices.start_price,
      instant_price: data.prices.instant_price,
      min_bid_unit: data.prices.min_bid_unit,
      current_price: data.prices.start_price,
    })
    .eq('item_id', itemId);

  if (priceError) {
    throw new Error(`auction_prices 수정 실패: ${priceError.message}`);
  }

  if (Array.isArray(data.images) && data.images.length > 0 && data.images[0]) {
    // 1. 기존 이미지 백업
    const { data: backupImages, error: backupError } = await supabase
      .from('auction_images')
      .select('urls')
      .eq('item_id', itemId);

    if (backupError) {
      throw new Error(`기존 이미지 백업 실패: ${backupError.message}`);
    }

    // 2. 기존 이미지 삭제
    const { error: imageDeleteError } = await supabase
      .from('auction_images')
      .delete()
      .eq('item_id', itemId);

    if (imageDeleteError) {
      throw new Error(`auction_image 삭제 실패: ${imageDeleteError.message}`);
    }

    // 3. 새 이미지 삽입
    const { error: imageInsertError } = await supabase.from('auction_images').insert({
      item_id: itemId,
      urls: data.images,
    });

    if (imageInsertError) {
      // 4. 삽입 실패 → 백업 이미지로 복원
      if (backupImages?.length > 0) {
        await supabase.from('auction_images').insert({
          item_id: itemId,
          urls: backupImages[0]?.urls,
        });
      }

      throw new Error(`auction_images 삽입 실패 및 복원됨: ${imageInsertError.message}`);
    }
  }

  return itemId;
};

// Delete
export const deleteAuction = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('auction_items').delete().eq('id', id);

  if (error) {
    console.error('경매 삭제 실패:', error.message);
    throw new Error(`경매 삭제 중 오류가 발생했습니다: ${error.message}`);
  }

  return data;
};
