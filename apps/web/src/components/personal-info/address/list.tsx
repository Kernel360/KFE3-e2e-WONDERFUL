'use client';

import { useState } from 'react';

import { AddressItem, ButtonBox, ButtonCreate } from '@/components/personal-info';

import { AddressListItem } from '@/types/address';

const AddressList = () => {
  const [addressList, setAddressList] = useState<AddressListItem[]>([]);

  const status = 'default';

  return (
    <div className="flex h-full w-full flex-col justify-between px-4 pb-4">
      <ul className="flex flex-col gap-3">
        {addressList.length === 0 && (
          <p className="py-10 text-center text-neutral-600">등록된 주소가 없습니다.</p>
        )}
        {addressList.map((address) => (
          <li key={address.id}>
            <AddressItem address={address}>
              <ButtonBox url={`/address/edit/${address.id}`} />
            </AddressItem>
          </li>
        ))}
      </ul>
      <ButtonCreate url="address/create" status={status}>
        주소 추가하기
      </ButtonCreate>
    </div>
  );
};

export default AddressList;
