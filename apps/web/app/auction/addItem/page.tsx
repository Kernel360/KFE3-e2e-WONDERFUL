'use client';
import React from 'react';

import { LucideCircleAlert } from 'lucide-react';

const AddAuction = () => {
  return (
    <main className="relative mx-auto w-full overflow-hidden bg-white">
      {/* 제목 */}
      <section
        aria-labelledby="auction-title"
        className="left-0 flex w-full flex-col gap-7 px-3.5 py-7"
      >
        <div className="flex flex-col gap-2">
          <label
            id="auction-title"
            className="text-sm font-bold text-neutral-900"
            htmlFor="title-input"
          >
            제목
          </label>
          <div className="flex h-11 items-center rounded-md bg-white px-3 py-1 outline outline-1 outline-zinc-200">
            <span className="text-base text-neutral-400" id="title-input">
              글 제목
            </span>
          </div>
        </div>
      </section>

      {/* 상품설명 */}
      <section
        aria-labelledby="description-label"
        className="left-0 flex w-full flex-col gap-7 px-3.5 py-2"
      >
        <div className="flex flex-col gap-2">
          <label
            id="description-label"
            className="text-sm font-bold text-neutral-900"
            htmlFor="description-input"
          >
            상품설명
          </label>
          <div
            className="flex h-28 items-start rounded-md bg-white p-3 outline outline-1 outline-zinc-200"
            aria-describedby="description-help"
          >
            <span className="text-base text-zinc-500" id="description-input">
              상품에 대한 설명을 입력하세요. 사이즈, 상품 상태, 하자 등 구체적으로 적어주면 도움이
              됩니다.
            </span>
          </div>
        </div>
      </section>

      {/* 이미지 업로드 */}
      <section
        aria-labelledby="image-upload"
        className="left-0 flex w-full flex-col gap-7 px-3.5 py-2"
      >
        <div className="flex flex-col gap-2">
          <label id="image-upload" className="text-sm font-bold text-neutral-900">
            이미지 업로드
          </label>
          <div className="relative flex items-center gap-2" aria-describedby="image-upload-desc">
            <div className="flex size-14 flex-col items-center justify-center rounded-md outline outline-1 outline-neutral-200">
              <span className="text-xs text-neutral-500">4/8</span>
            </div>
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                className="size-14 rounded-md border border-neutral-200"
                src="https://placehold.co/60x60"
                alt="preview"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 입찰 기준 금액 + 마감일 + 마감 시간 */}
      <section className="left-0 flex w-full flex-col gap-7 px-3.5 py-2">
        <div className="flex flex-col gap-2">
          <label id="bid-amount" className="text-sm font-bold text-neutral-900" htmlFor="bid-input">
            입찰 기준 금액
          </label>
          <div
            className="flex h-11 items-center rounded-sm p-3 outline outline-1 outline-zinc-200"
            aria-describedby="bid-desc"
          >
            <span className="text-sm font-medium text-neutral-400" id="bid-input">
              입찰 기준 금액을 선택하세요.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-neutral-900">경매 마감일</label>
          <div className="flex h-11 items-center rounded-md px-[3px] py-px outline outline-1 outline-zinc-200">
            <span className="text-base text-zinc-500">경매가 끝나는 시간</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label id="auction-end" className="text-sm font-bold text-neutral-900">
            경매 마감 시간
          </label>
          <div
            className="flex h-11 items-center rounded-md px-[3px] py-px outline outline-1 outline-zinc-200"
            aria-activedescendant="auction-end-desc"
          >
            <span className="text-base text-zinc-500" id="auction-end-date">
              오후 10:30
            </span>
          </div>
        </div>
      </section>

      {/* 구매 옵션 */}
      <section className="left-0 flex w-full flex-col gap-7 px-3.5 py-2">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="size-4 accent-indigo-500" />
            <span className="text-base text-neutral-900">즉시 구매 사용하기</span>
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="size-4 accent-indigo-500" checked readOnly />
            <span className="text-base text-neutral-900">즉시 구매 사용하기</span>
          </label>
          <div className="flex h-11 items-center rounded-md bg-white px-3 py-1 outline outline-1 outline-zinc-200">
            <span className="text-base text-neutral-400">가격 입력</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="size-4 accent-indigo-500" checked readOnly />
            <span className="text-base text-neutral-900">연장 경매 사용하기</span>
          </label>
        </div>
      </section>

      {/* 안내 메시지 및 버튼 */}
      <section className="left-0 flex w-full flex-col gap-7 px-3.5 py-2">
        <div className="flex flex-col items-start pt-5">
          <div className="flex w-full items-center gap-2 rounded-md bg-rose-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <LucideCircleAlert className="size-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">
                경매 등록시 바로 경매가 시작됩니다!
              </span>
            </div>
          </div>
        </div>

        <div className="bottom-8 left-[15px] flex h-12 w-full items-center justify-center rounded-md bg-indigo-500 px-6 py-2">
          <span className="text-lg font-medium text-neutral-50">등록하기</span>
        </div>
      </section>
    </main>
  );
};

export default AddAuction;
