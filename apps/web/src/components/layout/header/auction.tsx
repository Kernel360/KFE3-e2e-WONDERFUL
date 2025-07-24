'use client';

import { useState } from 'react';

import { useParams, usePathname, useRouter } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

import { ButtonMore } from '@/components/common';
import { HeaderWrapper } from '@/components/layout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { useAuctionDetail } from '@/hooks/queries/auction';

import { deleteAuction } from '@/lib/actions/auction';

const AuctionHeader = () => {
  const routes = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { id } = params;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 경매 상세 정보 조회
  const { data: auctionData } = useAuctionDetail(id as string);

  // 현재 사용자가 경매 작성자인지 확인
  const isOwner =
    auctionData?.currentUserId && auctionData?.data?.sellerId === auctionData?.currentUserId;
  // 삭제 처리 함수
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteAuction(id as string);
      routes.push('/');
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
      console.error('경매 삭제 오류:', error as Error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  // 더보기 메뉴 아이템들
  const moreItems = [
    {
      id: 'edit',
      title: '수정하기',
      onClick: () => routes.push(`/auction/${id}/edit`),
    },
    {
      id: 'delete',
      title: '삭제하기',
      onClick: () => setIsDeleteDialogOpen(true),
    },
  ];
  return (
    <>
      <HeaderWrapper
        className={`${id && !pathname.includes('edit') ? 'absolute z-10 text-white' : 'bg-white'}`}
      >
        <button type="button" onClick={() => routes.back()}>
          <ChevronLeftIcon />
        </button>
        {(pathname.includes('edit') || pathname.includes('create')) && (
          <h2 className="text-h4 absolute left-1/2 -translate-x-1/2 font-bold">
            {pathname.includes('edit') ? '경매 상품 수정' : '경매 상품 등록'}
          </h2>
        )}

        {/* 경매 상세 페이지이고, 본인이 작성한 경매일 때만 더보기 버튼 표시 */}
        {id && !pathname.includes('edit') && isOwner && <ButtonMore items={moreItems} />}
      </HeaderWrapper>
      {/* 삭제 확인 AlertDialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              경매를 삭제하시겠습니까?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-md text-neutral-600">
              해당 경매 아이템과 관련된 모든 정보가 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-4">
            <AlertDialogCancel className="flex-1">취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AuctionHeader;
