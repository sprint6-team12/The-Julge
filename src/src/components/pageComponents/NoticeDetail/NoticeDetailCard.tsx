import NoticeDetailCardButton from '@/components/pageComponents/NoticeDetail/NoticeDetailCardButton';
import Post from '@/components/Post/Post';
import FormatUtils from '@/lib/utils/FormatUtils';

interface NoticeDetailCardProps {
  item: Notice;
  user: User | null;
}

function NoticeDetailCard({ item, user }: NoticeDetailCardProps) {
  if (!('shop' in item)) return null;

  const {
    hourlyPay,
    startsAt,
    workhour,
    closed,
    shop,
    currentUserApplication,
  } = item;
  const { address1, imageUrl, description, originalHourlyPay } = shop.item;
  const userType = user?.type || 'guest';

  const isPassed = new Date() > new Date(startsAt);
  const currentNoticeState = closed ? 'closed' : isPassed ? 'passed' : 'open';

  // employee일때만 존재하는 데이터 currentUserApplication를 통해 지원상태값 획득
  const currentUserApplicationState =
    currentUserApplication?.item?.status || null;

  const formattedPay = FormatUtils.price(hourlyPay) + '원';

  return (
    <div className="min-w-[351px] w-full flex flex-col gap-8px min-h-[356px] pc:flex-row pc:gap-16px border border-gray20 bg-white rounded-12px p-24px">
      <Post.Image
        imageUrl={imageUrl}
        status={currentNoticeState}
        className="w-full h-178px tablet:h-360px pc:h-full pc:min-h-[360px] pc:max-w-[540px]"
      />
      <div className={`flex flex-col gap-12px pc:w-[70%]`}>
        <Post.TitleBadge badgeText="시급" className="-mb-8px" />
        <div className="flex gap-8px items-center [&>_span]:shrink-0">
          <Post.Title
            text={formattedPay}
            className="shrink-0 text-24px tablet:text-28px"
          />
          {currentNoticeState !== 'closed' && (
            <Post.IncreaseRateBadge
              hourlyPay={hourlyPay}
              originalHourlyPay={originalHourlyPay}
            />
          )}
        </div>
        <Post.WorkSchedule
          startsAt={startsAt}
          workHour={workhour}
          status={currentNoticeState}
        />
        <Post.Location address={address1} status={currentNoticeState} />
        <p className="mt-12px mb-24px">{description}</p>

        <div className="flex flex-col w-full h-full [&_>button]:px-0 [&_>button]:w-full pc:[&_>button]:flex-grow-0 pc:[&_>button]:px-136px pc:[&_>button]:py-14px pc:[&_>button]:mt-auto">
          <NoticeDetailCardButton
            noticeState={currentNoticeState}
            userType={userType}
            userApplicationState={currentUserApplicationState}
          />
        </div>
      </div>
    </div>
  );
}

export default NoticeDetailCard;
