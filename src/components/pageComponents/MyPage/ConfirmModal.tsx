import ModalPrimary from '@/components/Modal/ModalPrimary';

export default function ConfirmModal({ ...rest }) {
  return (
    <ModalPrimary
      optionType="confirm"
      content="등록이 완료되었습니다."
      {...rest}
    />
  );
}
