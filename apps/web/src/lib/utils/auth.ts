// 유효성 검사 함수들
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return '이메일을 입력해주세요.';
  if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다.';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return '비밀번호를 입력해주세요.';
  if (password.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name.trim()) return '이름을 입력해주세요.';
  return null;
};
