import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectOption {
  id: string;
  name: string;
}

interface SelectBoxProps {
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const SelectBox = ({
  options,
  placeholder = 'Select an option',
  className,
  value,
  onValueChange,
}: SelectBoxProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.name}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

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
//       onValueChange={setSelectedValue}
//     />
//   );
// };
