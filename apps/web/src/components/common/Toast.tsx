import { CircleCheck, CircleX, TriangleAlert, Info, X } from 'lucide-react';

type ToastProps = {
  description: string;
  status: 'success' | 'error' | 'warning' | 'info';
};

const ToastStyle = {
  success: {
    wrapper: 'bg-success-50 border-success-600 shadow-success-600/12 ',
    text: 'text-green-800',
    icon: <CircleCheck className="stroke-success-600" />,
  },
  error: {
    wrapper: 'bg-danger-50 border-danger-500 shadow-danger-600/12',
    text: 'text-red-800',
    icon: <CircleX className="stroke-danger-600" />,
  },
  warning: {
    wrapper: 'bg-amber-50 border-amber-500 shadow-amber-600/12',
    text: 'text-yellow-800',
    icon: <TriangleAlert className="stroke-amber-600" />,
  },
  info: {
    wrapper: 'bg-neutral-100 border-neutral-500 shadow-neutral-500/12 ',
    text: 'text-blue-800',
    icon: <Info className="stroke-neutral-600" />,
  },
};

const TEST: ToastProps[] = [
  {
    status: 'success',
    description: '성공했습니다.',
  },
  { status: 'error', description: '문제가 발생했습니다.' },
  { status: 'warning', description: '확인이 필요합니다.' },
  {
    status: 'info',
    description: '처리가 됐습니다.',
  },
];
const Toast = ({ description }: ToastProps) => {
  return (
    <>
      {TEST.map((obj) => {
        const style = ToastStyle[obj.status];

        return (
          <div
            key={obj.status}
            className={`border-1 m-auto my-4 flex w-11/12 items-center justify-between rounded-sm px-4 py-2 shadow-lg ${style.wrapper}`}
          >
            <div className="flex gap-2">
              <i>{style.icon}</i>
              <p>{obj.description}</p>
            </div>
            <button className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center self-start">
              <X className="h-auto w-3/5 stroke-neutral-600" />
              <span className="sr-only">닫기</span>
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Toast;
