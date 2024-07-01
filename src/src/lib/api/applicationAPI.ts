import { handleAxiosError } from './ApiError';
import { axiosInstance } from './axiosInstance';

interface ShopApplyData {
  shop_id: string;
  notice_id: string;
  application_id?: string;
  offset?: number;
  limit?: number;
}

interface UserApplyData {
  user_id: string;
  offset: number;
  limit: number;
}

const applicationAPI = {
  getShopApply: async ({
    shop_id,
    notice_id,
    offset,
    limit,
  }: ShopApplyData) => {
    const params = {
      offset,
      limit,
    };
    try {
      const response = await axiosInstance.get(
        `/shops/${shop_id}/notices/${notice_id}/applications`,
        { params }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  postShopApply: async ({ shop_id, notice_id }: ShopApplyData) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const body = {
      shop_id,
      notice_id,
    };
    try {
      const response = await axiosInstance.post(
        `/shop/${shop_id}/notices/${notice_id}/applications`,
        { body },
        { headers }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  putShopApply: async (href: string, applyStatus: string) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    const body = { status: applyStatus };
    try {
      const response = await axiosInstance.put(href, { body }, { headers });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  getUserApply: async ({ user_id, offset, limit }: UserApplyData) => {
    const params = {
      user_id,
      offset,
      limit,
    };
    // 로컬스토리지의 토큰을 사용하여 인증하는 경우
    // const headers = {
    //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    // };
    try {
      const response = await axiosInstance.get(
        `/users/${user_id}/applications`,
        {
          params,
          // headers
        }
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default applicationAPI;
