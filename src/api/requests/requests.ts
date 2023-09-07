import { langToKeynode, TLanguage } from 'ostis-ui-lib';
import { ScAddr } from 'ts-sc-client';
import { client, request, scUtils } from '@api';
import { API_URL } from '@constants';
import { objectToFormData, snakeToCamelCase } from '@utils';

interface ITranslateResult {
  link: number;
}

type TFormat = 'format_scn_json';
type TLang = 'lang_ru';

export const translate = async (action: number, format: TFormat, lang: TLang) => {
  const keynodes = await scUtils.findKeynodes(format, lang);
  return request<ITranslateResult>({
    method: 'POST',
    url: `${API_URL}/api/question/answer/translate/`,
    data: objectToFormData({
      question: action,
      format: keynodes[snakeToCamelCase(format)].value,
      lang: keynodes[snakeToCamelCase(lang)].value,
    }),
  });
};

export const getContext = (args: number[]) => {
  const argsToUri = args.map((arg, ind) => `${ind}_=${arg}`).join(';');
  return request<number[]>({
    method: 'GET',
    url: `${API_URL}/api/context/?${argsToUri}`,
  });
};
