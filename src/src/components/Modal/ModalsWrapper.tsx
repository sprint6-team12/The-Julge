import React from 'react';
import { useRecoilValue } from 'recoil';
import modalsDataState from '@/recoil/atoms/ModalAtom';

function ModalsWrapper() {
  const modalsData = useRecoilValue(modalsDataState);
  return (
    <>
      {modalsData.map((modal) => (
        <React.Fragment key={modal.id}>
          {modal.isOpen && <modal.Component {...modal.props} />}
        </React.Fragment>
      ))}
    </>
  );
}

export default ModalsWrapper;
