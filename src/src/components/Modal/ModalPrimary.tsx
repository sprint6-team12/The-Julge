import Button from '@/components/Button/Button';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import { IconCheck, IconExclamationMark } from '@/lib/utils/Icons';

type ModalOptionType = 'confirm' | 'actions';

function ModalPrimaryIcon(optionType: ModalOptionType) {
  return optionType === 'actions' ? (
    <IconCheck className="mx-auto mb-16px" />
  ) : (
    <IconExclamationMark className="mx-auto mb-16px" />
  );
}
interface ModalPrimaryProps {
  className?: string;
  optionType: ModalOptionType;
  Icon?: React.ElementType;
  content?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 *
 * @param {'confirm' | 'actions'} optionType - confirm(확인버튼) | actions(예, 아니오 버튼)
 * @param {React.ComponentType} Icon - 아이콘 컴포넌트 (기본값: confirm-! actions-check)
 * @param {string} content - 텍스트 컨텐츠 (기본값: 정말 실행하시겠습니까?)
 * @param {() => void} onClose - useModal 사용 시 자동으로 추가되는 closeModal 함수
 * @param {() => void} onConfirm - 확인/예 버튼 클릭 시 실행될 함수
 * @param {() => void} onCancel - 아니오 버튼 클릭 시 실행될 함수 (optionType이 'actions'일 때 필요)
 *
 * @returns
 */
function ModalPrimary({
  className,
  optionType,
  Icon,
  content = '정말 실행하시겠습니까?',
  confirmButtonText,
  cancelButtonText,
  onClose = () => {},
  onConfirm = () => {},
  onCancel = () => {},
}: ModalPrimaryProps) {
  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  const handleCancel = () => {
    onClose();
    onCancel();
  };

  const IconComponent = Icon ? <Icon /> : ModalPrimaryIcon(optionType);
  const ButtonsComponent = (
    <>
      {optionType === 'actions' && (
        <Button className="button_medium" onClick={handleCancel}>
          {cancelButtonText || '아니요'}
        </Button>
      )}
      <Button className="button_medium_fill" onClick={handleConfirm}>
        {confirmButtonText || optionType === 'actions' ? '예' : '확인'}
      </Button>
    </>
  );

  return (
    <ModalWrapper>
      <div
        className={`flex-center flex-col min-w-[298px] min-h-[183px] rounded-12px bg-white p-24px ${className}`}
      >
        {IconComponent}
        <p className="text-center">{content}</p>
        <div className="flex-center gap-8px mt-24px [&>button]:w-80px [&>button]:p-0">
          {ButtonsComponent}
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ModalPrimary;
