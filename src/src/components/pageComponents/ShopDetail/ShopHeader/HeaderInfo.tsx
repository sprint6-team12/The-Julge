import { IconLocation } from '@/lib/utils/Icons';

interface shopDataProps {
  category: string;
  name: string;
  address1: string;
  description: string;
}

export default function HeaderInfo({
  category,
  name,
  address1,
  description,
}: shopDataProps) {
  return (
    <>
      <div className="flex flex-col gap-8px">
        <p className="font-bold text-custom-orange">{category}</p>
        <p className="font-bold text-28px">{name}</p>
      </div>
      <div className="flex items-center gap-6px">
        <IconLocation width="20" height="20" />
        <p className="text-gray50">{address1}</p>
      </div>
      <p>{description}</p>
    </>
  );
}
