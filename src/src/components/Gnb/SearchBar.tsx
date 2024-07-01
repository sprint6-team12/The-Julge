import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IconSearch } from '@/lib/utils/Icons';
import keywordDataState from '@/recoil/atoms/searchAtom';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [, setKeyword] = useRecoilState(keywordDataState);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput(value);
    setKeyword(value);
  };

  return (
    <div className="relative flex items-center w-335px tablet:w-344px pc:w-450px">
      <IconSearch className="absolute w-[20px] h-[20px] ml-[15px]" />
      <input
        value={searchInput}
        placeholder="가게 이름으로 찾아보세요"
        onChange={handleChangeInput}
        className="px-[32px] py-[8px] ml-8px rounded-[10px] bg-gray10 w-full"
      />
    </div>
  );
}
