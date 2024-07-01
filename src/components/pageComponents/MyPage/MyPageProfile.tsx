import Button from '@/components/Button/Button';
import { UserInfo } from '@/lib/api/userAPI';
import { IconLocation, IconPhone } from '@/lib/utils/Icons';

export default function MyPageProfile({
  ProfileData,
  onClick,
}: {
  ProfileData: UserInfo;
  onClick: () => void;
}) {
  return (
    <div className="flex justify-between border-none rounded-12px w-full p-20px tablet:p-32px pc:p-32px bg-red10 mt-16px">
      <div className="flex flex-col gap-8px tablet:gap-12px">
        <div>
          <p className="text-custom-orange text-14px font-[700]">이름</p>
          <h2 className="text-24px font-[700] mt-8px">{ProfileData.name}</h2>
        </div>
        {ProfileData.phone && (
          <div className="flex items-center gap-6px text-gray50">
            <IconPhone />
            {ProfileData.phone}
          </div>
        )}
        {ProfileData.address && (
          <div className="flex items-center gap-6px text-gray50">
            <IconLocation />
            선호지역: {ProfileData.address}
          </div>
        )}
        <div className="mt-12px">{ProfileData.bio}</div>
      </div>
      <div className="w-108px tablet:w-169px pc:w-169px">
        <Button className="w-full button_medium_disActive" onClick={onClick}>
          편집하기
        </Button>
      </div>
    </div>
  );
}
