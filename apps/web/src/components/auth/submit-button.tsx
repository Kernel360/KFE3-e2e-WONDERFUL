import { Button } from '@/components/ui/button';

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
  className = 'h-[60px] w-[326px]',
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      size="lg"
      color={isFormValid ? 'primary' : 'secondary'}
      fullWidth={false}
      disabled={isSubmitting || !isFormValid}
      className={className}
    >
      {isSubmitting ? 'Loading...' : children}
    </Button>
  );
};

export default SubmitButton;
