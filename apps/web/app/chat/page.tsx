import { ChatListItem } from '@/components/chat';
import { FilterTab } from '@/components/common';

import { CHAT_STATUS } from '@/lib/constants/chat';

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <FilterTab filterKey={'chatStatus'} items={CHAT_STATUS} />
      <ChatListItem />
    </div>
  );
};

export default Page;
