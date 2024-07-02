import { SortHandler } from './SortDropdown';

interface DropdownButtonProps {
  toggleOpen: boolean;
  selectedOption: string;
  onClick: SortHandler;
  children: React.ReactNode;
}

function DropdownButton({
  selectedOption,
  onClick: onClickHandler,
  children,
}: DropdownButtonProps) {
  return (
    <div
      className="relative w-105px h-30px bg-gray10 rounded-5px flex-center gap-6px cursor-pointer select-none"
      onClick={onClickHandler.handleToggleClick}
    >
      <span className="font-bold text-14px">{selectedOption}</span>
      {children}
    </div>
  );
}

export default DropdownButton;
