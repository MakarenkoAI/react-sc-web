import { request } from '@api';
import { API_URL } from '@constants';
import { objectToFormData } from '@utils';

interface IDoComandResult {
  question: number;
}

export const doCommand = (cmdAddr: number, ...args: number[]) => {
  const argsObj = args.reduce(
    (acc, arg, ind) => ({
      ...acc,
      [`${String(ind)}_`]: String(arg),
    }),
    {} as Record<string, string>,
  );

  return request<IDoComandResult>({
    method: 'POST',
    url: `${API_URL}/api/cmd/do/`,
    data: objectToFormData({
      cmd: cmdAddr,
      ...argsObj,
    }),
  });
};
