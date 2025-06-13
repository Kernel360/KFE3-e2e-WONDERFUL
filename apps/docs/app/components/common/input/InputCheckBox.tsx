'use client';

/**
 * 체크박스 컴포넌트
 * - 기본 또는 상세 페이지에서 사용
 * - 체크박스 및 텍스트 입력 혹은 링크로 구성
 * - 체크 시 배경 변경 및 텍스트 스타일 변화
 */
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useRef, useState } from 'react';

import { CheckWrapper, CheckboxInput, IconWrapper, Label } from './style';

// InputCheck 컴포넌트의 props 타입
interface InputCheckProps {
  id: string;
  label: string;
  onChange: () => void;
  hiddenlabel?: boolean;
}

//style
'use client';

import styled from 'styled-components';

// 전체 체크박스 영역 wrapper 스타일
const CheckWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transition: 0.1s all ease-in-out;

  &:hover,
  & > *:hover {
    cursor: pointer;
  }

  strong {
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
  }
`;

// 라벨 안에 체크박스와 아이콘 포함
const Label = styled.label`
  display: flex;
  align-items: center;
`;

// 체크 상태 표시 아이콘
const IconWrapper = styled.i`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background: var(--color-neutral-50);
  border-radius: 4px;
  border: 1px solid var(--color-neutral-300);
  transition: 0.1s all ease-in-out;

  svg {
    opacity: 0;
    transition: 0.1s opacity ease-in-out;
    width: 16px;
    height: 16px;
    fill: #fff;
  }
`;

// 실제 체크박스는 숨기고 focus/checked 상태만 제어
const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;

  &:focus + ${IconWrapper} {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  &:checked + ${IconWrapper} {
    background: var(--color-teal-500);
    border-color: var(--color-teal-500);

    svg {
      opacity: 1;
    }
  }
`;

export { CheckWrapper, CheckboxInput, Label, IconWrapper };



export const InputCheckBox = ({
  id,
  label,
  onChange,
  hiddenlabel,
}: InputCheckProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string | undefined>('');

  // 텍스트 상태를 부모로부터 받은 label로 초기화
  useEffect(() => {
    setText(label);
  }, [label]);

  /**입력 필드의 길이에 따라 width 조절 */
  useEffect(() => {
    if (inputRef.current && text) {
      inputRef.current.style.width = `${Math.max(text.length + 2, 1)}ch`;
    }
  }, [text]);

  return (
    <CheckWrapper>
      <Label htmlFor={id.toString()}>
        <CheckboxInput
          type='checkbox'
          id={id.toString()}
          name={label}
          onChange={onChange}
        />
        <IconWrapper aria-hidden='true'>
          <CheckIcon />
        </IconWrapper>
        {!hiddenlabel && <strong>{label}</strong>}
      </Label>
    </CheckWrapper>
  );
};
