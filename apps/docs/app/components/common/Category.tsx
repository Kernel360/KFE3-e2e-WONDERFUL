import PersonIcon from '@mui/icons-material/Person';

import { CategoryStyle } from './styles';

//style

import styled, { css } from 'styled-components';

interface StyleProps {
  active: boolean;
}

export const CategoryStyle = styled.div<StyleProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  ${({ active }) =>
    active
      ? css`
          background-color: #8cf5e1;
          color: #00695c;
        `
      : css`
          background-color: #f5f5f5;
          color: #4a4a4a;
        `}

  .icon {
    font-size: 18px;
  }
`;


interface Props {
  title: string;
  active: boolean;
}

const Category = ({ title, active }: Props) => {
  return (
    <CategoryStyle active={active}>
      <PersonIcon className='icon' />
      <span>{title}</span>
    </CategoryStyle>
  );
};

export default Category;
