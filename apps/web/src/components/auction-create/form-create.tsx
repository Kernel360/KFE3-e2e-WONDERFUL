import { CircleAlert } from 'lucide-react';

import {
  AttachImages,
  CategorySelectBox,
  FormErrorMessage,
  MinUnitSelectBox,
  Notice,
} from '@/components/common';
import { Input, Label, Textarea } from '@/components/ui';
const colClass = 'space-y-2 [&_label]:text-sm [&_label]:text-neutral-900 [&_label]:font-medium';

interface DefaultValuesType {
  title: string;
  description: string;
  category_id: string;
  start_price: number;
  min_bid_unit: number;
  end_time: string;
  images: string[];
}
interface CurrentPriceInfo {
  startPrice: number;
  currentPrice: number;
  bidCount: number;
}
interface CreateAuctionFormProps {
  errors: { [key: string]: string };
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  defaultValues?: DefaultValuesType;
  isEdit?: boolean;
  existingImages?: string[];
  onRemoveExistingImage?: (imageUrl: string) => void; // 기존 이미지 삭제 콜백
  currentPriceInfo?: CurrentPriceInfo; // ✅ 현재가 정보 추가
}

const CreateAuctionForm = ({
  errors,
  setFiles,
  defaultValues,
  isEdit,
  existingImages,
  onRemoveExistingImage,
  currentPriceInfo, // 현재가 정보
}: CreateAuctionFormProps) => {
  const formatPrice = (price: number) => price.toLocaleString() + '원';

  return (
    <div className="space-y-8">
      <div className={`${colClass}`}>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          placeholder="상품명과 함께 간단한 설명이 있으면 좋아요"
          defaultValue={defaultValues?.title || ''}
        />
        {errors['title'] && <FormErrorMessage>{errors['title']}</FormErrorMessage>}
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="description">상품 설명</Label>
        <Textarea
          id="description"
          name="description"
          className="h-[110px] resize-none overflow-y-auto"
          placeholder="상품 설명을 입력해주세요. 구매 전 알아야 할 하자나 특이사항을 남겨주세요."
          defaultValue={defaultValues?.description || ''}
        />
        {errors['description'] && <FormErrorMessage>{errors['description']}</FormErrorMessage>}
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="category_id">상품 카테고리</Label>
        <CategorySelectBox
          name="category_id"
          className="w-full"
          defaultValue={defaultValues?.category_id || ''}
        />
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="images">상품 이미지</Label>
        <AttachImages
          id="images"
          setFiles={setFiles}
          existingImages={existingImages} // 기존 이미지 URL 배열
          isEdit={isEdit}
          onRemoveExistingImage={onRemoveExistingImage}
        />
        {errors['images'] && <FormErrorMessage>{errors['images']}</FormErrorMessage>}
      </div>

      <fieldset className="space-y-8">
        <div className={`${colClass}`}>
          <Label htmlFor="start_price">경매 시작가</Label>
          {isEdit ? (
            <>
              {/* 수정 모드: 현재가를 경매 시작가 필드에 표시 */}
              <Input
                value={
                  currentPriceInfo
                    ? formatPrice(currentPriceInfo.currentPrice)
                    : formatPrice(defaultValues?.start_price || 0)
                }
                disabled
                className="bg-gray-100"
                placeholder="현재 경매가"
              />

              {/* 실제 submit용 hidden input (현재가로 전송) */}
              <input
                type="hidden"
                name="start_price"
                value={currentPriceInfo?.currentPrice || defaultValues?.start_price || 0}
              />

              {/* 입찰 정보 표시 */}
              {currentPriceInfo && currentPriceInfo.bidCount > 0 && (
                <div className="text-sm text-blue-600">
                  총 {currentPriceInfo.bidCount}회 입찰로 {formatPrice(currentPriceInfo.startPrice)}
                  에서 현재가로 상승
                </div>
              )}
            </>
          ) : (
            /* 등록 모드: 일반 input */
            <Input
              id="start_price"
              name="start_price"
              type="number"
              min={1000}
              placeholder="최소 경매가는 1,000원 입니다."
              defaultValue={defaultValues?.start_price || ''}
            />
          )}
          {errors['prices.start_price'] && (
            <FormErrorMessage>{errors['prices.start_price']}</FormErrorMessage>
          )}
        </div>
        <div className={`${colClass}`}>
          <Label htmlFor="min_bid_unit">최소 입찰 금액</Label>
          <div className="mr-2 flex items-center gap-3">
            <MinUnitSelectBox
              name="min_bid_unit"
              className="w-full"
              defaultValue={defaultValues?.min_bid_unit?.toString() || ''}
            />{' '}
            원
          </div>
        </div>
      </fieldset>

      <div className={`${colClass}`}>
        <Label htmlFor="end_time">경매 종료시간</Label>
        {isEdit ? (
          <>
            {/* 수정 모드: 표시용 disabled input */}
            <Input
              type="number"
              value={defaultValues?.end_time || ''}
              disabled
              className="bg-gray-100"
            />
            {/* 실제 submit용 hidden input */}
            <input type="hidden" name="end_time" value={defaultValues?.end_time || ''} />
          </>
        ) : (
          /* 등록 모드: 일반 input */
          <Input
            id="end_time"
            name="end_time"
            type="number"
            max={99}
            min={1}
            placeholder="최대 시간은 경매 시작 후 99시간입니다."
            defaultValue={defaultValues?.end_time || ''}
          />
        )}

        {isEdit && (
          <Notice status="caution">
            <li>
              <CircleAlert />
              경매 수정 시 종료시간은 변경할 수 없습니다.
            </li>
          </Notice>
        )}

        {errors['end_time'] && <FormErrorMessage>{errors['end_time']}</FormErrorMessage>}
      </div>
    </div>
  );
};

export default CreateAuctionForm;
