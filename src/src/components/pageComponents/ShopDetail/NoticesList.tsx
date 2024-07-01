import { useCallback, useEffect, useRef, useState } from 'react';
import NoData from '@/components/pageComponents/ShopDetail/NoData';
import NoticesCardList from '@/components/pageComponents/ShopDetail/NoticesCardList';

interface NoticesListProps {
  noticesData: NoticeListResponseData | null;
  shopData: Shop;
}

const NOTICES_PER_PAGE = 6;

export default function NoticesList({
  noticesData,
  shopData,
}: NoticesListProps) {
  const [currentNoticesPage, setCurrentNoticesPage] = useState(1);

  const observer = useRef<IntersectionObserver | null>(null);
  const noticesRef = useRef<HTMLDivElement | null>(null);

  const currentNoticesData =
    noticesData?.items.slice(0, currentNoticesPage * NOTICES_PER_PAGE) || [];

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setCurrentNoticesPage((prevPage) => prevPage + 1);
      }
    },
    []
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (noticesRef.current) {
      observer.current.observe(noticesRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [observerCallback, noticesRef.current]);

  return (
    <div className="bg-gray05">
      <div className="mx-auto w-full px-32px py-60px max-w-[1000px]">
        {currentNoticesData.length === 0 ? (
          <NoData title="공고를 등록해보세요." text="공고 등록하기" href="/" />
        ) : (
          <NoticesCardList
            title="등록한 공고"
            noticesData={currentNoticesData}
            shopData={shopData}
          />
        )}
      </div>
      <div ref={noticesRef}></div>
    </div>
  );
}
