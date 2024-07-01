import Modal from '@/components/Modal/ModalPrimary';

const modalSizeStyle = 'w-[30vw] aspect-video';

export function ProfileRegistrationModal({ ...rest }) {
  return Modal({
    content: '내 프로필을 먼저 등록해주세요',
    optionType: 'confirm',
    className: modalSizeStyle,
    ...rest,
  });
}

export function CancelApplicationModal({ ...rest }) {
  return Modal({
    content: '신청을 취소하시겠어요?',
    optionType: 'actions',
    confirmButtonText: '취소하기',
    className: modalSizeStyle,
    ...rest,
  });
}

export function RejectApplicationModal({ ...rest }) {
  return Modal({
    content: '신청을 거절하시겠어요?',
    optionType: 'actions',
    confirmButtonText: '거절하기',
    className: modalSizeStyle,
    ...rest,
  });
}

export function ConfirmApplicationModal({ ...rest }) {
  return Modal({
    content: '신청을 승인하시겠어요?',
    optionType: 'actions',
    confirmButtonText: '승인하기',
    className: modalSizeStyle,
    ...rest,
  });
}
