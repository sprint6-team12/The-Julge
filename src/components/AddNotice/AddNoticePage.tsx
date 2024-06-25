import Link from 'next/link';
import { IconCloseBlack } from '@/utils/Icons';
import AddNoticeInput from './AddNoticeInput';

export default function AddNoticePage() {
  return (
    <div className="px-40px tablet:px-60px pc:px-[238px] py-12px tablet:py-32px pc:py-60px">
      <div className="flex justify-between">
        <span className="font-[700] text-20px tablet:text-28px pc:text-28px mb-24px">
          공고 등록
        </span>
        <Link href="/">
          {/* 어디로 이동해야하려나 */}
          <IconCloseBlack alt="닫기" />
        </Link>
      </div>
      <AddNoticeInput />
    </div>
  );
}