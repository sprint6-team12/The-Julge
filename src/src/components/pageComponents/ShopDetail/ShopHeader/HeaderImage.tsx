import Image from 'next/image';

export default function ShopImageSection({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-12px w-full h-auto aspect-[1.75/1] pc:w-[539px] pc:h-358px pc:aspect-[1.5/1]">
      <Image src={imageUrl} alt={name} fill />
    </div>
  );
}
