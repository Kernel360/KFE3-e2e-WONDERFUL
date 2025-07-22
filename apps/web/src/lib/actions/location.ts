'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/utils/auth';

import type { Location } from '@/types/location';

//위치 추가
export const createLocation = async (data: Location) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        error: '로그인이 필요합니다.',
      };
    }

    const supabase = await createClient();

    if (data.is_primary) {
      const { data: existingPrimary } = await supabase
        .from('locations')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_primary', true);

      if (existingPrimary && existingPrimary.length > 0) {
        await supabase
          .from('locations')
          .update({ is_primary: false })
          .eq('user_id', user.id)
          .eq('is_primary', true);
      }
    }

    const { data: newLocation, error: insertError } = await supabase
      .from('locations')
      .insert({
        user_id: user.id,
        location_name: data.location_name || null,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        is_primary: Boolean(data.is_primary ?? false),
      })
      .select()
      .single();

    if (insertError) {
      return {
        success: false,
        error: `위치 정보 저장에 실패했습니다: ${insertError.message}`,
      };
    }

    revalidatePath('/profile');
    revalidatePath('/');

    return {
      success: true,
      data: newLocation,
      message: '위치 정보가 저장되었습니다.',
    };
  } catch (error) {
    return {
      success: false,
      error: '위치 정보 저장 중 오류가 발생했습니다.',
    };
  }
};

// 위치 불러오기
export const getUserLocations = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        error: '로그인이 필요합니다.',
      };
    }

    const supabase = await createClient();

    const { data: locations, error: selectError } = await supabase
      .from('locations')
      .select('*')
      .eq('user_id', user.id)
      .order('is_primary', { ascending: false });

    if (selectError) {
      return {
        success: false,
        error: `위치 정보 조회에 실패했습니다: ${selectError.message}`,
      };
    }

    return {
      success: true,
      data: locations || [],
    };
  } catch (error) {
    return {
      success: false,
      error: '위치 정보 조회 중 오류가 발생했습니다.',
    };
  }
};

// 위치 삭제하기
export const deleteLocation = async (locationId: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        error: '로그인이 필요합니다.',
      };
    }

    const supabase = await createClient();

    const { data: deletedLocation, error: deleteError } = await supabase
      .from('locations')
      .delete()
      .eq('id', locationId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (deleteError) {
      return {
        success: false,
        error: '위치 정보 삭제에 실패했습니다.',
      };
    }

    if (!deletedLocation) {
      return {
        success: false,
        error: '위치 정보를 찾을 수 없거나 권한이 없습니다.',
      };
    }

    revalidatePath('/profile');
    revalidatePath('/');

    return {
      success: true,
      data: deletedLocation,
      message: '위치 정보가 삭제되었습니다.',
    };
  } catch (error) {
    return {
      success: false,
      error: '위치 정보 삭제 중 오류가 발생했습니다.',
    };
  }
};

//is_primary 변경
export const setPrimaryLocation = async (locationId: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        error: '로그인이 필요합니다.',
      };
    }

    const supabase = await createClient();

    const { data: existingPrimary } = await supabase
      .from('locations')
      .select('id')
      .eq('user_id', user.id)
      .eq('is_primary', true);

    if (existingPrimary && existingPrimary.length > 0) {
      await supabase
        .from('locations')
        .update({ is_primary: false })
        .eq('user_id', user.id)
        .eq('is_primary', true);
    }

    const { data: updatedLocation, error: updateError } = await supabase
      .from('locations')
      .update({ is_primary: true })
      .eq('id', locationId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      return {
        success: false,
        error: '기본 위치 설정에 실패했습니다.',
      };
    }

    if (!updatedLocation) {
      return {
        success: false,
        error: '위치 정보를 찾을 수 없거나 권한이 없습니다.',
      };
    }

    revalidatePath('/profile');
    revalidatePath('/');

    return {
      success: true,
      data: updatedLocation,
      message: '기본 위치가 설정되었습니다.',
    };
  } catch (error) {
    return {
      success: false,
      error: '기본 위치 설정 중 오류가 발생했습니다.',
    };
  }
};
