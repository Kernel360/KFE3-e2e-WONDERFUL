interface ErrorMessageProps {
  errors: Record<string, string>;
  className?: string;
}

const ErrorMessage = ({
  errors,
  className = 'mt-[68px] flex h-[26px] items-center justify-center',
}: ErrorMessageProps) => {
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className={className}>
      {hasErrors && (
        <div className="text-danger-600 flex items-center gap-2 text-sm">
          <div className="border-danger-600 flex h-4 w-4 items-center justify-center rounded-full border">
            <span className="text-xs">!</span>
          </div>
          <span>{Object.values(errors)[0]}</span>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
