import Image from 'next/image';
import Link from 'next/link';
import Logo from '/public/images/logo.png';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atoms/AuthAtom';
import GnbButton from './GnbButton';
import NotificationButton from './NotificationButton';
import SearchBar from './SearchBar';

export default function Gnb() {
  const { type } = useRecoilValue(userState);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleGnbButtonsClick = (pathname: string | undefined) => {
    if (pathname) {
      router.push(pathname);
    }
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="flex justify-between items-center flex-wrap px-5 tablet:px-8 pc:px-52 py-2.5 tablet:py-4 pc:py-4">
      <Link href="/">
        <div className="flex items-center w-20 tablet:w-28 pc:w-28 h-4 tablet:h-10 pc:h-10">
          <Image src={Logo} alt="더줄게로고" />
        </div>
      </Link>
      <div className="flex items-center order-2 tablet:order-none pc:order-none mt-16px tablet:mt-0 pc:mt-0">
        <SearchBar />
      </div>
      <div className="flex items-center justify-between gap-16px tablet:gap-40px pc:gap-40px">
        <GnbButton userType={type} onClick={handleGnbButtonsClick} />
        {type !== 'guest' && <NotificationButton />}
      </div>
    </div>
  );
}
