import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import LinkButton from '@/components/Button/LinkButton';
import MyPageProfile from '@/components/pageComponents/MyPage/MyPageProfile';
import { UserInfo } from '@/lib/api/userAPI';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { userState } from '@/recoil/atoms/AuthAtom';

interface MyPageRegisteredProps {
  profileData: UserInfo;
}

export default function MyPageRegistered({
  profileData,
}: MyPageRegisteredProps) {
  const [isEditing, setIsEditing] = useState(false);
  // const [hasApplications, setHasApplications] = useState(false);
  const router = useRouter();
  const userId = useRecoilValue(userState);

  const handleEditClick = () => {
    router.push(`/users/${userId}/editProfile`);
  };
  const handleCloseClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="px-10 tablet:px-16 pc:px-60 py-3 tablet:py-8 pc:py-15">
      <div className="flex justify-between items-center gap-2.5">
        <span className="font-bold text-20 tablet:text-28 pc:text-28">
          내 프로필
        </span>
        {isEditing && (
          <button onClick={handleCloseClick}>
            <IconCloseBlack alt="닫기" />
          </button>
        )}
      </div>
      <>
        <MyPageProfile ProfileData={profileData} onClick={handleEditClick} />
        <div className="mt-8 mb-8">
          <span className="font-bold text-20 tablet:text-28 pc:text-28">
            신청 내역
          </span>
        </div>
        {/* {hasApplications ? ( */}
        <div className="mt-8 w-full">
          {/* <EmployeeTable data={dummyEmployeeTableData} /> */}
        </div>
        {/* ) : ( */}
        <div className="border rounded-3 w-full h-48 tablet:h-54 pc:h-54 flex flex-col justify-center items-center">
          <div className="text-center px-6 py-15">
            <span className="font-normal text-14 tablet:text-16 pc:text-16">
              아직 신청 내역이 없어요.
            </span>
            <div className="flex justify-center mt-4 tablet:mt-6 pc:mt-6">
              <LinkButton href="/" className="button_large_active text-nowrap">
                공고 보러가기
              </LinkButton>
            </div>
          </div>
        </div>
        {/* )} */}
      </>
    </div>
  );
}
