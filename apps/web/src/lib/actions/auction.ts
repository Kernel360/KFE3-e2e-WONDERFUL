'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { convertHoursToTimestamp } from '@/lib/utils/date';

import { AuctionFormData, AuctionPriceUpdate, AuctionStatus } from '@/types/auction';

// Create
export const createAuction = async (data: AuctionFormData, userId: string) => {
  try {
    // 서버에서 최대값 검증 추가
    if (data.prices.start_price > 2147483647) {
      throw new Error('경매 시작가는 21억원을 초과할 수 없습니다.');
    }

    const supabase = await createClient();

    // 1. 유저의 기본 위치 조회
    const { data: primaryLocation, error: locationError } = await supabase
      .from('locations')
      .select('id')
      .eq('user_id', userId)
      .eq('is_primary', true)
      .single();

    if (locationError && locationError.code !== 'PGRST116') {
      // PGRST116: No rows found (데이터 없음)
      console.error('❌ 기본 위치 조회 에러:', locationError);
      throw new Error(`기본 위치 조회 실패: ${locationError.message}`);
    }

    // auction_items 삽입
    const { data: itemInsertResult, error: itemError } = await supabase
      .from('auction_items')
      .insert({
        seller_id: userId,
        title: data.title,
        description: data.description,
        category_id: data.category_id,
        location_id: primaryLocation?.id ?? null, // 기본 위치 ID 사용
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

    // auction_prices 삽입
    const { error: priceError } = await supabase.from('auction_prices').insert({
      item_id: itemId,
      start_price: data.prices.start_price,
      instant_price: data.prices.instant_price || null, // 즉시거래가 추가
      min_bid_unit: data.prices.min_bid_unit,
      current_price: data.prices.start_price,
      is_instant_buy_enabled: data.is_instant_buy_enabled, // 즉시거래 활성화 여부
      is_extended_auction: data.is_extended_auction || false, // 연장경매 여부
    });

    if (priceError) {
      console.error('❌ auction_prices 에러:', priceError);
      throw new Error(`auction_prices 저장 실패: ${priceError.message}`);
    }

    // auction_images 삽입 (이미지가 있는 경우)
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

    // 5. ✅ 캐시 무효화 - 경매 목록 관련 모든 페이지
    revalidatePath('/', 'layout'); // 메인 레이아웃 및 하위 모든 페이지
    revalidatePath('/'); // 메인 페이지
    revalidatePath('/auction'); // 경매 목록 페이지들

    console.log('✅ 캐시 무효화 완료');

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

  try {
    // 1. 현재 경매 정보 조회 (location_id 포함)
    const { data: currentAuctionItem, error: fetchItemError } = await supabase
      .from('auction_items')
      .select('location_id')
      .eq('id', itemId)
      .single();

    if (fetchItemError) {
      throw new Error(`현재 경매 정보 조회 실패: ${fetchItemError.message}`);
    }

    // 2. 현재 경매 상태 확인
    const { data: currentAuction, error: fetchError } = await supabase
      .from('auction_prices')
      .select('start_price, current_price')
      .eq('item_id', itemId)
      .single();

    if (fetchError) {
      throw new Error(`현재 경매 정보 조회 실패: ${fetchError.message}`);
    }

    // 3. 입찰 여부 확인
    const hasBids = currentAuction.current_price > currentAuction.start_price;

    console.log('📊 경매 상태 확인:', {
      originalStartPrice: currentAuction.start_price,
      currentPrice: currentAuction.current_price,
      hasBids,
      newStartPrice: data.prices.start_price,
    });

    // 4. 이미지 처리 먼저 완료
    if (Array.isArray(data.images) && data.images.length > 0 && data.images[0]) {
      console.log('🔄 이미지 처리 시작...');

      const { error: imageDeleteError } = await supabase
        .from('auction_images')
        .delete()
        .eq('item_id', itemId);

      if (imageDeleteError) {
        throw new Error(`auction_image 삭제 실패: ${imageDeleteError.message}`);
      }

      const { error: imageInsertError } = await supabase.from('auction_images').insert({
        item_id: itemId,
        urls: data.images,
      });

      if (imageInsertError) {
        throw new Error(`auction_images 삽입 실패: ${imageInsertError.message}`);
      }

      console.log('✅ 이미지 처리 완료');
    }

    // 5. auction_items 업데이트
    const { error: itemError } = await supabase
      .from('auction_items')
      .update({
        title: data.title,
        description: data.description,
        category_id: data.category_id,
        location_id: currentAuctionItem.location_id, // 기존 location_id 유지
        end_time: endtime,
        thumbnail_url: data.images?.[0] || '',
      })
      .eq('id', itemId);

    if (itemError) {
      throw new Error(`auction_items 수정 실패: ${itemError.message}`);
    }

    // 6. auction_prices 안전한 업데이트
    const priceUpdateData: AuctionPriceUpdate = {
      instant_price: data.prices.instant_price,
      min_bid_unit: data.prices.min_bid_unit,
      is_instant_buy_enabled: data.is_instant_buy_enabled,
      is_extended_auction: data.is_extended_auction || false,
    };

    // 입찰이 없는 경우에만 start_price와 current_price 업데이트
    if (!hasBids) {
      priceUpdateData.start_price = data.prices.start_price;
      priceUpdateData.current_price = data.prices.start_price;
      console.log('✅ 입찰 없음 - 시작가/현재가 업데이트');
    } else {
      console.log('⚠️ 입찰 존재 - 시작가/현재가 보존');
    }

    const { error: priceError } = await supabase
      .from('auction_prices')
      .update(priceUpdateData)
      .eq('item_id', itemId);

    if (priceError) {
      throw new Error(`auction_prices 수정 실패: ${priceError.message}`);
    }

    console.log('✅ 모든 DB 작업 완료');

    // 6. Next.js 캐시 무효화
    revalidatePath(`/auction/${itemId}`);
    revalidatePath('/');

    console.log('✅ 캐시 무효화 완료');
    return itemId;
  } catch (error) {
    console.error('❌ updateAuction 전체 에러:', error);
    throw error;
  }
};

// Delete
export const deleteAuction = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('auction_items').delete().eq('id', id);

  if (error) {
    console.error('경매 삭제 실패:', error.message);
    throw new Error(`경매 삭제 중 오류가 발생했습니다: ${error.message}`);
  }
  // ✅ 캐시 무효화 추가
  revalidatePath('/', 'layout'); // 메인 레이아웃과 하위 모든 페이지 무효화
  revalidatePath('/'); // 메인 페이지
  revalidatePath('/auction'); // 경매 관련 페이지들

  console.log('✅ 삭제 후 캐시 무효화 완료');
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

export const getAuctionStatus = async (itemId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('auction_items')
    .select('status')
    .eq('id', itemId)
    .single();

  if (error) throw new Error(`경매 상태 조회 실패: ${error.message}`);

  return data.status;
};

export const updateAuctionStatus = async (itemId: string, status: AuctionStatus) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('auction_items')
    .update({ status })
    .eq('id', itemId)
    .select('status')
    .single();

  if (error) {
    throw new Error(`경매 상태 업데이트 실패: ${error.message}`);
  }
};
