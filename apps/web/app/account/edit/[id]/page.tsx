import { AccountForm } from '@/components/personal-info';

const Page = () => {
  const dummy = {
    bank: '커널은행',
    account: '1234-5678-9012',
    name: '김커널',
  };

  return <AccountForm item={dummy} />;
};

export default Page;
