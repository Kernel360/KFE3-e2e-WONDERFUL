'use client';

import CreateAuctionForm from '@/components/auction-create/form-create';
import { Button } from '@/components/ui';

import useEditAuction from '@/hooks/auction/useEditAuction';

interface FormEditProps {
  itemId: string;
}

const FormEdit = ({ itemId }: FormEditProps) => {
  const { handleSubmit, errors, setFiles } = useEditAuction(itemId);

  return (
    <form onSubmit={handleSubmit} className="relative mt-2.5">
      <section className="px-[15px]">
        <CreateAuctionForm errors={errors} setFiles={setFiles} />
      </section>
      <section className="backdrop-blur-xs sticky bottom-0 bg-white/70 px-[15px] pb-9 pt-4">
        <Button size="lg" className="flex w-full">
          제출하기
        </Button>
      </section>
    </form>
  );
};

export default FormEdit;
