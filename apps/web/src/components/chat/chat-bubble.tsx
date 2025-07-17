import { tv } from 'tailwind-variants';

const style = tv({
  base: 'inline-block p-3 rounded-xl text-sm',
  variants: {
    color: {
      secondary: 'bg-primary-50/70 text-primary-950 max-w-3/5',
      primary: 'bg-primary-500 text-neutral-50 max-w-2/3',
      disabled: 'bg-neutral-100 text-primary-950',
    },
  },
});

interface ChatBubbleProps {
  color: 'primary' | 'secondary' | 'disabled';
  content: string;
}

const ChatBubble = ({ color, content }: ChatBubbleProps) => {
  return <div className={style({ color })}>{content}</div>;
};

export default ChatBubble;
