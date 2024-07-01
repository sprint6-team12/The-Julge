import MemberTypeButton from './MemberTypeButton';

export interface UserTypeProps {
  userType: 'employee' | 'employer';
  onClick: (type: 'employee' | 'employer') => void;
}

export default function MemberTypeToggle({ userType, onClick }: UserTypeProps) {
  return (
    <div className="flex flex-col items-start pb-18px">
      <span className="font-medium text-gray-600 mb-8px">회원 유형</span>
      <div className="flex items-center justify-between w-full gap-16px">
        <MemberTypeButton
          userType="employee"
          isButtonClicked={userType === 'employee'}
          onClick={onClick}
        />
        <MemberTypeButton
          userType="employer"
          isButtonClicked={userType === 'employer'}
          onClick={onClick}
        />
      </div>
    </div>
  );
}
