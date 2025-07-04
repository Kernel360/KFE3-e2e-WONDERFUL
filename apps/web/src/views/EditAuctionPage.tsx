import FormEdit from '@/components/auction-edit/form-edit';

const EditAuctionPage = ({ itemId }: { itemId: string }) => {
  console.log(itemId);

  return <FormEdit itemId={itemId} />;
};

export default EditAuctionPage;
