import { AddressForm } from '@/components/personal-info';

const Page = () => {
  const dummy = {
    name: '김커널',
    address: '서울 강남구 강남대로 364',
    detail: '11층 A룸',
    phone: '010-1234-5678',
  };

  return <AddressForm item={dummy} />;
};

export default Page;
