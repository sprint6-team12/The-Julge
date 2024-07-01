// import { useRouter } from 'next/router';
// import { useRecoilValue } from 'recoil';
// import noticeAPI from '@/lib/api/noticeAPI';
// import keywordDataState from '@/recoil/atoms/searchAtom';
// import Dropdown from '../../Dropdown/Dropdown';
// import Filter from '../../Filter/Filter';
// // import Pagination from '../../Pagination/Pagination';
// // import PostCard from '../Post/PostCard';
// // import useMediaQuery from '@/lib/utils/useMediaQuery';
// // import { useEffect, useState } from 'react';
// // import noticeAPI from '@/utils/api/noticeAPI';

// function SearchPage() {
//   // const { isMobile } = useMediaQuery();
//   const router = useRouter();
//   // const [searchResult, setSearchResult] = useState<NoticeResponse>();

//   const onPageChange = (page: number) => {
//     router.push(`${page}`);
//   };

//   //드롭다운에 전달할 함수
//   const onSelectClick = (value: string) => {
//     router.push(value);
//   };

//   const fetchFilterData = async (params: URLSearchParams) => {
//     try {
//       noticeAPI.getNoticeList(params);
//     } catch (error) {
//       error;
//     }
//   };

//   const searchValue = useRecoilValue(keywordDataState);

//   // searchValue가 변화하면 useEffect가 동작하면서 데이터 패치를 한다. 작성한 뒤 로직 분리 할 예정
//   // interface GetNoticeListData {
//   //   offset?: number;
//   //   limit?: number;
//   //   address?: string;
//   //   keyword?: string;
//   //   startsAtGte?: string;
//   //   hourlyPayGte?: number;
//   //   sort?: string;
//   // }
//   // useEffect(() => {
//   //   const getSearchData = async () => {
//   //     const response = await noticeAPI.getNoticeList({
//   //       offset: 0,
//   //       limit: 10,
//   //       keyword: searchValue,
//   //     });
//   //     setSearchResult(response.data);
//   //   };
//   //   getSearchData();
//   // }, [searchValue]);

//   // useEffect(() => {
//   //   console.log(searchResult);
//   // }, [searchResult]);

//   return (
//     <div className="pt-40px tablet:pt-60px pc:pt-60px">
//       <div className="flex flex-col w-351px tablet:w-[678px] pc:w-[964px] m-auto">
//         <div className="flex flex-col tablet:flex-row pc:flex-row tablet:justify-between pc: justify-between">
//           <h1 className="mb-16px tablet:mb-32px pc:mb-32px text-20px tablet:text-28px pc:text-28px font-bold">
//             <span className="font-bold text-20px tablet:text-28px pc:text-28px text-red40">
//               {searchValue}
//             </span>
//             에 대한 공고
//           </h1>
//           <div className="filter_container mb-16px flex items-center">
//             <Dropdown
//               options={['마감임박순', '시급많은순', '시간적은순', '가나다순']}
//               onSelect={onSelectClick}
//               width="w-105px"
//             />
//             <Filter onApplyFilters={fetchFilterData} />
//           </div>
//         </div>
//         {/* 필터 변경하면 랜더링 변경 */}
//         <div className="flex flex-wrap gap-8px tablet:gap-14px">
//           {/* {data.items.map(({ id, item }: Item) => (
//             <PostCard
//               key={id}
//               item={item}
//               className="w-171px tablet:w-332px pc:w-312px mb-8px tablet:mb-18px pc:17px"
//             />
//           ))} */}
//         </div>
//         <div className="inline-block mx-auto mt-40px mb-60px">
//           {/* <Pagination
//             totalPages={10}
//             currentPage={1}
//             hasNext={true}
//             onPageChange={onPageChange}
//           /> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchPage;
