import axios from 'axios';
import { setUser, setUserStatus } from '@store/commonSlice';
import { store } from '@store/index';
import { deleteCookie } from '@utils';

export const interceptorsInit = () => {
  axios.interceptors.response.use(undefined, (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      deleteCookie('session_key');
      store.dispatch(setUser(null));
      store.dispatch(
        setUserStatus({
          isLoading: false,
          isError: false,
          isLoadingByToken: false,
          isErrorByToken: false,
        }),
      );
    }

    return Promise.reject(error);
  });
};
