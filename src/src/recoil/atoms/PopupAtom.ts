import { atom } from 'recoil';

export type PopupDataType = {
  id: string;
  message: string;
  onClose: (() => void) | null;
};

const popupsDataState = atom<PopupDataType[]>({
  key: 'popupsDataState',
  default: [],
});

export default popupsDataState;
