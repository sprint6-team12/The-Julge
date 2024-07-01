import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import NoData from '@/components/pageComponents/ShopDetail/NoData';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { userState } from '@/recoil/atoms/AuthAtom';
import MyPageInput from './MyPageInput';

export default function MyPageUnregistered() {
  const [showInputForm, setShowInputForm] = useState(false);
  const userId = useRecoilValue(userState);
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push(`/users/${userId}/editProfile`);
  };

  return (
    <div className="px-40px tablet:px-60px pc:px-[238px] py-12px tablet:py-32px pc:py-60px">
      <div className="flex justify-between gap-10px mb-60px">
        <span className="font-[700] text-20px tablet:text-28px pc:text-28px">
          내 프로필
        </span>
        {showInputForm && (
          <button onClick={() => setShowInputForm(false)}>
            <IconCloseBlack alt="닫기" />
          </button>
        )}
      </div>
      {!showInputForm ? (
        <NoData
          title="내 프로필을 등록하고 원하는 가게에 지원해 보세요."
          text="내 프로필 등록하기"
          onClick={handleRegisterClick}
        />
      ) : (
        <div>
          <MyPageInput />
        </div>
      )}
    </div>
  );
}
