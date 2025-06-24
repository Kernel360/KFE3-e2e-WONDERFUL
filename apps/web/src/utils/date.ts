// timestamp 형식의 데이터를 아래와 같이 변환해주는 포매터 함수
// Thu Jun 26 2025 04:52:38 GMT+0900 => 2025.06.26. 04:52

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day}. ${hour}:${minute}`;
};
