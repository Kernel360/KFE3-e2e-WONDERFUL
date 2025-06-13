'use client';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Accordion } from '../Accordion';
import { IconButton, RightArea, Title, Wrapper } from './style';

//style

import styled from 'styled-components';

const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'headerType',
})<{ headerType: string | null }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68px;

  ${({ headerType }) =>
    headerType === 'profile' &&
    `
      justify-content: flex-start;
      gap: 8px;

      p{
      font-size: 24px;
      line-height: 24px;
      font-weight: 700;
      }
    `}
`;

const IconButton = styled.button`
  width: 44px;
  height: 44px;
  cursor: pointer;
`;

const Title = styled.p`
  line-height: 20px;
  font-weight: 500;
`;

const RightArea = styled.div`
  width: 44px;
  height: 44px;
`;

export { Wrapper, IconButton, RightArea, Title };




interface location {
  name: string;
}

export const Header = () => {
  // 현재 헤더의 타입을 관리하는 state (home, detail, chat, profile)
  const [headerType, setHeaderType] = useState<string | null>();
  const [name, setName] = useState<string>('상대방 닉네임');
  const [locations, setLocations] = useState<location[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = () => router.back();

  // 현재 경로(pathname)에 따라 헤더 타입을 판별하는 함수
  const getHeaderType = (pathname: string): string | null => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/product')) return 'detail';
    if (pathname.startsWith('/chat')) return 'chat';
    if (pathname.startsWith('/profile')) return 'profile';
    return null;
  };

  // 경로가 바뀔 때마다 헤더 타입 갱신
  useEffect(() => {
    setHeaderType(getHeaderType(pathname));
  }, [pathname]);

  return (
    <>
      <Wrapper headerType={headerType!}>
        {/* home 이 아닐 경우 뒤로가기 버튼 노출 */}
        {headerType !== 'home' && (
          <IconButton aria-label='뒤로 가기' onClick={handleBack}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        {/* 홈일 때 아코디언 + 알림 버튼 노출 */}
        {headerType === 'home' && (
          <>
            <Accordion buttonTitle='버튼명'>
              {/* 지역 리스트는 반드시 li로 감싸야합니다. */}
              {locations?.map(({ name }, idx) => {
                return <li key={idx}>{name}</li>;
              })}
              <li>내용 아무거나</li>
              <li>
                <Link href={'/'}>거래지역 수정</Link>
              </li>
            </Accordion>

            {/* onClickEvent추가 */}
            <IconButton aria-label='알람 보기'>
              <NotificationsIcon />
            </IconButton>
          </>
        )}

        {headerType === 'detail' && (
          // onClickEvent추가
          <IconButton aria-label='더보기'>
            <MoreVertIcon />
          </IconButton>
        )}

        {headerType === 'chat' && (
          <>
            <Title>{name}</Title>
            {/* onClickEvent추가 */}
            <IconButton aria-label='더보기'>
              <MoreVertIcon />
            </IconButton>
          </>
        )}

        {headerType === 'profile' && (
          <>
            <Title>설정 페이지명</Title>
            <RightArea />
          </>
        )}
      </Wrapper>
    </>
  );
};
