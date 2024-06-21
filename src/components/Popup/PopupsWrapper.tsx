import React from 'react';
import { useRecoilValue } from 'recoil';
import popupsDataState from '@/recoil/atoms/PopupAtom';
import Popup from './Popup';

function PopupsWrapper() {
  const popupsData = useRecoilValue(popupsDataState);
  return (
    <div className="fixed flex flex-col gap-8px bottom-30px right-1/2 translate-x-1/2 z-popup">
      {popupsData.map(({ id, message, onClose }) => (
        <Popup key={id} message={message} onClose={onClose} />
      ))}
    </div>
  );
}

export default PopupsWrapper;
