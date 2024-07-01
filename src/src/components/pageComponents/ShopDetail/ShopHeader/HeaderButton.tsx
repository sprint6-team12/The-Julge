import LinkButton from '@/components/Button/LinkButton';

export default function HeaderButton() {
  return (
    <>
      <LinkButton
        className="w-full text-center button_medium_disActive"
        href="/" // 가게 정보 등록 페이지로 가게정보 props 내려줘야할듯
      >
        편집하기
      </LinkButton>
      <LinkButton
        className="w-full text-center button_medium_active"
        href="/" // 가게 정보 등록 페이지
      >
        공고 등록하기
      </LinkButton>
    </>
  );
}
