import { GetStaticPaths, GetStaticProps } from 'next';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import {
  // ApplicantsList,
  NoticeDetailCard,
  RecentNoticeListSection,
} from '@/components/pageComponents/NoticeDetail';
import Post from '@/components/Post/Post';
// import applicationAPI from '@/lib/api/applicationAPI';
import useRecentWatchedNotices from '@/hooks/useRecentWatchedNotices';
import noticeAPI from '@/lib/api/noticeAPI';

// 모든 가능한 [shop_id]/notice/[notice_id] 경로를 생성
export async function getAllShopNoticeIds() {
  const { items } = await noticeAPI.getNoticeList({});

  const paths = items.map(({ item }: { item: Notice }) => {
    if (!('shop' in item)) return;

    return {
      params: {
        shop_id: item.shop.item.id.toString(),
        notice_id: item.id.toString(),
      },
    };
  });

  return paths;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllShopNoticeIds();
  return {
    paths,
    fallback: 'blocking', // 필요한 경우, 요청 시 페이지를 생성
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { item } = await noticeAPI.getShopNotice({
    shop_id: params?.shop_id as string,
    notice_id: params?.notice_id as string,
  });

  return {
    props: {
      noticeData: item,
    },
    revalidate: 60 * 60 * 1000, // 1시간마다 페이지 재생성
  };
};

// recoil을 이용해서 user data 받아온 후 내부에서 판단해서 보여주는 컴포넌트 조절
//
// employer case
//    유저와 shop 작성자가 동일한지 판단하는 로직 작성해서 동일한 사용자가 아닐 경우 접근 막기
//    useEffect 이용해서
//    employer && (유저와 shop 작성자가 동일한지 판단하는 로직)일 경우,
//    추가적으로 지원자 데이터를 불러와서
//    <ApplicantsList/> 를 로딩
const Page = ({ noticeData }: { noticeData: NoticeEmployee }) => {
  // const router = useRouter();
  // const { shop_id, notice_id } = router.query;
  // const [applicantsList, setApplicantsList] = useState();
  const recentNoticeList = useRecentWatchedNotices(noticeData);

  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  // useEffect(() => {
  //   if (로직) return;
  //   const fetchData = async () => {
  //     const data = await applicationAPI.getShopApply({
  //       shop_id,
  //       notice_id,
  //     });
  //     setApplicantsList(data);
  //   };
  //   fetchData();
  // }, []);

  // 받는 데이터 따라서 수정예정
  const mock_user = {
    item: {
      id: '16aebe5d-dd24-4347-b52e-d59e4d30312e',
      email: 'owner@test.com',
      type: 'employee' as UserType,
    },
    href: '/api/6-12/the-julge/users/16aebe5d-dd24-4347-b52e-d59e4d30312e',
  };

  // 레이아웃 적용 따라서 수정예정
  const basicPageDivStyle =
    'p-12px mx-12px tablet:mx-32px pc:mx-auto w-[964px]';

  return (
    <div className="flex-center bg-gray05 ">
      <div className={`flex flex-col ${basicPageDivStyle}`}>
        <div className="flex flex-col gap-16px tablet:gap-24px my-40px tablet:my-60px">
          <Post.TitleBadge
            className="-mb-8px"
            badgeText={noticeData.shop?.item.category}
          />
          <Post.Title
            text={noticeData.shop?.item.name}
            className="shrink-0 text-24px tablet:text-28px"
          />

          <NoticeDetailCard item={noticeData} user={mock_user.item} />

          <div className="w-full min-h-148px rounded-12px p-32px bg-gray10 text-black text-16px">
            <h4 className="font-bold mb-12px">공고 설명</h4>
            <p>{noticeData.description}</p>
          </div>
        </div>

        <div className="flex flex-col gap-16px tablet:gap-24px my-40px tablet:my-60px">
          <RecentNoticeListSection noticeList={recentNoticeList} />
          {/* <ApplicantsList data={applicantsList} /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
