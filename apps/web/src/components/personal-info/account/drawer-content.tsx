'use client';

import { useState } from 'react';

import { AccountItem, ButtonManage, ButtonSelect, DrawerHeader } from '@/components/personal-info';
import { AccountListItem } from '@/components/personal-info/account/item';
import { Button, DrawerContent } from '@/components/ui';

import { useToastStore } from '@/lib/zustand/store';

import { ACCOUNT_DRAWER_HEADER } from '@/constants/personal-info';

const AccountDrawerContent = () => {
  const [accountList, setAccountList] = useState<AccountListItem[]>([]);
  const { showToast } = useToastStore();

  const handleClick = () => {
    showToast({
      status: 'notice',
      title: '준비중인 기능',
      subtext: '주소 공유 기능은 현재 준비중입니다.',
      autoClose: true,
    });
  };
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedAccountId(id === selectedAccountId ? null : id);
  };

  return (
    <DrawerContent className="flex flex-col gap-2 p-4">
      <DrawerHeader
        title={ACCOUNT_DRAWER_HEADER.title}
        description={ACCOUNT_DRAWER_HEADER.description}
      />
      <ul className="flex flex-col gap-2">
        {accountList.length === 0 && (
          <p className="py-10 text-center text-neutral-600">등록된 계좌가 없습니다.</p>
        )}
        {accountList.map((account) => (
          <li key={account.id}>
            <AccountItem
              color={selectedAccountId === account.id ? 'selected' : 'default'}
              account={account}
            >
              <ButtonSelect
                isSelected={selectedAccountId === account.id}
                onClick={() => handleSelect(account.id)}
              />
            </AccountItem>
          </li>
        ))}
      </ul>
      <ButtonManage title="계좌 관리" url="/account" />
      <Button variant="solid" size="lg" onClick={handleClick}>
        공유하기
      </Button>
    </DrawerContent>
  );
};

export default AccountDrawerContent;
