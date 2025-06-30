import React from 'react';
import { Input, Label, Textarea } from '@/components/ui';
import CategorySelectBox from '@/components/add-auction/category-select';
import ImagesUploader from '@/components/add-auction/images-uploader';
import MinUnitSelectBox from '@/components/add-auction/min-unit-select';
import Notice from '../common/notice';

const colClass = 'space-y-2 [&_label]:text-base [&_label]:text-neutral-900 [&_label]:font-medium';

const AddAuctionForm = () => {
  return (
    <div className="space-y-8">
      <div className={`${colClass}`}>
        <Label htmlFor="title">제목</Label>
        <Input id="title" name="title" placeholder="상품명과 함께 간단한 설명이 있으면 좋아요" />
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="description">상품 설명</Label>
        <Textarea
          id="description"
          name="description"
          className="h-[110px] resize-none overflow-y-auto"
          placeholder="상품 설명을 입력해주세요. 구매 전 알아야 할 하자나 특이사항을 남겨주세요."
        />
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="category_id">상품 카테고리</Label>
        <CategorySelectBox className="w-full" />
      </div>

      <div className={`${colClass}`}>
        <Label htmlFor="images">상품 이미지</Label>
        <ImagesUploader id="images" />
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
        </div>
        <div className={`${colClass}`}>
          <Label htmlFor="min_bid_unit">최소 입찰 금액</Label>
          <MinUnitSelectBox className="w-full" />
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
      </div>
    </div>
  );
};

export default AddAuctionForm;
