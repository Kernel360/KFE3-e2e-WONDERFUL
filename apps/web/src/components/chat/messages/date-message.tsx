interface DateMessageProps {
  date: string;
}

const DateMessage = ({ date }: DateMessageProps) => {
  // 기능 확장하여 DateMessage 가 아닌 NoticeMessage로 활용 가능

  return <p className="text-center text-sm text-neutral-600">{date}</p>;
};

export default DateMessage;
