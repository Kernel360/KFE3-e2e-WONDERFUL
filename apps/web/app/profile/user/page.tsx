// apps/web/app/profile/user/page.tsx

import MyProfile from '@/components/user/my-profile';
import OtherProfile from '@/components/user/other-profile';

export default function UserPage({ searchParams }) {
  // 실제 프로젝트에서는 로그인 정보, URL, searchParams 등으로 분기
  // 임시 예시:
  const isMe = false; // 본인일 때 true, 남일 때 false

  return isMe ? <MyProfile /> : <OtherProfile />;
}
