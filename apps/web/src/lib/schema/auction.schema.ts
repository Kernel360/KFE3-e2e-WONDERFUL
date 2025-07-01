import { z } from 'zod';

/**
 * addAuctionSchema
 * - 경매 등록 폼의 각 필드에 대한 유효성 검증 규칙을 정의합니다.
 * - z.coerce.number()를 사용하면 문자열 형태의 숫자 입력도 숫자로 자동 변환됩니다.
 */
export const addAuctionSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),

  description: z.string().min(1, '상품 설명을 입력해주세요.'),

  categoryId: z.coerce.number().min(1, '상품 카테고리를 선택해주세요.'),

  startPrice: z.coerce.number().min(1000, '경매 시작가는 1,000원 이상이어야 합니다.'),

  minBidUnit: z.coerce.number().min(1, '최소 입찰 금액을 선택해주세요.'),

  endTime: z.coerce
    .number()
    .min(1, '경매 종료 시간을 입력해주세요.')
    .max(99, '경매 종료시간은 99시간 이내여야 합니다.'),

  images: z.any().optional(), // 이미지 업로더 결과는 상황에 맞게 수정 필요
});

/**
 * AddAuctionFormData
 * - addAuctionSchema에서 유추한 타입을 사용하면
 *   유효성 검증이 끝난 데이터에 대한 타입 안정성을 확보할 수 있습니다.
 */
export type AddAuctionFormData = z.infer<typeof addAuctionSchema>;
