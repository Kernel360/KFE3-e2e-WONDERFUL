import { DateMessage, ReceivedMessage, SentMessage } from '@/components/chat';

const ChatContainer = () => {
  const date = '2025년 9월 20일';

  // TODO: 기능 연결 시 user Id 체크 후 알맞은 컴포넌트 return 하는 로직 추가
  // - 날짜가 넘어가면 백엔드 측에서 날짜 변경 감지하여 date message 쏴주기

  return (
    <div className="flex h-auto flex-col overflow-y-auto px-4">
      <DateMessage date={date} />
      <ReceivedMessage />
      <SentMessage />
      <DateMessage date={date} />
      <ReceivedMessage />
      <SentMessage />
      <DateMessage date={date} />
      <ReceivedMessage />
      <SentMessage />
    </div>
  );
};

export default ChatContainer;
