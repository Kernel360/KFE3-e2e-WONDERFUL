import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MoreVertical, Pencil } from 'lucide-react';
import Link from 'next/link';

export default function ProfileEditForm() {
  return (
    <>
      <style>{`
        header.flex.h-16.w-full.items-center.justify-between.px-4 {
          display: none !important;
        }
      `}</style>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-white">
        {/* 커스텀 헤더 */}
        <div className="relative flex h-12 items-center justify-between border-b border-neutral-100 px-4">
          <Link href="/profile" className="flex h-9 w-9 items-center justify-center">
            <ChevronLeft className="h-7 w-7" />
          </Link>
          <div className="pointer-events-none absolute left-0 right-0 flex justify-center">
            <h1 className="text-xl font-bold text-neutral-900">프로필 수정</h1>
          </div>
          <button className="flex h-9 w-9 items-center justify-center">
            <MoreVertical className="h-7 w-7" />
          </button>
        </div>

        {/* 프로필 이미지 + 연필 아이콘 오버레이 */}
        <div className="relative mb-4 mt-8 flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-36 w-36">
              <AvatarImage
                src="https://autkdwezfwdduoqiadsc.supabase.co/storage/v1/object/public/auction-images/0bf0d884-38e1-4cf9-8663-5f65d0685233/1751631153830_jfii5z.jpeg"
                alt="프로필 이미지"
                className="object-cover"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <button
              className="absolute -bottom-1 -right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-neutral-300"
              aria-label="프로필 이미지 변경"
              type="button"
            >
              <Pencil className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* 닉네임 입력 */}
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

        {/* 저장 버튼 */}
        <div className="mb-8 mt-auto px-4">
          <Button type="submit" fullWidth>
            수정 완료
          </Button>
        </div>
      </div>
    </>
  );
}
