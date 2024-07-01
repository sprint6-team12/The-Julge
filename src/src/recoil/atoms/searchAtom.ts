import { atom } from 'recoil';

const keywordDataState = atom<string>({
  key: 'keywordDataState',
  default: '',
});

export default keywordDataState;
