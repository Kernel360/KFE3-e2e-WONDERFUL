import { AddressItem, ButtonBox, ButtonCreate } from '@/components/personal-info';

const AddressList = () => {
  const dummyAddress = [
    {
      id: '1',
      name: '김커널',
      address: '서울 강남구 강남대로 364',
      phone: '010-1234-5678',
      isPrimary: true,
    },
    {
      id: '2',
      name: '김커널',
      address: '서울 강남구 강남대로 364',
      phone: '010-1234-5678',
      isPrimary: false,
    },
    {
      id: '3',
      name: '김커널',
      address: '서울 강남구 강남대로 364',
      phone: '010-1234-5678',
      isPrimary: false,
    },
  ];

  // TODO: 사용자 본인의 정보를 받아오는 api 요청 로직 추가
  // TODO: ButtonBox 로 account.id 넘겨주기. 해당하는 account.id 에 대하여 수정 및 삭제 요청 로직 Button-Box 내에서 작성
  // TODO: 주소를 더 이상 추가할 수 없는 경우
  // const status = 'disabled';
  const status = 'default';

  return (
    <div className="flex h-full w-full flex-col justify-between px-4 pb-4">
      <ul className="flex flex-col gap-3">
        {dummyAddress.map((address) => (
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
