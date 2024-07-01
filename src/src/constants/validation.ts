export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const PASSWORD_MIN_LENGTH = 8;

export const ERROR_MESSAGES = {
  emailRequired: '이메일을 입력해주세요.',
  invalidEmail: '유효한 이메일 주소를 입력해주세요.',
  passwordRequired: '비밀번호를 입력해주세요.',
  passwordTooShort: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
};
