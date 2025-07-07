import FormEdit from '@/components/auction-form/form-edit';

const EditAuctionPage = ({ itemId }: { itemId: string }) => {
  return <FormEdit itemId={itemId} />;
};

export default EditAuctionPage;
