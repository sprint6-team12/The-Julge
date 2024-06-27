import { Item3, Shops } from '@/types/ShopDetail';
import PostCard from '../Post/PostCard';

interface NoticesCardListProps {
  title: string;
  noticesData: Item3[];
  shopData: Shops;
}

export default function NoticesCardList({
  title,
  noticesData,
  shopData,
}: NoticesCardListProps) {
  return (
    <>
      <h1 className="font-bold text-start text-28px mb-24px pt-40px">
        {title}
      </h1>
      <div className="flex gap-32px">
        <div className="grid grid-cols-2 gap-x-8px gap-y-12px my-0 mx-auto pc:gap-x-36px pc:gap-y-26px pc:grid-cols-3">
          {noticesData.map((item) => (
            <PostCard
              key={item.item.id}
              noticeData={item.item}
              shopData={shopData}
            />
          ))}
        </div>
      </div>
    </>
  );
}