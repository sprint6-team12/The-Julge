import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Dropdown from '@/components/Dropdown/Dropdown';
import Filter from '@/components/Filter/Filter';
import Pagination from '@/components/Pagination/Pagination';
import PostCard from '@/components/Post/PostCard';
import noticeAPI from '@/lib/api/noticeAPI';
import paginationUtils from '@/lib/utils/paginationUtils';
import useMediaQuery from '@/lib/utils/useMediaQuery';

export default function Home({
  items,
  count,
  offset,
  limit,
  hasNext,
}: NoticeListResponseData) {
  const [noticeData, setNoticeData] = useState({
    items,
    count,
    offset,
    limit,
    hasNext,
  });
  const { isMobile } = useMediaQuery();
  const router = useRouter();
  paginationUtils.setValues = { limit, offset };

  const handlePageChange = async (page: number) => {
    const limit = noticeData.limit;
    const offset = (page - 1) * limit;

    const newNoticeData = await noticeAPI.getNoticeList({ offset, limit });
    setNoticeData(newNoticeData);
  };

  const handleSortClick = (value: string) => {
    router.push(value);
  };

  const fetchFilterData = async (params: URLSearchParams) => {
    try {
      noticeAPI.getNoticeList(params);
    } catch (error) {
      error;
    }
  };

  return (
    <main>
      <div className="bg-red10 h-381px tablet:h-[535px] pc:h-[535px] pt-40px">
        <div className="flex flex-col gap-16px tablet:gap-32px pc:gap-32px ml-12px tablet:ml-32px pc:m-auto pc:w-[964px]">
          <h1 className="text-20px tablet:text-28px pc:text-28px font-bold">
            맞춤 공고
          </h1>
          <div className="flex flex-grow-0 flex-shrink-0 h-274px tablet:h-378px pc:h-349px gap-4px tablet:gap-14px pc:gap-14px overflow-x-auto no-scrollbar">
            {/*TODO: 맞춤 공고만 3개 필터해서 넣기 임시로 그냥 3개 자름 */}
            {noticeData.items.slice(0, 3).map(({ item }) => {
              if (!('shop' in item)) return null;
              const noticeData = item;
              const shopData = item.shop.item;
              return (
                <div
                  key={noticeData.id}
                  className="flex-none w-171px tablet:w-312px pc:w-312px"
                >
                  <PostCard
                    noticeData={noticeData}
                    shopData={shopData}
                    bgNone={isMobile}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pt-40px tablet:pt-60px pc:pt-60px">
        <div className="flex flex-col w-351px tablet:w-[678px] pc:w-[964px] m-auto">
          <div className="flex flex-col tablet:flex-row pc:flex-row tablet:justify-between pc: justify-between">
            <h1 className="mb-16px tablet:mb-32px pc:mb-32px text-20px tablet:text-28px pc:text-28px font-bold">
              전체 공고
            </h1>
            <div className="filter_container flex items-center mb-16px">
              <Dropdown
                options={['마감임박순', '시급많은순', '시간적은순', '가나다순']}
                onSelect={handleSortClick}
                width="w-105px"
              />
              <Filter onApplyFilters={fetchFilterData} />
            </div>
          </div>
          <div className="flex flex-wrap gap-8px tablet:gap-14px">
            {noticeData.items.map(({ item }) => {
              if (!('shop' in item)) return null;
              const noticeData = item;
              const shopData = item.shop.item;
              return (
                <div
                  key={noticeData.id}
                  className="w-171px tablet:w-332px pc:w-312px mb-8px tablet:mb-18px pc:18px"
                >
                  <PostCard
                    noticeData={noticeData}
                    shopData={shopData}
                    bgNone={isMobile}
                  />
                </div>
              );
            })}
          </div>
          <div className="inline-block mx-auto mt-40px mb-60px">
            <Pagination
              count={noticeData.count}
              limit={noticeData.limit}
              currentPage={paginationUtils.currentPage}
              hasNext={noticeData.hasNext}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await noticeAPI.getNoticeList({ offset: 0, limit: 6 });

  return {
    props: {
      items: data.items,
      count: data.count,
      offset: data.offset,
      limit: data.limit,
      hasNext: data.hasNext,
    },
  };
};
