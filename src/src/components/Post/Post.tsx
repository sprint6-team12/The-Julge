import Image from 'next/image';
import React from 'react';
import RateBadge from '@/components/Badge/RateBadge';
import FormatUtils from '@/lib/utils/FormatUtils';
import {
  IconClock,
  IconClockActive,
  IconLocation,
  IconLocationActive,
} from '@/lib/utils/Icons';

const POST_IMAGE_STATUS_TEXT = {
  open: null,
  closed: '마감 완료',
  passed: '지난 공고',
};

interface PostProps {
  status: NoticeStatus;
  [key: string]: unknown;
}

function PostWrapper({
  className = '',
  children,
  status = 'open',
}: {
  className?: string;
  children: React.ReactNode;
  status?: NoticeStatus;
}) {
  return (
    <div className={`relative ${className}`}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              status,
            } as PostProps)
          : child
      )}
    </div>
  );
}

function PostImage({
  className = '',
  imageUrl,
  status = 'open',
}: {
  className?: string;
  imageUrl: string;
  status?: NoticeStatus;
}) {
  const statusText = POST_IMAGE_STATUS_TEXT[status];
  const ImageOverlay = (
    <div className="absolute inset-0 flex-center text-16px tablet:text-28px pc:text-28px font-bold text-gray30 bg-black bg-opacity-50 z-[1]">
      {statusText}
    </div>
  );

  return (
    <div className={`relative rounded-12px overflow-hidden ${className}`}>
      {statusText && ImageOverlay}
      <Image
        src={imageUrl}
        className="rounded-12px object-cover"
        alt="가게 사진"
        fill
      />
    </div>
  );
}

function Title({ className = '', text }: { className?: string; text: string }) {
  return (
    <h2
      className={`text-black marker:text-18px tablet:text-24px pc:text-24px font-[700] tablet:mr-9px pc:mr-9px ${className}`}
    >
      {text}
    </h2>
  );
}

function SubTitle({
  className = '',
  text,
}: {
  className?: string;
  text: string;
}) {
  return (
    <h4
      className={`text-black text-16px tablet:text-20px pc:text-20px font-[700] ${className}`}
    >
      {text}
    </h4>
  );
}

function TitleBadge({
  className = '',
  badgeText,
}: {
  className?: string;
  badgeText: string;
}) {
  return (
    <span
      className={`text-custom-orange text-14px font-bold tablet:text-16px ${className}`}
    >
      {badgeText}
    </span>
  );
}

function WorkSchedule({
  className = '',
  startsAt,
  workHour,
  status = 'open',
}: {
  className?: string;
  startsAt: string;
  workHour: number;
  status?: NoticeStatus;
}) {
  const {
    formattedStartDate,
    formattedStartTime,
    formattedEndTime,
    durationHours,
  } = FormatUtils.workSchedule(startsAt, workHour);

  const clockIcon =
    status !== 'open' ? (
      <IconClockActive aria-label="시간 비활성화" />
    ) : (
      <IconClock aria-label="시간 활성화" />
    );

  return (
    <div className={`flex gap-6px ${className}`}>
      <div>{clockIcon}</div>
      <div className="flex flex-wrap leading-[21.5px] text-gray50 text-12px tablet:text-14px pc:text-14px font-[400] break-keep">
        <p>{formattedStartDate}</p>
        <p>
          {formattedStartTime}~{formattedEndTime} ({durationHours}시간)
        </p>
      </div>
    </div>
  );
}

function Location({
  className = '',
  address,
  status = 'open',
}: {
  className?: string;
  address: string;
  status?: NoticeStatus;
}) {
  const locationIcon =
    status !== 'open' ? (
      <IconLocationActive aria-label="장소 비활성화" />
    ) : (
      <IconLocation aria-label="장소 활성화" />
    );

  return (
    <div className={`flex items-center gap-6px ${className}`}>
      <div className="w-20px h-20px flex-center">{locationIcon}</div>
      <p
        className={`text-gray50 text-12px tablet:text-14px pc:text-14px font-normal leading-[21.5px]`}
      >
        {address}
      </p>
    </div>
  );
}

function HourlyPayPercentBadge({
  hourlyPay,
  originalHourlyPay,
  bgNone = false,
}: {
  hourlyPay: number;
  originalHourlyPay: number;
  bgNone?: boolean;
}) {
  const { roundedPercentage } = FormatUtils.payIncreasePercent(
    hourlyPay,
    originalHourlyPay
  );

  return <RateBadge rate={roundedPercentage} bgNone={bgNone} />;
}

const Post = Object.assign(
  {},
  {
    Wrapper: PostWrapper,
    Image: PostImage,
    Title: Title,
    TitleBadge: TitleBadge,
    SubTitle: SubTitle,
    WorkSchedule: WorkSchedule,
    Location: Location,
    IncreaseRateBadge: HourlyPayPercentBadge,
  }
);

export default Post;
