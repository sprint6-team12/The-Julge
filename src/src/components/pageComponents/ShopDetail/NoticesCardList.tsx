import Link from 'next/link';
import PostCard from '@/components/Post/PostCard';
import removePrefix from '@/lib/utils/RemovePrefix';

interface NoticesCardListProps {
  title: string;
  noticesData: NoticeItem[];
  shopData: Shop;
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
          {noticesData.map((item) => {
            const link = removePrefix(item.links[0].href);
            return (
              <Link key={item.item.id} href={link}>
                <PostCard noticeData={item.item} shopData={shopData} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
