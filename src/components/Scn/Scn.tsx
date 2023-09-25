import { IScnNode, Scn as ScnBase, useToast, useTranslate } from 'ostis-ui-lib';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { doCommand } from '@api/requests/command';
import { getScnTree } from '@api/requests/scn';
import { scUtils } from '@api/sc';
import { isAxiosError } from '@api/utils';
import { Button } from '@components/Button';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { Notification } from '@components/Notification';
import {
  DEFAULT_COMMAND_PATH,
  DEFAULT_COMMAND_SYSTEM_ID,
  scgUrl,
  TIMEOUT,
  TIMEOUT_TOAST_ID,
} from '@constants';
import { useErrorToast } from '@hooks/useErrorToast';
import { useLazyTimeout } from '@hooks/useTimeout';

import styles from './Scn.module.scss';
import boundaryStyle from '../ErrorBoundary/ErrorBoundary.module.scss';
import ArrowIcon from '@assets/images/goBack.svg';

const timeoutText = {
  ru: (
    <>
      Похоже, ответ на ваш вопрос содержит большое количество связей и его загрузка может
      выполняться дольше обычного.
      <span className={styles.waitText}>Пожалуйста, подождите...</span>
    </>
  ),
  en: (
    <>
      Your answer contains a large number of links, loading may take more time.
      <span className={styles.waitText}>Please wait...</span>
    </>
  ),
};

interface IProps {
  question: number;
}

export const Scn = ({ question }: IProps) => {
  const [tree, setTree] = useState<IScnNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRequestCountRef = useRef(0);

  const addError = useErrorToast();
  const { addToast, removeToast } = useToast();

  const translate = useTranslate();
  const navigate = useNavigate();

  const addTimeoutToast = () => {
    addToast(
      <Notification
        type="warning"
        title={{ ru: 'Загрузка большого ответа', en: 'Loading complex answer' }}
        // @ts-ignore
        text={timeoutText}
      />,
      {
        position: 'bottomRight',
        id: TIMEOUT_TOAST_ID,
      },
    );
  };

  const { clearTimeout, setTimeout } = useLazyTimeout(addTimeoutToast, TIMEOUT);

  const onRequestStarted = () => {
    setIsLoading(true);
    setTree(null);
  };

  const renderRequestPanel = () => {
    return null;
  };

  const resetTimeoutToast = useCallback(() => {
    timeoutRequestCountRef.current = 0;
    removeToast(TIMEOUT_TOAST_ID);
    clearTimeout();
  }, [removeToast, clearTimeout]);

  const requestScn = useCallback(async () => {
    setTimeout();
    const scnRes = await getScnTree(question, onRequestStarted);

    if (!scnRes) {
      setTree(null);
      setIsLoading(false);
      clearTimeout();
      return;
    }

    if (!isAxiosError(scnRes)) {
      resetTimeoutToast();
      setTree(scnRes.tree);
      setIsLoading(false);
      return;
    }
    const isTimeoutError =
      scnRes.response?.status === 404 &&
      scnRes.response.data === 'Timeout waiting for answer translation';
    if (!isTimeoutError) {
      resetTimeoutToast();
      return addError({ ru: 'Не удалось получить SCn', en: `It's failed to get SCn` });
    }
    timeoutRequestCountRef.current++;
    requestScn();
  }, [setTimeout, question, resetTimeoutToast, addError, translate, clearTimeout]);

  const onAskQuestion = async (addr: number) => {
    const { uiMenuViewFullSemanticNeighborhood } =
      await scUtils.findKeynodes(DEFAULT_COMMAND_SYSTEM_ID);
    const cmdRes = await doCommand(uiMenuViewFullSemanticNeighborhood.value, addr);

    if (isAxiosError(cmdRes)) {
      setIsLoading(false);
      addError({ ru: 'Не удалось выполнить запрос', en: 'Failed to handle the request' });
      return null;
    }
    return cmdRes.data.question;
  };

  useEffect(() => {
    requestScn();
  }, [requestScn]);

  useEffect(() => {
    return resetTimeoutToast;
  }, [resetTimeoutToast]);

  if (!tree && !isLoading)
    return (
      <div className={boundaryStyle.wrap}>
        <h4>{translate({ ru: 'Понятие было удалено', en: 'Element was deleted' })}</h4>
        <Button
          appearance="secondaryAction"
          className={boundaryStyle.backButton}
          onClick={() => {
            navigate(DEFAULT_COMMAND_PATH);
          }}
        >
          <ArrowIcon />
          {translate({ ru: 'Вернуться на главную страницу', en: 'Go back to main page' })}
        </Button>
      </div>
    );
  return (
    <ScnBase
      tree={tree}
      scgUrl={scgUrl}
      isLoading={isLoading}
      renderRequestPanel={renderRequestPanel}
      onAskQuestion={onAskQuestion}
      question={question}
    />
  );
};
