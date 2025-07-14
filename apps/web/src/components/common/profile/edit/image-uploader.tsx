import { Pencil } from 'lucide-react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function ImageUploader() {
  return (
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
  );
}
