import { InputPersonal } from '@/components/personal-info';
import { Button } from '@/components/ui';
import { Checkbox } from '@/components/ui/checkbox';

interface AddressFormProps {
  item: AddressFormItem;
}

interface AddressFormItem {
  name: string;
  address: string;
  detail: string;
  phone: string;
}

const AddressForm = ({ item }: AddressFormProps) => {
  return (
    <div className="flex h-full w-full flex-col justify-between px-4">
      <div className="flex flex-col gap-4">
        <InputPersonal id="name" label="이름" placeholder={item.name} type="text" />
        <div className="flex flex-col">
          <InputPersonal id="address" label="주소" placeholder={item.address} type="text" />
          <InputPersonal id="detail" placeholder={item.detail} type="text" />
        </div>
        <InputPersonal id="phone" label="휴대전화" placeholder={item.phone} type="number" />
      </div>
      <div className="flex w-full flex-col gap-4 pb-4">
        <div className="flex items-center gap-2">
          <Checkbox /> <span>대표 주소로 설정하기</span>
        </div>
        <Button>제출하기</Button>
      </div>
    </div>
  );
};

export default AddressForm;
