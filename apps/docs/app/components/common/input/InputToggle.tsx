'use client';

/**
 * 체크박스 컴포넌트
 * - 기본 또는 상세 페이지에서 사용
 * - 체크박스 및 텍스트 입력 혹은 링크로 구성
 * - 체크 시 배경 변경 및 텍스트 스타일 변화
 */
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
  Label,
  ToggleButton,
  ToggleDot,
  ToggleInput,
  ToggleWrapper,
} from './style';

// InputCheck 컴포넌트의 props 타입
interface InputToggleProp {
  id: string;
  label: string;
  onChange: () => void;
  hiddenlabel?: boolean;
}

//style
'use client';

import styled, { css } from 'styled-components';

// 전체 체크박스 영역 wrapper 스타일
const ToggleWrapper = styled.div`
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

const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  width: 36px;
  height: 20px;
  border-radius: 20px;
  position: relative;
  margin-right: 8px;
  box-sizing: border-box;
  background: var(--color-neutral-300);
  border: 2px solid var(--color-neutral-300);
`;

const ToggleDot = styled.i`
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-neutral-600);
  box-sizing: border-box;
  transform: translateX(0%);
  transition: ease-in-out 0.15s transform;
`;

// 실제 체크박스는 숨기고 focus/checked 상태만 제어
const ToggleInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;

  &:focus + ${ToggleButton} {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  &:checked + ${ToggleButton} {
    border-color: var(--color-teal-500);
    background: var(--color-teal-500);

    i {
      background: #fff;
      transform: translateX(100%);
    }
  }
`;

export { ToggleWrapper, ToggleInput, Label, ToggleDot, ToggleButton };


export const InputToggle = ({
  id,
  label,
  onChange,
  hiddenlabel,
}: InputToggleProp) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string | undefined>('');
  const [active, setActive] = useState<boolean>(false);

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
    <ToggleWrapper>
      <Label htmlFor={id.toString()}>
        <ToggleInput
          type='checkbox'
          id={id.toString()}
          name={label}
          onChange={onChange}
        />
        <ToggleButton aria-hidden='true'>
          <ToggleDot />
        </ToggleButton>
        {!hiddenlabel && <strong>{label}</strong>}
      </Label>
    </ToggleWrapper>
  );
};
