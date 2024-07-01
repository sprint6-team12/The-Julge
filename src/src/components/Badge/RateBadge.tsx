import useColorByRate from '@/hooks/useColorByRate';
import { IconSmallArrow, IconLargeArrow } from '@/lib/utils/Icons';
interface RateBadgeProps {
  rate: number;
  bgNone?: boolean;
}

function RateBadge({ rate, bgNone }: RateBadgeProps) {
  const { backgroundColor, textColor } = useColorByRate(rate);

  return (
    <span
      className={`${bgNone ? textColor : 'text-white tablet:text-white pc:text-white'} ${bgNone ? '' : backgroundColor} whitespace-nowrap rounded-20px tablet:rounded-20px pc:rounded-20px ${bgNone ? '' : `px-8px tablet:px-12px pc:px-12px py-12px tablet:py-8px pc:py-8px`} h-16px tablet:h-36px pc:h-36px text-12px tablet:text-14px pc:text-14px font-bold inline-flex items-center gap-2px`}
    >
      기존 시급보다 {rate}%
      <IconSmallArrow
        className={`${bgNone && textColor} tablet:hidden pc:hidden`}
      />
      <IconLargeArrow
        className={`${bgNone && textColor} hidden tablet:block pc:block`}
      />
    </span>
  );
}

export default RateBadge;
