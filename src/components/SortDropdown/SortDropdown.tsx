import { useState } from 'react';
import { IconSortDropdownArrow } from '@/lib/utils/Icons';
import DropdownBackdrop from './DropdownBackdrop';
import DropdownButton from './DropdownButton';
import DropdownOptions from './DropdownOptions';

export interface SortHandler {
  handleOptionClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleToggleClick: () => void;
}
interface SortDropdownProps {
  onClick: (value: string) => void;
}

function SortDropdown({ onClick: handleSortClick }: SortDropdownProps) {
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('마감임박순');

  const onClickHandler: SortHandler = {
    handleToggleClick: () => {
      setToggleOpen(!toggleOpen);
    },
    handleOptionClick: (event: React.MouseEvent<HTMLElement>) => {
      const { value } = (event.target as HTMLElement).dataset;
      if (!value) return;
      setSelectedOption(value);
      handleSortClick(value);
    },
  };

  return (
    <DropdownButton
      selectedOption={selectedOption}
      toggleOpen={toggleOpen}
      onClick={onClickHandler}
    >
      <IconSortDropdownArrow
        className={`text-black w-10px h-10px transform transition-transform duration-200 ${toggleOpen ? 'rotate-180' : ''}`}
      />
      <DropdownOptions toggleOpen={toggleOpen} onClick={onClickHandler} />
      <DropdownBackdrop toggleOpen={toggleOpen} />
    </DropdownButton>
  );
}

export default SortDropdown;
