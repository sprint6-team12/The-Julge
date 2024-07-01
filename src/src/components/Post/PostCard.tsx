import Post from '@/components/Post/Post';
import FormatUtils from '@/lib/utils/FormatUtils';

interface PostCardProps {
  noticeData: Notice;
  shopData: Shop;
  className?: string;
  bgNone?: boolean;
}

export default function PostCard({
  noticeData,
  shopData,
  className,
  bgNone,
}: PostCardProps) {
  const { hourlyPay, startsAt, closed, workhour } = noticeData;
  const { name, address1, imageUrl, originalHourlyPay } = shopData;

  const isPassed = new Date() > new Date(startsAt);
  const currentPostState: NoticeStatus = closed
    ? 'closed'
    : isPassed
      ? 'passed'
      : 'open';

  const formattedPay = FormatUtils.price(hourlyPay) + '원';

  const disableStyle =
    currentPostState !== 'open'
      ? '[&_*]:text-gray30 [&_span]:bg-transparent tablet:[&_span]:bg-gray30 tablet:[&_span]:text-white tablet:[&_span_*]:text-white pc:[&_span]:bg-gray30 pc:[&_span]:text-white pc:[&_span_*]:text-white'
      : '';

  return (
    <Post.Wrapper
      status={currentPostState}
      className={`flex flex-col justify-between w-full min-h-[16.3rem] tablet:min-h-[21.8rem] pc:min-h-[21.8rem] bg-white rounded-12px p-12px tablet:p-16px pc:p-16px border border-gray20 ${closed ? 'pointer-events-none' : ''} ${disableStyle} ${className}`}
    >
      <Post.Image
        imageUrl={imageUrl}
        status={currentPostState}
        className="w-full aspect-video mb-12px tablet:mb-20px"
      />
      <div className={`flex flex-col gap-8px`}>
        <Post.SubTitle text={name} className="mb-4px" />
        <Post.WorkSchedule
          startsAt={startsAt}
          workHour={workhour}
          status={currentPostState}
        />
        <Post.Location address={address1} status={currentPostState} />
      </div>
      <div className="flex justify-between flex-col pt-16px gap-0px tablet:flex-row pc:flex-row mt-auto">
        <Post.Title text={formattedPay} className={`shrink-0`} />
        <Post.IncreaseRateBadge
          hourlyPay={hourlyPay}
          originalHourlyPay={originalHourlyPay}
          bgNone={bgNone}
        />
      </div>
    </Post.Wrapper>
  );
}
