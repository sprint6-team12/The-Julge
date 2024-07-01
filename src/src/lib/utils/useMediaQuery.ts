import { useState, useEffect } from 'react';

function useMediaQuery() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryLists = {
      mobile: window.matchMedia('(max-width: 767px)'),
      tablet: window.matchMedia('(min-width: 768px) and (max-width: 1199px)'),
      desktop: window.matchMedia('(min-width: 1200px)'),
    };

    const handleMediaQueryChange = () => {
      setIsMobile(mediaQueryLists.mobile.matches);
      setIsTablet(mediaQueryLists.tablet.matches);
      setIsDesktop(mediaQueryLists.desktop.matches);
    };

    // 초기 상태 설정
    handleMediaQueryChange();

    // 이벤트 리스너 추가
    Object.values(mediaQueryLists).forEach((mql) => {
      mql.addEventListener('change', handleMediaQueryChange);
    });

    // 클린업 함수로 이벤트 리스너 제거
    return () => {
      Object.values(mediaQueryLists).forEach((mql) => {
        mql.removeEventListener('change', handleMediaQueryChange);
      });
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
}

export default useMediaQuery;
