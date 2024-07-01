import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SHOP_LOCATIONS } from '@/constants/shopOptions';
import { IconCloseBlack } from '@/lib/utils/Icons';
import DateSection from './DateSection';
import Divider from './Divider';
import LocationSection from './LocationSection';
import PriceSection from './PriceSection';

registerLocale('ko', ko);

interface FilterProps {
  onApplyFilters: (filters: URLSearchParams) => void;
}

export default function Filter({ onApplyFilters }: FilterProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [inputPrice, setInputPrice] = useState<string>('');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const FilterContainerRef = useRef<HTMLDivElement>(null);
  const ButtonRef = useRef<HTMLButtonElement>(null);

  const handleLocationClick = (location: string) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleRemoveLocation = (location: string) => {
    setSelectedLocations(selectedLocations.filter((item) => item !== location));
  };

  const Commas = (number: string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = event.target.value.replace(/\D/g, '');
    const formattedPrice = Commas(price);
    setInputPrice(formattedPrice);
  };

  const handleResetClick = () => {
    setStartDate(new Date());
    setSelectedLocations([]);
    setInputPrice('');
  };

  const handleFilterClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleApplyFilter = () => {
    const searchParams = new URLSearchParams();

    if (selectedLocations.length > 0) {
      selectedLocations.forEach((location) =>
        searchParams.append('address', location)
      );
    }
    if (startDate) {
      searchParams.append('startsAtGte', startDate.toISOString());
    }
    if (inputPrice) {
      searchParams.append('hourlyPayGte', inputPrice.replace(/,/g, ''));
    }

    onApplyFilters(searchParams);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        FilterContainerRef.current &&
        !FilterContainerRef.current.contains(event.target as Node) &&
        ButtonRef.current &&
        !ButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <button
        className="font-bold text-white px-10px h-30px rounded-5px bg-red30 text-14px mb-10px"
        ref={ButtonRef}
        onClick={handleFilterClick}
      >
        상세 필터{' '}
        {selectedLocations.length !== 0 && `(${selectedLocations.length})`}
      </button>
      {isFilterOpen && (
        <div className="fixed tablet:relative pc:relative inset-0 flex z-50">
          <div
            className="relative w-full h-full tablet:right-0 pc:right-0 tablet:top-24px pc:top-24px tablet:absolute pc:absolute tablet:w-390px tablet:h-auto pc:w-390px pc:h-auto bg-white border rounded-10px overflow-y-auto"
            ref={FilterContainerRef}
          >
            <div className="flex flex-col w-full h-full gap-12px py-24px px-20px">
              <div className="flex items-center justify-between pb-18px">
                <p className="font-bold text-20px">상세 필터</p>
                <button onClick={() => setIsFilterOpen(false)}>
                  <IconCloseBlack />
                </button>
              </div>
              <LocationSection
                locations={SHOP_LOCATIONS}
                selectedLocations={selectedLocations}
                onLocationClick={handleLocationClick}
                onRemoveLocation={handleRemoveLocation}
              />
              <Divider />
              <DateSection startDate={startDate} setStartDate={setStartDate} />
              <Divider />
              <PriceSection
                inputPrice={inputPrice}
                onPriceChange={handlePriceChange}
              />
              <div className="flex justify-between mt-20px">
                <button
                  className="font-bold border text-custom-orange py-14px rounded-6px w-80px border-custom-orange"
                  onClick={handleResetClick}
                >
                  초기화
                </button>
                <button
                  className="px-4 py-2 text-white rounded-lg bg-custom-orange w-260px"
                  onClick={handleApplyFilter}
                >
                  적용하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
