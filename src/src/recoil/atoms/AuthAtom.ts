import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface User {
  token: string | null;
  userId: string | null;
  shopId: string | null;
  type: 'employee' | 'employer' | 'guest';
  isLogin: boolean;
}

export const userState = atom<User>({
  key: 'userState',
  default: {
    token: null,
    userId: null,
    shopId: null,
    type: 'guest',
    isLogin: false,
  },
  effects_UNSTABLE: [persistAtom],
});
