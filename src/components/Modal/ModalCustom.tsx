import ModalWrapper from '@/components/Modal/ModalWrapper';

function ModalCustom({ content }: { content: React.ReactNode | JSX.Element }) {
  return <ModalWrapper>{content}</ModalWrapper>;
}

export default ModalCustom;
