import axios from 'axios';
import { handleAxiosError } from '@/lib/api/ApiError';

type PromiseAPIFunction = (config?: Record<string, unknown>) => Promise<any>;

type ApiRequestListType = {
  notice: Record<string, PromiseAPIFunction>;
  user: Record<string, PromiseAPIFunction>;
  shop: Record<string, PromiseAPIFunction>;
  application: Record<string, PromiseAPIFunction>;
};

const useTestLink = (links: Link[]) => {
  const apiRequestList: ApiRequestListType = {
    notice: {},
    user: {},
    shop: {},
    application: {},
  };

  links.map(({ rel, description, method, href }) => {
    let index: keyof ApiRequestListType | undefined = undefined;

    if (description.includes('공고')) index = 'notice';
    else if (description.includes('사용자')) index = 'user';
    else if (description.includes('가게')) index = 'shop';
    else if (description.includes('지원')) index = 'application';

    if (!index) return;

    apiRequestList[index][rel] = async (config = {}) => {
      const combinedConfig = {
        baseURL: 'https://bootcamp-api.codeit.kr/',
        url: href,
        method: method.toLowerCase(),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userJWT')}`,
        },
        withCredentials: false,
        ...config,
      };

      try {
        const response = await axios.request(combinedConfig);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    };
  });

  return apiRequestList;
};

export default useTestLink;
