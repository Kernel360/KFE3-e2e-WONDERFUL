interface SubmitButtonProps {
  isFormValid: boolean;
  isSubmitting: boolean;
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({
  isFormValid,
  isSubmitting,
  children,
  className = 'h-[60px] w-full rounded-[99px]',
}: SubmitButtonProps) => {
  return <></>;
};

export default SubmitButton;
