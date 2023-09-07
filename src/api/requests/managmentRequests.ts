import { request } from '@api';
import { API_URL } from '@constants';
import { IRequestConnection } from '@model/ManagmentPage';

export const getConnectionsList = (lang: number) => {
  return request({
    method: 'GET',
    url: `${API_URL}/api/connections`,
    params: {
      lang,
    },
  });
};

export const getConnectionById = (sc_addr: string, lang: number) => {
  return request({
    method: 'GET',
    url: `${API_URL}/api/connections/${sc_addr}`,
    params: {
      lang,
    },
  });
};

export const updateConnection = (sc_addr: string, changedConnection: IRequestConnection) => {
  return request({
    method: 'PUT',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    url: `${API_URL}/api/connections/${sc_addr}`,
    data: JSON.stringify(changedConnection),
  });
};
