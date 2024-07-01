import axios from 'axios';

class APIError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'APIError';
  }
}

const ErrorMessages: { [key: string]: string } = {
  400: '잘못된 형식의 요청입니다. 입력값을 확인해주세요.',
  401: '로그인이 필요합니다. 올바른 인증 정보를 제공해주세요.',
  403: '권한이 없습니다. 접근이 거부되었습니다.',
  404: '요청한 데이터를 찾을 수 없습니다. 다시 시도해주세요.',
  409: '이미 존재하는 데이터가 있습니다. 다른 값을 사용해주세요.',
  500: '서버에서 응답을 받아오지 못했습니다. 잠시 후 다시 시도해주세요.',
  default:
    '예상치 못한 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의하세요.',
};

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage =
        data.message || ErrorMessages[status] || ErrorMessages.default;
      throw new APIError(errorMessage, status);
    } else {
      // 서버 응답이 없는 경우 (네트워크 오류 등)
      throw new Error('서버에서 응답을 받아오지 못했습니다.');
    }
  } else {
    throw new Error('서버에서 네트워크가 오지 않습니다.');
  }
};
