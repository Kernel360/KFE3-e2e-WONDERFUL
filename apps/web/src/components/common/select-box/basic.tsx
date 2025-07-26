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
              <SelectItem key={option.value} value={option.value}>
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
// 사용 예시:
// export const ExampleUsage = () => {
//   const fruitOptions = [
//     { value: 'apple', label: 'Apple' },
//     { value: 'banana', label: 'Banana' },
//     { value: 'blueberry', label: 'Blueberry' },
//     { value: 'grapes', label: 'Grapes' },
//     { value: 'pineapple', label: 'Pineapple' },
//   ];

//   const [selectedValue, setSelectedValue] = React.useState('');

//   return (
//     <SelectBox
//       options={fruitOptions}
//       placeholder="Select a fruit"
//       value={selectedValue}
//       id={selectedValue}
//       onValueChange={setSelectedValue}
//     />
//   );
// };
