export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const PASSWORD_MIN_LENGTH = 8;

export const ERROR_MESSAGES = {
  emailRequired: '이메일을 입력해주세요.',
  invalidEmail: '유효한 이메일 주소를 입력해주세요.',
  passwordRequired: '비밀번호를 입력해주세요.',
  passwordTooShort: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
};
export const ERROR_MESSAGES_SHOP = {
  shopNameRequired: '가게 이름을 작성해주세요',
  categoryRequired: '분류를 선택해주세요',
  addressRequired: '주소를 선택해주세요',
  addressDetailRequired: '상세 주소를 작성해주세요',
  hourlyPayRequired: '기본 시급을 작성해주세요',
};
