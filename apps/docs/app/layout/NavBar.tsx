'use client';

import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavBar, NavIcon, NavItemWrapper } from './styles';

//style

import styled, { css } from 'styled-components';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 96px;
  padding: 16px 24px 24px;
`;

const NavItemWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 56px;
  text-align: center;
  font-size: 12px;
  color: var(--color-neutral-400);
  text-decoration: none;

  svg {
    fill: var(--color-neutral-400);
    width: 20px;
    height: 20px;
  }

  ${({ $active }) =>
    $active &&
    css`
      color: var(--color-teal-500);

      svg {
        fill: var(--color-teal-500);
      }
    `}
`;

const NavIcon = styled.div``;

export { NavBar, NavIcon, NavItemWrapper };




const navItems = [
  { href: '/', label: '홈', icon: <HomeFilledIcon /> },
  { href: '/deal', label: '거래', icon: <LocalOfferIcon /> },
  { href: '/search', label: '검색', icon: <SearchIcon /> },
  { href: '/profile', label: '프로필', icon: <PersonIcon /> },
];

export default function Home() {
  const pathname = usePathname();

  return (
    <NavBar>
      {navItems.map(({ href, label, icon }) => (
        <Link key={href} href={href} passHref>
          <NavItemWrapper $active={pathname === href}>
            <NavIcon>{icon}</NavIcon>
            <p>{label}</p>
          </NavItemWrapper>
        </Link>
      ))}
    </NavBar>
  );
}
