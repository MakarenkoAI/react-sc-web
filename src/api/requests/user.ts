import { isAxiosError, request } from '@api';
import { API_URL } from '@constants';
import { IUser } from '@model/user';

export const getUsersList = () => {
  return request<IUser[]>({
    method: 'GET',
    url: `${API_URL}/api/users`,
  });
};

export const postNewUser = async (user: IUser) => {
  const res = await request({
    method: 'POST',
    url: `${API_URL}/api/users`,
    data: JSON.stringify({
      canEdit: `${user.canEdit}`,
      login: user.login,
      role: user.role,
    }),
  });

  if (isAxiosError(res)) return res;

  const scAddr = await res.data;

  return {
    ...user,
    canEdit: user.canEdit,
    sc_addr: scAddr.sc_addr,
  };
};

export const deleteUser = async (scAddr: number) => {
  return request({
    method: 'DELETE',
    url: `${API_URL}/api/users/${scAddr}`,
  });
};

export const putUser = async (user: IUser) => {
  return request({
    method: 'PUT',
    url: `${API_URL}/api/users/${user.sc_addr}`,
    data: JSON.stringify({
      role: user.role,
      canEdit: `${user.canEdit}`,
    }),
  });
};
