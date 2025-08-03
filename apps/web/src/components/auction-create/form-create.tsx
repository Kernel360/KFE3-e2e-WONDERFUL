import { useState } from 'react';

import { CircleAlert } from 'lucide-react';

import {
  AttachImages,
  CategorySelectBox,
  FormErrorMessage,
  MinUnitSelectBox,
  Notice,
} from '@/components/common';
import { Input, Label, Popover, PopoverContent, PopoverTrigger, Textarea } from '@/components/ui';

import { useNumberInput } from '@/hooks/common/useNumberInput';

import { Checkbox } from '../ui/checkbox';
const colClass = 'space-y-2 [&_label]:text-sm [&_label]:text-neutral-900 [&_label]:font-medium';

interface DefaultValuesType {
  title: string;
  description: string;
  category_id: string;
  start_price: number;
  min_bid_unit: number;
  end_time: string;
  images: string[];
  is_instant_buy_enabled?: boolean;
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
  currentPriceInfo?: CurrentPriceInfo; // 현재가 정보 추가
  onValidationChange?: (isValid: boolean) => void; // 유효성 검사 상태 변경 콜백
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
  const [isInstantBuyEnabled, setIsInstantBuyEnabled] = useState(
    defaultValues?.is_instant_buy_enabled || false
  );

  // 각 input에 맞는 범위 설정
  const priceHandlers = useNumberInput({ min: 1000, max: 2000000000 });
  const timeHandlers = useNumberInput({ min: 1, max: 99 });

  const formatPrice = (price: number) => price.toLocaleString() + '원';

  return (
    <div className="space-y-8">
      <div className={`${colClass}`}>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          placeholder="상품 제목을 입력해주세요."
          defaultValue={defaultValues?.title || ''}
          className="text-md placeholder:text-md h-12"
        />
        {errors['title'] && <FormErrorMessage>{errors['title']}</FormErrorMessage>}
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="description">상품 설명</Label>
        <Textarea
          id="description"
          name="description"
          className="text-md placeholder:text-md h-[110px] resize-none overflow-y-auto"
          placeholder="상품 설명을 입력해주세요."
          defaultValue={defaultValues?.description || ''}
        />
        {errors['description'] && <FormErrorMessage>{errors['description']}</FormErrorMessage>}
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="category_id">상품 카테고리</Label>
        <CategorySelectBox
          name="category_id"
          className="text-md h-12 w-full"
          defaultValue={defaultValues?.category_id || ''}
        />
        {errors['category_id'] && <FormErrorMessage>{errors['category_id']}</FormErrorMessage>}
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
              type="text" // type을 text로 변경
              inputMode="numeric" // 모바일에서 숫자 키패드 표시
              pattern="[0-9]*" // iOS에서 숫자 키패드 강제
              placeholder="최소 1,000원, 최대 20억 원 입니다. (예) 1000"
              defaultValue={defaultValues?.start_price || ''}
              className="text-md placeholder:text-md h-12"
              onInput={priceHandlers.handleNumberInput}
              onKeyDown={priceHandlers.handleNumberKeyDown}
              onPaste={priceHandlers.handleNumberPaste}
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
              className="text-md h-12 w-full"
              defaultValue={defaultValues?.min_bid_unit?.toString() || ''}
            />{' '}
            원
          </div>
          {errors['min_bid_unit'] && <FormErrorMessage>{errors['min_bid_unit']}</FormErrorMessage>}

          {errors['prices.min_bid_unit'] && (
            <FormErrorMessage>{errors['prices.min_bid_unit']}</FormErrorMessage>
          )}
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
            type="text" // type을 text로 변경
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="최소 1시간, 최대 99시간입니다. (예) 1, 2, 3, ..., 99"
            defaultValue={defaultValues?.end_time || ''}
            className="text-md placeholder:text-md h-12"
            onInput={timeHandlers.handleNumberInput}
            onKeyDown={timeHandlers.handleNumberKeyDown}
            onPaste={timeHandlers.handleNumberPaste}
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
      <div className={`flex flex-col gap-2`}>
        <div className="flex items-center gap-2">
          <Checkbox
            id="instant"
            name="instant"
            checked={isInstantBuyEnabled}
            onCheckedChange={(checked) => setIsInstantBuyEnabled(!!checked)}
          />
          <Label htmlFor="instant" className="text-md font-light">
            즉시 구매 사용하기
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <CircleAlert className="text-xs font-thin" width={20} height={20} strokeWidth={1} />
            </PopoverTrigger>
            <PopoverContent side="right" align="center" className="w-64 text-sm">
              즉시구매가 : 현재 가 * 1.2배
              <br />
              빠른 입찰을 원하신다면 즉시 구매를 이용해보세요.
            </PopoverContent>
          </Popover>
        </div>
        <input type="hidden" name="is_instant_buy_enabled" value={isInstantBuyEnabled.toString()} />
      </div>
    </div>
  );
};

export default CreateAuctionForm;
