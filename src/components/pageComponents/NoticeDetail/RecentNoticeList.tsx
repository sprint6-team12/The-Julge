import Link from 'next/link';
import Post from '@/components/Post/Post';
import PostCard from '@/components/Post/PostCard';
import useMediaQuery from '@/lib/utils/useMediaQuery';

function RecentNoticeListSection({ list }: { list: Notice[] }) {
  return (
    <>
      <Post.Title text="최근에 본 공고" className="mb-24px" />
      <div className="flex flex-wrap gap-8px tablet:gap-14px pc:gap-14px w-full">
        <RecentNoticeList list={list} />
      </div>
    </>
  );
}

function EmptyNoticeListComponent() {
  return (
    <div className="w-full min-h-[350px] flex-center">
      최근에 본 공고가 없어요 ㅜ.ㅜ
    </div>
  );
}

function RecentNoticeList({ list }: { list: Notice[] }) {
  const { isMobile } = useMediaQuery();

  if (list.length === 0) return <EmptyNoticeListComponent />;
  return (
    <>
      {list.map((notice: Notice) => {
        if (!('shop' in notice)) return;

        const shopId = notice.shop.item.id.toString();
        const noticeId = notice.id.toString();
        const href = `/shops/${shopId}/notices/${noticeId}`;

        return (
          <Link
            key={notice.id}
            href={href}
            className="w-[calc(50%-8px)] pc:w-[calc(33.33333%-10px)]"
          >
            <PostCard
              noticeData={notice}
              shopData={notice.shop.item}
              bgNone={isMobile}
            />
          </Link>
        );
      })}
    </>
  );
}

export default RecentNoticeListSection;
