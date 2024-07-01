import { useEffect, useState } from 'react';

const RECENT_NOTICE_LIST_LIMIT = 6;

const useRecentWatchedNotices = (noticeData?: Notice) => {
  const [recentNoticeList, setRecentNoticeList] = useState<Notice[]>([]);

  useEffect(() => {
    const recentWatchedNoticeList: Notice[] = JSON.parse(
      localStorage.getItem('recentWatchedNotices') || '[]'
    );

    if (!noticeData) return setRecentNoticeList(recentWatchedNoticeList);

    const filteredList = recentWatchedNoticeList.filter(
      (watchedNotice) => watchedNotice.id !== noticeData.id
    );

    const newList = [noticeData, ...filteredList];

    if (newList.length > RECENT_NOTICE_LIST_LIMIT + 1) {
      newList.pop();
    }

    setRecentNoticeList(newList);
    localStorage.setItem('recentWatchedNotices', JSON.stringify(newList));
  }, [noticeData]);

  return recentNoticeList.slice(1, recentNoticeList.length);
};

export default useRecentWatchedNotices;
