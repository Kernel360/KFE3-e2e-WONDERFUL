'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ButtonFavoriteProps {
  itemId: string;
}

const ButtonFavorite = ({ itemId }: ButtonFavoriteProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const fillColor = isFavorited ? '#f43f5e' : 'none';
  const strokeColor = isFavorited ? '#f43f5e' : '#a1a1a1';

  const handleClick = () => {
    // 서버에 찜 등록 or 해제 요청 등 api 요청 로직 추가
    setIsFavorited((prev) => !prev);
  };

  return (
    <button type="button" className="h-8 w-8" onClick={handleClick}>
      <Heart className="h-6" fill={fillColor} stroke={strokeColor} />
    </button>
  );
};

export default ButtonFavorite;
