import { AccountItem, ButtonBox, ButtonCreate } from '@/components/personal-info';

const AccountList = () => {
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

  // TODO: 사용자 본인의 정보를 받아오는 api 요청 로직 추가
  // TODO: ButtonBox 로 account.id 넘겨주기. 해당하는 account.id 에 대하여 수정 및 삭제 요청 로직 Button-Box 내에서 작성
  // TODO: 계좌를 더 이상 추가할 수 없는 경우
  // const status = 'disabled';
  const status = 'default';

  return (
    <div className="flex h-full w-full flex-col justify-between px-4 pb-4">
      <ul className="flex flex-col gap-3">
        {dummyAccount.map((account) => (
          <li key={account.id}>
            <AccountItem account={account}>
              <ButtonBox url={`/account/edit/${account.id}`} />
            </AccountItem>
          </li>
        ))}
      </ul>
      <ButtonCreate url="account/create" status={status}>
        계좌 추가하기
      </ButtonCreate>
    </div>
  );
};

export default AccountList;
