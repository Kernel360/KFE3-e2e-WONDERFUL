'use client';

import { InputHTMLAttributes, useState } from 'react';

import { ErrorMessage, InputContainer, InputTextStyle } from './styles';

interface Props extends React.InputHTMLAttributes<HTMLElement> {
  error: boolean;
  icon: SVGAElement;
}

import styled, { css } from 'styled-components';

interface InputProps {
  error: boolean;
}

export const InputContainer = styled.div`
  width: 327px;
  height: 54px;
  margin: 4px;
  border: 1px solid #e8e8e8;
  border-radius: 30px;

  ${({ error }: InputProps) => {
    if (error) {
      return (
        error &&
        css`
          color: #e80039;
          border-color: #e80039;
          background-color: #ffeff0;
        `
      );
    }
  }}
`;

export const InputTextStyle = styled.input`
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #8f8f8f;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
`;



const InputText = ({
  error,
  icon,
  type,
  placeholder,
  name,
  onChange,
}: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isPassword = type === 'password';
  const currentType = isPassword && isVisible ? 'text' : type;
  const buttonIcon = isVisible ? '가려' : '보여'; // icon library
  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };
  const errorMessage = ''; // 기능 연결 시 맞추어 제작

  return (
    <div className='flex flex-col'>
      <InputContainer
        error={error}
        className='flex justify-between items-center p-4'
      >
        <div className='flex gap-2'>
          <div>{icon}</div>
          <InputTextStyle
            error={error}
            id={name}
            name={name}
            type={currentType}
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
        {isPassword && <button onClick={handleClick}>{buttonIcon}</button>}
      </InputContainer>
      {error && <ErrorMessage className='pl-5'>{errorMessage}</ErrorMessage>}
    </div>
  );
};

export default InputText;
