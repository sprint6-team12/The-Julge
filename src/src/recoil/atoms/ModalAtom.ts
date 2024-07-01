import { atom } from 'recoil';

export type ModalDataType = {
  id: string;
  Component: React.ComponentType;
  props: { [key: string]: unknown };
  isOpen: boolean;
};

const modalsDataState = atom<ModalDataType[]>({
  key: 'modalsDataState',
  default: [],
});

export default modalsDataState;
