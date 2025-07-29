import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  value?: string;
  name?: string;
  onValueChange?: (value: string) => void;
}

const SelectBox = ({
  options,
  placeholder = '선택해 주세요.',
  className,
  value,
  name,
  onValueChange,
}: SelectBoxProps) => {
  return (
    <>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={className} id={name}>
          <SelectValue defaultValue={value} placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-md h-12">
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* 선택된 값을 FormData로 넘기기 위한 hidden input */}
      <input type="hidden" name={name} value={value ?? ''} />
    </>
  );
};

export default SelectBox;
