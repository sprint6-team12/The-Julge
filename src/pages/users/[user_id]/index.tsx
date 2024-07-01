import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import MyPageRegistered from '@/components/pageComponents/MyPage/MyPageRegistered';
import MyPageUnregistered from '@/components/pageComponents/MyPage/MyPageUnregistered';
import userAPI, { UserInfo } from '@/lib/api/userAPI';
import { userState } from '@/recoil/atoms/AuthAtom';

export default function MyPage() {
  const { userId } = useRecoilValue(userState);
  const [profileData, setProfileData] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          alert('Error: 사용자 userId가 없습니다.');
          return;
        }
        const response = await userAPI.getUserData(userId);
        setProfileData(response.item);
      } catch (error) {
        alert('사용자 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      {profileData ? (
        <MyPageRegistered profileData={profileData} />
      ) : (
        <MyPageUnregistered />
      )}
    </div>
  );
}
