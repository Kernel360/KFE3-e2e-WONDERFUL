'use client';

import React from 'react';

import { useParams } from 'next/navigation';

const ProductDetailPage = () => {
  const param = useParams();
  const { id } = param!;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold">상품 상세페이지</h1>
      <p className="text-md">Id: {id}</p>
    </div>
  );
};

export default ProductDetailPage;
