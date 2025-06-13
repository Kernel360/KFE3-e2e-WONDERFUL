rimport { Chip } from '../Chip/index';
import { ChipColorKey } from '../Chip/styles';
import { CardStyle, Location, Price, Thumbnail, Time, Title } from './styles';

// style
import styled, { css } from 'styled-components';

// Props 타입 정의 추가
interface CardStyleProps {
  isVertical: boolean;
  size?: string;
}

interface ThumbnailProps {
  size?: string;
}

export const CardStyle = styled.div<CardStyleProps>`
  display: flex;
  align-items: center;

  ${({ isVertical }) => {
    const width = isVertical ? '120px' : '312px';
    const height = isVertical ? '220px' : '100px';
    const direction = isVertical ? 'column' : 'row';

    return css`
      flex-direction: ${direction};
      width: ${width};
      height: ${height};
    `;
  }}
`;

export const Thumbnail = styled.div<ThumbnailProps>`
  position: relative;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;

  ${({ size }) => {
    const thumbnailSize = '100px'; // 기본 크기, 필요에 따라 size prop으로 조정 가능

    return css`
      width: ${thumbnailSize};
      height: ${thumbnailSize};
      min-width: ${thumbnailSize};
      min-height: ${thumbnailSize};
    `;
  }}
`;

export const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

export const Time = styled.span`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

export const Location = styled.span`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
`;

export const Price = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-left: 8px;
`;




// 상수들을 컴포넌트 내부에서 정의 (Storybook과의 호환성을 위해)
const CHIP_STATUS = {
  available: { title: '판매중', color: 'blue' },
  reserved: { title: '예약중', color: 'orange' },
  sold: { title: '판매완료', color: 'gray' },
} as const;

const CHIP_PRICE = {
  sell: { title: '판매', color: 'green' },
  exchange: { title: '교환', color: 'purple' },
} as const;

interface Props {
  itemInfo: Item;
  size?: string;
  isVertical: boolean;
}

type Item = {
  thumbnail: string;
  title: string;
  date: string;
  location: string;
  transactionStatus: keyof typeof CHIP_STATUS; // 더 구체적인 타입
  priceInfo: PriceInfo[];
}; // ERD 설계 시 변경

type ChipPriceKey = keyof typeof CHIP_PRICE;

type PriceInfo = {
  title: ChipPriceKey;
  value: number;
};

const Card = ({ itemInfo, size = 'medium', isVertical }: Props) => {
  const time = '2시간 전'; // 기능 및 api 연결 시 게시글 등록 시간과 현재 시간 차이 계산해서 출력하기

  // 안전한 상태 접근을 위한 기본값 설정
  const status =
    CHIP_STATUS[itemInfo.transactionStatus] || CHIP_STATUS.available;

  return (
    <CardStyle isVertical={isVertical} size={size} className='flex'>
      <Thumbnail size={size}>
        <Chip title={status.title} color={status.color as ChipColorKey} />
      </Thumbnail>
      <div className='flex flex-col p-2 m-0'>
        <Title>{itemInfo.title}</Title>
        <div className='flex gap-2'>
          <Location>{itemInfo.location}</Location>
          <Time>{time}</Time>
        </div>
        {!isVertical ? (
          <div>
            {itemInfo.priceInfo.map((info) => {
              const chip = CHIP_PRICE[info.title];
              if (!chip) return null;

              return (
                <div className='flex items-center' key={info.title}>
                  <Chip title={chip.title} color={chip.color as ChipColorKey} />
                  <Price>{info.value.toLocaleString()} 원</Price>
                </div>
              );
            })}
          </div>
        ) : (
          <Price>
            {itemInfo.priceInfo[0]?.value?.toLocaleString() || '0'} 원
          </Price>
        )}
      </div>
    </CardStyle>
  );
};

export default Card;
