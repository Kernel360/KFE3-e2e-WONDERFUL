import FormEdit from '@/components/auction-edit/form-edit';

interface EditAuctionPageProps {
  params: {
    id: string;
  };
}

const EditAuctionPage = ({ params }: EditAuctionPageProps) => {
  return <FormEdit itemId={params.id} />;
};

export default EditAuctionPage;
