'use server';

import { createClient } from '@/lib/supabase/server';
import { convertHoursToTimestamp } from '@/lib/utils/date';

import { AuctionFormData } from '@/types/auction';

// Create
export const createAuction = async (data: AuctionFormData, userId: string) => {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // 1. auction_items 삽입
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
        auction_type: data.auction_type || 'NORMAL',
        thumbnail_url: data.images?.[0] || '', // 첫 번째 이미지를 썸네일로 사용
        status: 'ACTIVE',
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (itemError) {
      console.error('❌ auction_items 에러:', itemError);
      throw new Error(`auction_items 저장 실패: ${itemError?.message}`);
    }

    const itemId = itemInsertResult.id;

    // 2. auction_prices 삽입
    const { error: priceError } = await supabase.from('auction_prices').insert({
      item_id: itemId,
      start_price: data.prices.start_price,
      instant_price: data.prices.instant_price,
      min_bid_unit: data.prices.min_bid_unit,
      current_price: data.prices.start_price,
    });

    if (priceError) {
      console.error('❌ auction_prices 에러:', priceError);
      throw new Error(`auction_prices 저장 실패: ${priceError.message}`);
    }

    // 3. auction_images 삽입 (이미지가 있는 경우)
    if (data.images && data.images.length > 0) {
      const { error: imageError } = await supabase.from('auction_images').insert({
        item_id: itemId,
        urls: data.images,
      });

      if (imageError) {
        console.error('❌ auction_images 에러:', imageError);
        throw new Error(`auction_images 저장 실패: ${imageError.message}`);
      }
    }

    return itemId;
  } catch (error) {
    console.error('❌ createAuction 전체 에러:', error);
    throw error;
  }
};

// Update
export const updateAuction = async (data: AuctionFormData, itemId: string) => {
  const supabase = await createClient();
  const endtime = convertHoursToTimestamp(data.end_time);

  const { error: itemError } = await supabase
    .from('auction_items')
    .update({
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      location_id: data.location_id ?? null,
      end_time: endtime,
      thumbnail_url: data.images?.[0] || '', // 첫 번째 이미지를 썸네일로 사용
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

// 썸네일만 업데이트하는 함수
export const updateThumbnailOnly = async (thumbnailUrl: string, itemId: string) => {
  try {
    console.log('🔄 썸네일 업데이트 시도...', thumbnailUrl);

    const supabase = await createClient();

    const { error } = await supabase
      .from('auction_items')
      .update({
        thumbnail_url: thumbnailUrl,
      })
      .eq('id', itemId);

    if (error) {
      console.error('❌ 썸네일 업데이트 에러:', error);
      throw new Error(`썸네일 업데이트 실패: ${error.message}`);
    }

    console.log('✅ 썸네일 업데이트 성공');
    return true;
  } catch (error) {
    console.error('❌ updateThumbnailOnly 전체 에러:', error);
    throw error;
  }
};

export const addAuctionImages = async (itemId: string, imageUrls: string[]) => {
  const supabase = await createClient();

  const { error } = await supabase.from('auction_images').insert({
    item_id: itemId,
    urls: imageUrls,
  });

  if (error) throw new Error(`이미지 저장 실패: ${error.message}`);
};
