'use client';

import { useState } from 'react';

import { AccountItem, ButtonSelect, DrawerHeader } from '@/components/personal-info';
import ButtonManage from '@/components/personal-info/button-manage';
import { Button, DrawerContent } from '@/components/ui';

import { ACCOUNT_DRAWER_HEADER } from '@/constants/personal-info';

const AccountDrawerContent = () => {
  const dummyAccount = [
    {
      id: '1',
      name: '김커널',
      bank: '패스트뱅크',
      account: '010-1234-5678',
      isPrimary: true,
    },
    {
      id: '2',
      name: '김커널',
      bank: '패스트뱅크',
      account: '010-1234-5678',
      isPrimary: false,
    },
    {
      id: '3',
      name: '김커널',
      bank: '패스트뱅크',
      account: '010-1234-5678',
      isPrimary: false,
    },
  ];

  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedAccountId(id === selectedAccountId ? null : id);
  };

  // TODO: 해당하는 id 에 대하여 메세지 컴포넌트로 공유하는 onClick 함수 넣어주기
  // TODO: manage-button 에 @modal 경로 넣어주기

  return (
    <DrawerContent className="flex flex-col gap-2 p-4">
      <DrawerHeader
        title={ACCOUNT_DRAWER_HEADER.title}
        description={ACCOUNT_DRAWER_HEADER.description}
      />
      <ul className="flex flex-col gap-2">
        {dummyAccount.map((account) => (
          <li key={account.id}>
            <AccountItem
              color={selectedAddressId === account.id ? 'selected' : 'default'}
              account={account}
            >
              <ButtonSelect
                isSelected={selectedAddressId === account.id}
                onClick={() => handleSelect(account.id)}
              />
            </AccountItem>
          </li>
        ))}
      </ul>
      <ButtonManage url="/chat/123" title="계좌 관리" />
      <Button variant="solid" size="lg">
        공유하기
      </Button>
    </DrawerContent>
  );
};

export default AccountDrawerContent;
