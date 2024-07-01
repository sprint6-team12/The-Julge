import NoData from '../NoData';
import ShopHeader from './ShopHeader';

interface ShopTitleSectionProps {
  title: string;
  shopData: Shop | null;
}

export default function ShopTitleSection({
  title,
  shopData,
}: ShopTitleSectionProps) {
  return (
    <div className="mx-auto w-full my-20px px-32px py-60px max-w-[1000px]">
      <h1 className="font-bold text-start text-28px mb-24px">{title}</h1>
      {!shopData ? (
        <NoData
          title="내 가게를 소개하고 공고도 등록해 보세요."
          text="내 가게 등록하기"
          href="/"
        />
      ) : (
        <div className="flex flex-col items-start justify-start gap-0 p-24px rounded-24px bg-red10 min-h-[358px] pc:flex-row pc:gap-31px">
          <ShopHeader shopData={shopData} />
        </div>
      )}
    </div>
  );
}
