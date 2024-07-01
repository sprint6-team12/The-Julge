import NoticeDetailCard from '@/components/pageComponents/NoticeDetail/NoticeDetailCard';
import Post from '@/components/Post/Post';

interface NoticeDetailSectionProps {
  noticeData: NoticeItem;
}

function NoticeDetailSection({ noticeData }: NoticeDetailSectionProps) {
  if (!('shop' in noticeData.item)) return null;

  const { shop, description } = noticeData.item;

  return (
    <div className="flex flex-col gap-16px tablet:gap-24px my-40px tablet:my-60px">
      <Post.TitleBadge className="-mb-8px" badgeText={shop.item.category} />
      <Post.Title
        text={shop.item.name}
        className="shrink-0 text-24px tablet:text-28px"
      />
      <NoticeDetailCard data={noticeData} />

      <div className="w-full min-h-148px rounded-12px p-32px bg-gray10 text-black text-16px">
        <h4 className="font-bold mb-12px">공고 설명</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default NoticeDetailSection;
