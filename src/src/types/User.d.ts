type UserType = 'guest' | 'employer' | 'employee' | null;

interface User {
  id: string;
  email: string;
  type: UserType;
  name?: string; // optional
  phone?: string; // optional
  address?: string; // optional
  bio?: string; // optional
  shop?: ShopData | null;
  // api문서에 또는 null이라고 되어있어서 사장님/유저 타입 따로 안빼고 이렇게 작성했습니다..
  // 사용하시다가 오류나면 맘대로 수정수정
}

interface UserData {
  item: User;
  href?: string;
}
