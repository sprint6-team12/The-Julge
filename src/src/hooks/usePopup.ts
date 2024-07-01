import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import popupsDataState from '@/recoil/atoms/PopupAtom';

const usePopup = () => {
  const [popupsData, setPopupsData] = useRecoilState(popupsDataState);

  const openPopup = useCallback(
    (id: string, message: string, duration?: number) => {
      // duration 없을경우 삭제 버튼 추가
      const handleClose = duration ? null : () => closePopup(id);

      setPopupsData((prevPopups) => {
        // 중복 팝업 방지
        if (prevPopups.some((popup) => popup.id === id)) return prevPopups;
        return [...prevPopups, { id, message, onClose: handleClose }];
      });

      if (duration) {
        setTimeout(() => {
          closePopup(id);
        }, duration);
      }

      return id;
    },
    [setPopupsData]
  );

  const closePopup = useCallback(
    (id: string) => {
      setPopupsData((prevPopups) =>
        prevPopups.filter((popup) => popup.id !== id)
      );
    },
    [setPopupsData]
  );

  return { popupsData, openPopup, closePopup };
};

export default usePopup;
