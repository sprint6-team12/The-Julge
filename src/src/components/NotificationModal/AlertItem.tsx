import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import alertAPI from '@/lib/api/alertAPI';
import FormatUtils from '@/lib/utils/FormatUtils';
import { getResultInfo } from '@/lib/utils/NotificationModal';
import removePrefix from '@/lib/utils/RemovePrefix';
import { userState } from '@/recoil/atoms/AuthAtom';

export default function AlertItem({ item }: { item: NotificationItem }) {
  const { notice, result, shop, read } = item;
  const href = item.notice.href ?? ''; // 없으면 '' 안하면에러남 ㅠ
  const resultInfo = getResultInfo(result);
  const { userId } = useRecoilValue(userState);

  if (!resultInfo) {
    return null;
  }

  const linkHref = removePrefix(href);

  const { formattedStartDate, formattedStartTime, formattedEndTime } =
    FormatUtils.workSchedule(notice.item.startsAt, notice.item.workhour);
  const formattedDate = FormatUtils.distanceToNow(item.createdAt);

  const handleOnclickAlert = async (alertId: string) => {
    if (userId && !read) {
      await alertAPI.putAlerts({ user_id: userId, alert_id: alertId });
    }
  };

  return (
    <Link href={linkHref}>
      <div
        onClick={() => handleOnclickAlert(item.id)}
        key={item.id}
        className={`flex flex-col p-4 border rounded gap-8px ${read ? 'bg-gray20' : 'bg-white'} `}
      >
        {resultInfo.icon}
        <p className={`text-14px ${read ? 'text-gray50' : ''}`}>
          {shop.item.name} ({formattedStartDate} {formattedStartTime} ~{' '}
          {formattedEndTime}) 공고 지원이 {resultInfo.text}되었어요
        </p>
        <p className="text-12px text-gray40">{formattedDate}</p>
      </div>
    </Link>
  );
}
