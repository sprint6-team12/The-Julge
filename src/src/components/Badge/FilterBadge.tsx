import { IconCloseOrange } from '@/lib/utils/Icons';

// 리액트의 기본 버튼 엘리먼트를 확장해서 전달하면 button이 가지고 있는 기본 속성들을 사용할 수 있음
interface FilterBadgeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

function FilterBadge({ children, ...rest }: FilterBadgeProps) {
  return (
    <span className="px-10px py-6px rounded-20px font-bold text-14px text-custom-orange tablet:text-14px pc:text-14px inline-flex justify-center items-center gap-4px bg-red10">
      {children}
      <button {...rest}>
        <IconCloseOrange />
      </button>
    </span>
  );
}

export default FilterBadge;
