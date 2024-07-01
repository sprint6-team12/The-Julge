import { handleAxiosError } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface LoginData {
  email: string;
  password: string;
}

const authenticationAPI = {
  postToken: async (body: LoginData) => {
    try {
      const response = await axiosInstance.post(`/token`, body);
      return response.data; // 받아온 토큰 값
    } catch (error) {
      handleAxiosError(error);
    }
  },
};
export default authenticationAPI;
