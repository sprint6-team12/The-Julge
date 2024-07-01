// import { useRouter } from 'next/router';
import Button from '@/components/Button/Button';
import {
  CancelApplicationModal,
  ProfileRegistrationModal,
} from '@/components/pageComponents/NoticeDetail/NoticeDetailModals';
import useModal from '@/hooks/useModal';
// import usePopup from '@/hooks/usePopup';

const NOTICE_DETAIL_BUTTON_PROPS = {
  open: {
    className: 'button_large_fill',
    disabled: false,
    children: '신청하기',
  },
  pending: {
    className: 'button_large',
    disabled: false,
    children: '취소하기',
  },
  closed: {
    className: 'button_large_fill',
    disabled: true,
    children: '신청불가',
  },
  employer: {
    className: 'button_large',
    disabled: false,
    children: '공고 편집하기',
  },
};

interface NoticeDetailCardButtonProps {
  noticeState: NoticeStatus;
  userType: UserType;
  userApplicationState: ApplicationStatus | null;
  apiRequestList?: { [key: string]: () => Promise<unknown> };
}

function NoticeDetailCardButton({
  noticeState,
  userType,
  userApplicationState,
  // apiRequestList = {},
}: NoticeDetailCardButtonProps) {
  // const router = useRouter();
  const { openModal } = useModal();
  // const { openPopup } = usePopup();

  let buttonProps;

  switch (true) {
    case noticeState === 'closed' || noticeState === 'passed':
      buttonProps = {
        ...NOTICE_DETAIL_BUTTON_PROPS.closed,
        onClick: () => {},
      };
      break;
    case userType === 'employee' && userApplicationState === 'pending':
      buttonProps = {
        ...NOTICE_DETAIL_BUTTON_PROPS.pending,
        onClick: () => {
          openModal('handleClickButtonGuest', CancelApplicationModal, {
            onConfirm: () => {
              // 취소 api 로직
              // 취소성공하면 팝업 띄우기
              // openPopup('CancelApplicationModal', '취소했어요', 3000);
            },
          });
        },
      };
      break;
    case userType === 'employer':
      buttonProps = {
        ...NOTICE_DETAIL_BUTTON_PROPS.employer,
        onClick: () => {
          // 편집페이지로 이동
          // router.push('/edit');
        },
      };
      break;
    default:
      buttonProps = {
        ...NOTICE_DETAIL_BUTTON_PROPS.open,
        onClick: () => {
          openModal('handleClickButtonGuest', ProfileRegistrationModal, {});
          // 신청 api 로직
          // 성공하면 팝업 띄우기
          // openPopup('ProfileRegistrationModal', '신청했어요', 3000);
        },
      };
  }

  return <Button {...buttonProps} />;
}

export default NoticeDetailCardButton;
