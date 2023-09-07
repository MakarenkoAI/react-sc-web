import { langToKeynode, snakeToCamelCase, TLanguage } from 'ostis-ui-lib';
import { scUtils } from '@api/sc';

export const getLang = async (lang: TLanguage) => {
  const keynodes = await scUtils.findKeynodes(langToKeynode[lang]);
  const foundLang = keynodes[snakeToCamelCase(langToKeynode[lang])];
  return foundLang.value;
};
