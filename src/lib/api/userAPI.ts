import { handleAxiosError } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface UserInput {
  email: string;
  password: string;
  type?: string;
}

export interface UserInfo {
  name: string;
  phone: string;
  address?: string;
  bio?: string;
}

const userAPI = {
  getUserData: async (user_id: string) => {
    try {
      const response = await axiosInstance.get(`/users/${user_id}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  postUserData: async (body: UserInput) => {
    try {
      const response = await axiosInstance.post(`/users`, body);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  putUserData: async (
    user_id: string,
    token = localStorage.getItem('token'),
    body: UserInfo
  ) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.put(`/users/${user_id}`, body, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default userAPI;
