import {
  IconEnvelopeSquare,
  IconFacebookSquare,
  IconInstagram,
} from '@/lib/utils/Icons';

export default function Footer() {
  return (
    <footer className="flex justify-between p-[20px] tablet:p-[30px] pc:px-[238px] py-[37px] bg-gray10">
      <div className="flex flex-col gap-[40px] tablet:flex-row pc:flex-row tablet:basis-1/2 pc:basis-1/2 tablet:justify-between pc:justify-between">
        <span className="order-3 tablet:order-none pc:order-none font-normal text-[16px] text-gray50">
          @codeit - 2023
        </span>
        <div className="flex items-center gap-[40px]">
          <span className="font-normal text-[16px] text-gray50">
            Privacy Policy
          </span>
          <span className="font-normal text-[16px] text-gray50">FAQ</span>
        </div>
      </div>
      <div className="flex gap-[12px]">
        <IconEnvelopeSquare aria-label="이메일" className="h-[24px] w-[24px]" />
        <IconFacebookSquare
          aria-label="페이스북"
          className="h-[24px] w-[24px]"
        />
        <IconInstagram aria-label="인스타그램" className="h-[24px] w-[24px]" />
      </div>
    </footer>
  );
}
