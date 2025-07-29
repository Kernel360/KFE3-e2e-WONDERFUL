import productCardStyle from '@/components/chat/style';
import { Button } from '@/components/ui';

const ProductCardError = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={productCardStyle().wrapper()}>
      <div className={productCardStyle().content({ loading: true })}>
        <div className="h-12 w-12 rounded-md bg-neutral-200" />
        <div className={productCardStyle().infoBox()}>
          <div className="mb-2 h-4 w-3/4 rounded bg-neutral-200" />
          <div className="h-3 w-1/2 rounded bg-neutral-200" />
        </div>
      </div>
      <div className={productCardStyle().buttonBox()}>
        <Button variant="outline" color="primary" size="min" onClick={onClick} className="w-1/5">
          다시 시도
        </Button>
      </div>
    </div>
  );
};

export default ProductCardError;
