import { InputPersonal } from '@/components/personal-info';
import { Button } from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';

interface AccountFormProps {
  item: AccountFormItem;
}

interface AccountFormItem {
  bank: string;
  account: string;
  name: string;
}

const AccountForm = ({ item }: AccountFormProps) => {
  return (
    <div className="flex h-full w-full flex-col justify-between px-4">
      <div className="flex flex-col gap-3">
        <InputPersonal id="bank" label="은행명" placeholder={item.bank} type="text" />
        <InputPersonal id="account" label="이름" placeholder={item.account} type="number" />
        <InputPersonal id="name" label="예금주" placeholder={item.name} type="text" />
      </div>
      <div className="flex w-full flex-col gap-4 pb-4">
        <div className="flex items-center gap-2">
          <Checkbox /> <span>대표 계좌로 설정하기</span>
        </div>
        <Button>제출하기</Button>
      </div>
    </div>
  );
};

export default AccountForm;
