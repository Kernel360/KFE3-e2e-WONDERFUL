'use client';

import AddAuctionForm from '@/components/add-auction/add-auction-form';
import ButtonBox from '@/components/auction-edit/button-box';

const FormEdit = () => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const form = event.currentTarget;
    const formData = new FormData(form);

    console.log(formData);
  };

  return (
    <form onSubmit={submitHandler} className="relative mt-2.5">
      <section className="px-[15px]">
        <AddAuctionForm />
      </section>
      <ButtonBox />
    </form>
  );
};

export default FormEdit;
