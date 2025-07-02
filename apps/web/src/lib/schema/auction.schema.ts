import { array, z } from 'zod';
import CreateAuctionForm from '../../components/create-auction/create-auction-form';

export const createAuctionSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  description: z.string().min(1, '상품 설명은 반드시 필요해요.'),
  category_id: z.string().min(1, '카테고리를 선택해주세요.'),
  prices: z.object({
    start_price: z.coerce
      .number({ message: '경매 시작가는 1,000원 이상이어야 합니다.' })
      .min(1000, '경매 시작가는 1,000원 이상이어야 합니다.'),
    min_bid_unit: z.coerce.number().min(1, '최소 입찰 금액을 선택해주세요.'),
  }),
  end_time: z
    .string()
    .min(1, '경매 종료시간을 입력해주세요.')
    .max(2, '최대 99시간까지 입력할 수 있어요.'),
  images: z.array(z.string()).default([]),
});

export type CreateAuctionFormData = z.infer<typeof createAuctionSchema>;
export interface CreateAuctionFormDataWithImages extends CreateAuctionFormData {
  images: string[];
}
