import HeaderButton from './HeaderButton';
import ShopImageSection from './HeaderImage';
import HeaderInfo from './HeaderInfo';

export default function ShopHeader({ shopData }: { shopData: Shop }) {
  return (
    <>
      <ShopImageSection imageUrl={shopData.imageUrl} name={shopData.name} />
      <div className="flex flex-col justify-between pt-8px w-full pc:w-346px h-348px">
        <div className="flex flex-col gap-12px">
          <HeaderInfo
            category={shopData.category}
            name={shopData.name}
            address1={shopData.address1}
            description={shopData.description}
          />
        </div>
        <div className="flex items-center justify-between gap-8px">
          <HeaderButton />
        </div>
      </div>
    </>
  );
}
