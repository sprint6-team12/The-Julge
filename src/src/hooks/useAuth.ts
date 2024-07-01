import { useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atoms/AuthAtom';

/**
 * 전역으로 다루는 user 상태를 업데이트 하기 위한 함수
 * @example 사용 예시
 * import { useAuth } from '@/hooks/useAuth';
 * const { setUser } = useAuth();
 * setUser(null, null, null, 'guest', false);
 *
 * @param token 유저 토큰 (string | null)
 * @param userId 유저 ID (string | null)
 * @param shopId 유저 가게 ID (string | null)
 * @param type 유저 타입 ('employee' | 'employer' | 'guest')
 * @param isLogin 로그인 상태 (boolean)
 */
export const useAuth = () => {
  const setUserState = useSetRecoilState(userState);

  const setUser = (
    token: string | null,
    userId: string | null,
    shopId: string | null,
    type: 'employee' | 'employer' | 'guest',
    isLogin: boolean
  ) => {
    setUserState({
      token,
      userId,
      shopId,
      type,
      isLogin,
    });
  };

  return { setUser };
};
