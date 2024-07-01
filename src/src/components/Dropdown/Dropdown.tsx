import { useState, useRef, useEffect } from 'react';
import { IconDropdown } from '@/lib/utils/Icons';

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  width?: string;
  defaultValue?: string;
  placeholder?: string;
}

function Dropdown({
  options,
  onSelect,
  width = '300px',
  placeholder = '선택',
}: DropdownProps) {
  const dropDownClickRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // 선택된 옵션을 상위 컴포넌트로 전달
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropDownClickRef.current &&
      !dropDownClickRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 text-black">
      <div
        className={`relative inline-block ${width}`}
        ref={dropDownClickRef}
        onClick={handleToggleDropdown}
      >
        <div className="absolute top-1/2 right-16px transform -translate-y-1/2 w-16px h-16px flex-shrink-0">
          <IconDropdown />
        </div>
        <button className="flex w-full px-20px py-16px items-center border bg-white border-gray30 rounded-md text-base">
          <span className={selectedOption ? '' : 'text-gray-400'}>
            {selectedOption || placeholder}
          </span>
        </button>
        {isOpen && (
          <div className="absolute inline-flex flex-col rounded-md border-2px items-center border-gray20 bg-white shadow-md z-5 mt-8px overflow-y-auto overflow-x-hidden max-h-200px z-dropdown right-7px left-7px">
            {options.map((option) => (
              <div
                key={option}
                className="w-full flex justify-center px-24px py-12px items-center gap-16px cursor-pointer text-base leading-26 tracking--0.16 hover:bg-gray-100 border border-gray20"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
