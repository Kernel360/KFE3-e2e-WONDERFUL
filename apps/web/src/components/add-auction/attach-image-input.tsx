'use client';

import { ImageUp } from 'lucide-react';

const AttachImageInput = () => {
  /**
   * 할 일 목록
   *
   * 3. onChange 함수 분리하기
   * 4. 파일 등록 됐을 때 갯수 받아오기
   */

  return (
    <div className="w-fit">
      <input type="file" id="attachImages" className="hidden" />
      <label
        htmlFor="attachImages"
        className="w-15 h-15 flex flex-col items-center justify-center gap-0.5 rounded-md border border-neutral-200 text-neutral-600"
      >
        <ImageUp />
        <p className="text-min font-medium">0/8</p>
      </label>
    </div>
  );
};

export default AttachImageInput;
