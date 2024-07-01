import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import MyPageInput from '@/components/pageComponents/MyPage/MyPageInput';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { userState } from '@/recoil/atoms/AuthAtom';

export default function EditProfile() {
  const userId = useRecoilValue(userState);
  const router = useRouter();
  const handleClose = () => {
    router.push(`/users/${userId}`);
  };
  return (
    <div className="px-10 tablet:px-16 pc:px-60 py-3 tablet:py-8 pc:py-15">
      <div className="flex justify-between items-center gap-2.5">
        <span className="font-bold text-20 tablet:text-28 pc:text-28">
          내 프로필
        </span>
        <button onClick={handleClose}>
          <IconCloseBlack alt="닫기" />
        </button>
      </div>
      <MyPageInput />
    </div>
  );
}
