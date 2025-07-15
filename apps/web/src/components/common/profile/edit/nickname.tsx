import { Input } from '@/components/ui/input';

export default function NicknameInput() {
  return (
    <div className="mb-8 flex flex-col gap-2 px-4">
      <label htmlFor="nickname" className="mb-1 text-lg font-bold text-neutral-900">
        닉네임
      </label>
      <Input
        id="nickname"
        placeholder="닉네임을 입력하세요"
        maxLength={12}
        defaultValue="킹갓제너럴판매자"
      />
    </div>
  );
}
