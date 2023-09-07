import { TLanguage, useLanguage } from 'ostis-ui-lib';
import { useMemo } from 'react';
import * as yup from 'yup';

type TFuncProps = (lang: TLanguage) => yup.AnyObjectSchema;
type TProps = yup.AnyObjectSchema | TFuncProps;

export const useShema = (shema: TProps) => {
  const lang = useLanguage();

  return useMemo(() => (typeof shema === 'function' ? shema(lang) : shema), [lang, shema]);
};
