import { Input, Label, Textarea } from '@/components/ui';
import CategorySelectBox from '@/components/auction-form/category-select';
import AttachImages from '@/components/auction-form/attach-images';
import MinUnitSelectBox from '@/components/auction-form/min-unit-select';
import Notice from './notice';
import FormErrorMessage from './error-msg';

const colClass = 'space-y-2 [&_label]:text-sm [&_label]:text-neutral-900 [&_label]:font-medium';

interface CreateAuctionFormProps {
  errors: { [key: string]: string };
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const CreateAuctionForm = ({ errors, setFiles }: CreateAuctionFormProps) => {
  return (
    <div className="space-y-8">
      <div className={`${colClass}`}>
        <Label htmlFor="title">제목</Label>
        <Input id="title" name="title" placeholder="상품명과 함께 간단한 설명이 있으면 좋아요" />
        {errors['title'] && <FormErrorMessage>{errors['title']}</FormErrorMessage>}
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="description">상품 설명</Label>
        <Textarea
          id="description"
          name="description"
          className="h-[110px] resize-none overflow-y-auto"
          placeholder="상품 설명을 입력해주세요. 구매 전 알아야 할 하자나 특이사항을 남겨주세요."
        />
        {errors['description'] && <FormErrorMessage>{errors['description']}</FormErrorMessage>}
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="category_id">상품 카테고리</Label>
        <CategorySelectBox name="category_id" className="w-full" />
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="images">상품 이미지</Label>
        <AttachImages id="images" setFiles={setFiles} />
        {errors['images'] && <FormErrorMessage>{errors['images']}</FormErrorMessage>}
      </div>

      <fieldset className="space-y-8">
        <div className={`${colClass}`}>
          <Label htmlFor="start_price">경매 시작가</Label>
          <Input
            id="start_price"
            name="start_price"
            type="number"
            min={1000}
            placeholder="최소 경매가는 1,000원 입니다."
          />
          {errors['prices.start_price'] && (
            <FormErrorMessage>{errors['prices.start_price']}</FormErrorMessage>
          )}
        </div>
        <div className={`${colClass}`}>
          <Label htmlFor="min_bid_unit">최소 입찰 금액</Label>
          <div className="mr-2 flex items-center gap-3">
            <MinUnitSelectBox name="min_bid_unit" className="w-full" /> 원
          </div>
          <Notice status="">
            <li>최소 입찰 금액에 대한 간단한 설명</li>
          </Notice>
        </div>
      </fieldset>

      <div className={`${colClass}`}>
        <Label htmlFor="end_time">경매 종료시간</Label>
        <Input
          id="end_time"
          name="end_time"
          type="number"
          max={99}
          min={0}
          placeholder="최대 시간은 경매 시작 후 99시간입니다."
        />
        {errors['end_time'] && <FormErrorMessage>{errors['end_time']}</FormErrorMessage>}
      </div>
    </div>
  );
};

export default CreateAuctionForm;
