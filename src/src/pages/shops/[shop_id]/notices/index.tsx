import Link from 'next/link';
import AddNoticeInput from '@/components/pageComponents/AddNotice/AddNoticeInput';
import { IconCloseBlack } from '@/lib/utils/Icons';

export default function AddNotice() {
  return (
    <div className="px-40px tablet:px-60px pc:px-[238px] py-12px tablet:py-32px pc:py-60px">
      <div className="flex justify-between">
        <span className="font-[700] text-20px tablet:text-28px pc:text-28px mb-24px">
          공고 등록
        </span>
        <Link href="/">
          {/* 공고리스트페이지로 이동 */}
          <IconCloseBlack aria-label="닫기" />
        </Link>
      </div>
      <AddNoticeInput />
    </div>
  );
}
