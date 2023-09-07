import { request } from '@api';
import { API_URL } from '@constants';
import { IRequestBody } from '@model/requests';

export const postNewRequest = (data: IRequestBody) => {
  return request({
    method: 'POST',
    url: `${API_URL}/api/query`,
    data,
  });
};

export const deleteRequest = (scAddr: number) => {
  return request({
    method: 'DELETE',
    url: `${API_URL}/api/query/${scAddr}`,
  });
};

export const updateRequest = (changedRequest: IRequestBody, scAddr: number) => {
  return request({
    method: 'PUT',
    url: `${API_URL}/api/query/${scAddr}`,
    data: changedRequest,
  });
};
