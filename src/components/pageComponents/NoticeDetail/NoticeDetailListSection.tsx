import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ApplicantsList from '@/components/pageComponents/NoticeDetail/ApplicantsList';
import RecentNoticeList from '@/components/pageComponents/NoticeDetail/RecentNoticeList';
import useRecentWatchedNotices from '@/hooks/useRecentWatchedNotices';
import applicationAPI from '@/lib/api/applicationAPI';
import { userState } from '@/recoil/atoms/AuthAtom';

interface NoticeDetailListSectionProps {
  noticeData: Notice;
}

function NoticeDetailListSection({ noticeData }: NoticeDetailListSectionProps) {
  const router = useRouter();
  const { shop_id, notice_id } = router.query;
  const { type } = useRecoilValue(userState);
  const [applicantListData, setApplicantListData] =
    useState<ApplicationListResponseData>();
  const [isLoading, setIsLoading] = useState(true);

  // 최근 본 공고에 현재 공고를 추가하면서 지금까지 본 공고 리스트를 불러옴
  const recentNoticeList = useRecentWatchedNotices(noticeData);

  // 내 가게일 경우 지원자 목록을 가져오는 useState
  useEffect(() => {
    // todo/case.employer 공고작성자와 접근하는 사용자가 동일한 사용자가 아닐 경우 접근 막기
    if (type !== 'employer') return setIsLoading(false);
    if (!shop_id || !notice_id) return setIsLoading(false);

    const fetchData = async () => {
      try {
        const data = await applicationAPI.getShopApply({
          shop_id: shop_id as string,
          notice_id: notice_id as string,
        });
        setApplicantListData(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-16px tablet:gap-24px my-40px tablet:my-60px">
      {type === 'employer' && applicantListData ? (
        <ApplicantsList data={applicantListData} />
      ) : (
        <RecentNoticeList list={recentNoticeList} />
      )}
    </div>
  );
}

export default NoticeDetailListSection;
