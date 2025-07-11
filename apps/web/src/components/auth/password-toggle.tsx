import { Eye, EyeOff } from 'lucide-react';

interface PasswordToggleProps {
  showPassword: boolean;
  onToggle: () => void;
  hasError?: boolean;
}

const PasswordToggle = ({ showPassword, onToggle, hasError = false }: PasswordToggleProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`p-1 transition-colors focus:outline-none ${
        hasError
          ? 'text-danger-600 hover:text-danger-600/80'
          : 'text-neutral-900 hover:text-neutral-600'
      }`}
      aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
    >
      {showPassword ? <EyeOff /> : <Eye />}
    </button>
  );
};

export default PasswordToggle;
