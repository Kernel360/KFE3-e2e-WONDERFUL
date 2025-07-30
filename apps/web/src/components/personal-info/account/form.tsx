'use client';

import { InputPersonal } from '@/components/personal-info';
import { Button } from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';
import type { CreateAccountRequest } from '@/lib/types/account';
import { useToastStore } from '@/lib/zustand/store/toast-store';
import { useCreateAccount } from '@/hooks/queries/accounts';

interface AccountFormProps {
  item: AccountFormItem;
  onClick?: (data: CreateAccountRequest) => void;
}

interface AccountFormItem {
  bank: string;
  account: string;
  name: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const AccountForm = () => {
  const { showToast } = useToastStore();
  const createAccount = useCreateAccount();

  const handleAccountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const accountData: CreateAccountRequest = {
      bankName: formData.get('bankName') as string,
      accountNumber: formData.get('accountNumber') as string,
      accountHolder: formData.get('accountHolder') as string,
      isPrimary: formData.get('isPrimary') === 'on' ? true : false,
    };

    // 유효성 검사 함수 -> zod처리 필요함 (추후)
    const validateAccountData = (data: CreateAccountRequest): ValidationErrors => {
      const errors: ValidationErrors = {};

      if (!data.bankName?.trim()) {
        errors.bankName = '은행명을 입력해주세요';
      }

      if (!data.accountNumber?.trim()) {
        errors.accountNumber = '계좌번호를 입력해주세요';
      } else if (!/^[\d-]+$/.test(data.accountNumber.replace(/\s/g, ''))) {
        errors.accountNumber = '계좌번호는 숫자와 하이픈(-)만 입력 가능합니다';
      }

      if (!data.accountHolder?.trim()) {
        errors.accountHolder = '예금주를 입력해주세요';
      }

      return errors;
    };

    // 유효성 검사 실행
    const errors = validateAccountData(accountData);

    if (Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorMessage = errors[firstErrorKey!];

      showToast({
        status: 'error',
        title: firstErrorMessage as string,
        autoClose: true,
      });
      return;
    }

    try {
      await createAccount.mutateAsync(accountData);

      showToast({
        status: 'success',
        title: '계좌가 등록되었습니다.',
        autoClose: true,
      });

      // 폼 초기화
      form.reset();
    } catch (error) {
      showToast({
        status: 'error',
        title: createAccount.error || '계좌 등록에 실패했습니다.',
        autoClose: true,
      });
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
        />
        <InputPersonal
          id="accountNumber"
          label="계좌"
          placeholder="입금받으실 계좌를 입력해주세요"
          type="number"
        />
        <InputPersonal
          id="accountHolder"
          label="예금주"
          placeholder="계좌의 예금주를 정확히 입력해주세요"
          type="text"
        />
      </div>
      <div className="flex w-full flex-col gap-4 pb-4">
        <div className="flex items-center gap-2">
          <Checkbox id="isPrimary" name="isPrimary" />
          <label htmlFor="isPrimary">대표 계좌로 설정하기</label>
        </div>
        <Button fullWidth disabled={createAccount.isLoading}>
          {createAccount.isLoading ? '등록 중...' : '제출하기'}
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
