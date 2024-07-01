import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import modalsDataState from '@/recoil/atoms/ModalAtom';

export interface ModalProps {
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  [key: string]: unknown;
}

const useModal = () => {
  const [modalsData, setModalsData] = useRecoilState(modalsDataState);

  const openModal = useCallback(
    (id: string, Component: React.ComponentType, props?: ModalProps) => {
      setModalsData((prevModals) => {
        // 중복 모달 방지
        if (prevModals.some((modal) => modal.id === id)) return prevModals;

        return [
          ...prevModals,
          {
            id,
            Component,
            props: { ...props, onClose: () => closeModal(id) },
            isOpen: true,
          },
        ];
      });
    },
    [setModalsData]
  );

  const closeModal = useCallback(
    (id: string) => {
      setModalsData((prevModals) =>
        prevModals.filter((modal) => modal.id !== id)
      );
    },
    [setModalsData]
  );

  return { modalsData, openModal, closeModal };
};

export default useModal;
