import { useCallback, useEffect, useState } from 'react';
import { generatePath, useMatch, useNavigate } from 'react-router';
import { appendHistoryItem } from '@api/requests/userHistory';
import { isAxiosError } from '@api/utils';
import { routes, SPINER_COLOR } from '@constants';
import { useDispatch, useErrorToast, useSelector } from '@hooks';
import { selectArgAddrs } from '@store';
import { selectUserAddr } from '@store/commonSlice';
import { addRequest } from '@store/requestHistorySlice';
import { Spinner, useTranslate } from 'ostis-ui-lib';

import styles from './Command.module.scss';

import { debouncedExecuteCommand } from './utils';

const Command = () => {
  const [isLoading, setIsLoading] = useState(false);

  const match = useMatch(routes.COMMAND);

  const userAddr = useSelector(selectUserAddr);
  const args = useSelector(selectArgAddrs);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addError = useErrorToast();

  const translate = useTranslate();

  const appendToHistory = useCallback(
    async (question: number) => {
      if (!userAddr) return;
      const addRes = await appendHistoryItem(question, userAddr);
      if (isAxiosError(addRes))
        addError(
          translate({
            ru: `Не удалось сохранить вопрос ${question} в историю`,
            en: `It's failed to save question ${question} in history`,
          }),
        );
    },
    [addError, userAddr, translate],
  );

  const executeCommand = useCallback(async () => {
    if (!match) return;
    const { commandAddr, format, addr } = match.params;
    if (!commandAddr || !format || !addr) return;

    setIsLoading(true);
    const { res: cmdRes, isLast } = await debouncedExecuteCommand({ addr, commandAddr, args });

    if (isAxiosError(cmdRes)) {
      setIsLoading(false);
      return addError(translate({ ru: 'Не удалось выполнить запрос', en: `It's failed to get request` }));
    }

    const question = cmdRes.data.question;

    await appendToHistory(question);

    dispatch(addRequest({ question }));

    if (!isLast) return;

    setIsLoading(false);
    navigate(generatePath(routes.QUESTION, { format, question: String(question) }), { replace: true });
  }, [addError, appendToHistory, args, dispatch, match, navigate, translate]);

  useEffect(() => {
    executeCommand();
  }, [executeCommand]);

  if (isLoading) return <Spinner className={styles.spiner} appearance={SPINER_COLOR} />;

  return null;
};

export default Command;
