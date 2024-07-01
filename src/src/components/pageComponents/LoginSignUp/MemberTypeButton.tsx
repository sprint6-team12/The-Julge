import { IconChecked } from '@/lib/utils/Icons';

export interface TypeButtonProps {
  userType: 'employee' | 'employer';
  isButtonClicked: boolean;
  onClick: (type: 'employee' | 'employer') => void;
}

export default function MemberTypeButton({
  userType,
  isButtonClicked,
  onClick,
}: TypeButtonProps) {
  return (
    <button
      type="button"
      className={`px-16px py-8px border rounded-30px w-full ${
        isButtonClicked
          ? 'border-custom-orange text-custom-orange'
          : 'border-gray30'
      } flex-center`}
      onClick={() => onClick(userType)}
    >
      <div
        className={`m-0 w-18px h-18px mr-10px rounded-30px flex-center border border-solid border-gray30 ${isButtonClicked ? 'bg-custom-orange' : 'bg-white'}`}
      >
        {isButtonClicked && <IconChecked width="14" height="14" />}
      </div>
      <span>{userType === 'employee' ? '알바님' : '사장님'}</span>
    </button>
  );
}
