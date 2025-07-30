'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Account, CreateAccountRequest } from '@/lib/types/account';

// 계좌 등록
export async function createAccount(
  accountData: CreateAccountRequest
): Promise<{ data?: Account; error?: string }> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { error: '인증이 필요합니다.' };
    }

    const { bankName, accountNumber, accountHolder, isPrimary } = accountData;

    if (!bankName || !accountNumber || !accountHolder) {
      return { error: '모든 필드는 필수 입력 항목입니다.' };
    }

    // 대표 계좌로 설정하는 경우, 기존 대표 계좌 해제 (트랜잭션 처리)
    if (isPrimary) {
      const { error: updateError } = await supabase
        .from('accounts')
        .update({ is_primary: false })
        .eq('user_id', user.id)
        .eq('is_primary', true);

      if (updateError) {
        console.error('기존 대표 계좌 해제 오류:', updateError);
      }
    }

    const { data, error } = await supabase
      .from('accounts')
      .insert({
        user_id: user.id,
        bank_name: bankName,
        account_number: accountNumber,
        account_holder: accountHolder,
        is_primary: isPrimary || false,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .select()
      .single();

    if (error) {
      console.error('계좌 등록 오류:', error);
      return { error: error.message };
    }

    revalidatePath('/chat');
    revalidatePath('/account');

    const transformedData = {
      id: data.id,
      userId: data.user_id,
      bankName: data.bank_name,
      accountNumber: data.account_number,
      accountHolder: data.account_holder,
      isPrimary: data.is_primary,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as Account;

    return { data: transformedData };
  } catch (error) {
    console.error('계좌 등록 중 오류:', error);
    return { error: '계좌 등록 중 오류가 발생했습니다.' };
  }
}
