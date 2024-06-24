interface RateMapItem {
  range: [number, number];
  backgroundColor: string;
  textColor: string;
}

const RATE_MAP: RateMapItem[] = [
  {
    range: [0, 0],
    backgroundColor: 'tablet:bg-gray20 pc:bg-gray20',
    textColor: 'text-gray20',
  },
  {
    range: [1, 29],
    backgroundColor: 'tablet:bg-red20 pc:bg-red20',
    textColor: 'text-red20',
  },
  {
    range: [30, 60],
    backgroundColor: 'tablet:bg-red30 pc:bg-red30',
    textColor: 'text-red30',
  },
  {
    range: [61, 100],
    backgroundColor: 'tablet:bg-red40 pc:bg-red40',
    textColor: 'text-red40',
  },
];

// rate에 따라 RATE_MAP에서 지정한 범위에 해당하는 값을 반환하는 훅
function useColorByRate(rate: number) {
  for (const { range, backgroundColor, textColor } of RATE_MAP) {
    const [min, max] = range;
    if (rate >= min && rate <= max) {
      return {
        backgroundColor: backgroundColor,
        textColor: textColor,
      };
    }
  }
  // 지정한 범위에 rate가 없으면 반환
  return {
    backgroundColor: '',
    textColor: 'text-white',
  };
}

export default useColorByRate;
