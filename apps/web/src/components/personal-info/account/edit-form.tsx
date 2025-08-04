'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { InputPersonal } from '@/components/personal-info';
import { Button } from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';
import { updateAccount } from '@/lib/actions/account';
import { useAccounts } from '@/hooks/queries/accounts';
import type { CreateAccountRequest } from '@/lib/types/account';
import { useToastStore } from '@/lib/zustand/store/toast-store';
import { useQueryClient } from '@tanstack/react-query';

const AccountEditForm = ({ accountId }: { accountId: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();
  const { data: accountList = [] } = useAccounts();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateAccountRequest>({
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    isPrimary: false,
  });

  useEffect(() => {
    const account = accountList.find((acc) => acc.id === accountId);
    if (account) {
      setFormData({
        bankName: account.bankName || '',
        accountNumber: account.accountNumber || '',
        accountHolder: account.accountHolder || '',
        isPrimary: account.isPrimary,
      });
    }
  }, [accountList, accountId]);

  const handleAccountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formDataObj = new FormData(form);

    const accountData: CreateAccountRequest = {
      bankName: formDataObj.get('bankName') as string,
      accountNumber: formDataObj.get('accountNumber') as string,
      accountHolder: formDataObj.get('accountHolder') as string,
      isPrimary: formDataObj.get('isPrimary') === 'on',
    };

    if (
      !accountData.bankName?.trim() ||
      !accountData.accountNumber?.trim() ||
      !accountData.accountHolder?.trim()
    ) {
      showToast({
        status: 'error',
        title: '모든 필드를 입력해주세요.',
        autoClose: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await updateAccount(accountId, accountData);

      if (result.error) {
        throw new Error(result.error);
      }

      showToast({
        status: 'success',
        title: '계좌가 수정되었습니다.',
        autoClose: true,
      });

      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      router.push('/account');
    } catch (error) {
      showToast({
        status: 'error',
        title: error instanceof Error ? error.message : '계좌 수정에 실패했습니다.',
        autoClose: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleAccountSubmit}
      className="flex h-full w-full flex-col justify-between px-4"
    >
      <div className="flex flex-col gap-3">
        <InputPersonal
          id="bankName"
          label="은행명"
          placeholder="사용하시는 은행명을 입력해주세요"
          type="text"
          defaultValue={formData.bankName}
        />
        <InputPersonal
          id="accountNumber"
          label="계좌"
          placeholder="입금받으실 계좌를 입력해주세요"
          type="number"
          defaultValue={formData.accountNumber}
        />
        <InputPersonal
          id="accountHolder"
          label="예금주"
          placeholder="계좌의 예금주를 정확히 입력해주세요"
          type="text"
          defaultValue={formData.accountHolder}
        />
      </div>
      <div className="flex w-full flex-col gap-4 pb-4">
        <div className="flex items-center gap-2">
          <Checkbox id="isPrimary" name="isPrimary" defaultChecked={formData.isPrimary} />
          <label htmlFor="isPrimary">대표 계좌로 설정하기</label>
        </div>
        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </form>
  );
};

export default AccountEditForm;
