import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputBasicProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
}

const InputBasic = ({ id, label, ...props }: InputBasicProps) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} {...props} />
    </div>
  );
};

export default InputBasic;
