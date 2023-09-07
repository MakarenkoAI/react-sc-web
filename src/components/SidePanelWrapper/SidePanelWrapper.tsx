import { DecompositionProvider, useLanguage, useTranslate } from 'ostis-ui-lib';
import { FC, ReactNode, useCallback } from 'react';
import {
  addDecompositionItem,
  deleteDecompositionItem,
  editDecompositionItem,
  getDecomposition,
} from '@api/requests/decomposition';
import { isAxiosError } from '@api/utils';
import { useErrorToast } from '@hooks/useErrorToast';
import { IDecompositionItem } from '@model/model';

export interface IProps {
  children?: ReactNode;
}

export const SidePanelWrapper: FC<IProps> = ({ children }) => {
  const addError = useErrorToast();

  const lang = useLanguage();
  const translate = useTranslate();

  const getDecompositionCallBack = useCallback(async () => {
    const res = await getDecomposition(lang);

    if (!res) {
      addError(
        translate({
          ru: 'Не удалось обновить панель декомпозиции',
          en: 'Decomposition panel is not updated',
        }),
      );
      return null;
    }

    return res;
  }, [addError, translate, lang]);

  const addDecompositionItemCallBack = useCallback(
    async (id: string, data: IDecompositionItem): Promise<number | null> => {
      const res = await addDecompositionItem(id, { ...data, lang });

      if (isAxiosError(res)) {
        addError(translate({ ru: 'Не удалось добавить элемент', en: 'Element is not added' }));
        return null;
      }

      return res.data.scAddr;
    },
    [addError, translate, lang],
  );

  const editDecompositionItemCallback = useCallback(
    async (id: number, value: string) => {
      const res = await editDecompositionItem(id, value, lang);

      if (!res) {
        addError(translate({ ru: 'Не удалось обновить элемент', en: 'Element is not updated' }));
        return null;
      }

      return res;
    },
    [addError, lang, translate],
  );

  const deleteDecompositionItemCallback = useCallback(
    async (parentID: string, id: string): Promise<number | null> => {
      const deleteRes = await deleteDecompositionItem(parentID, id);

      if (isAxiosError(deleteRes)) {
        addError(translate({ ru: 'Не удалось удалить элемент', en: 'Element is not deleted' }));
        return null;
      }

      return deleteRes.data.sc_addr;
    },
    [addError, translate],
  );

  return (
    <>
      <DecompositionProvider
        getDecompositionCallback={getDecompositionCallBack}
        addDecompositionItemCallBack={addDecompositionItemCallBack}
        editDecompositionItemCallback={editDecompositionItemCallback}
        deleteDecompositionItemCallback={deleteDecompositionItemCallback}
      >
        {children}
      </DecompositionProvider>
    </>
  );
};
