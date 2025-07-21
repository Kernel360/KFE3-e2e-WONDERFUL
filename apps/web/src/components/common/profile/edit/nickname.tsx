import { Input } from '@/components/ui/input';

interface NicknameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NicknameInput = ({ value, onChange }: NicknameInputProps) => {
  return (
    <div className="mb-2 flex flex-col gap-2 px-4">
      <label htmlFor="nickname" className="mb-1 text-lg font-bold text-neutral-900">
        닉네임
      </label>
      <Input
        id="nickname"
        placeholder="닉네임을 입력하세요"
        maxLength={12}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default NicknameInput;
