import { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { DEFAULT_COMMAND_PATH, DEFAULT_COMMAND_SYSTEM_ID, routes } from '@constants';
import { selectFormat } from '@store/commonSlice';
import { selectRequests } from '@store/requestHistorySlice';

import { useSelector } from './redux';

export const useScNavigation = () => {
  const format = useSelector(selectFormat);

  const [firstRequest] = useSelector(selectRequests);

  const navigate = useNavigate();

  const goToPrevHistoryItem = useCallback(() => {
    if (!firstRequest) return navigate(DEFAULT_COMMAND_PATH);
    navigate(generatePath(routes.QUESTION, { question: String(firstRequest.question), format }));
  }, [firstRequest, navigate, format]);

  const goToActiveFormatCommand = useCallback(
    (addr: string | number, command: any = DEFAULT_COMMAND_SYSTEM_ID) => {
      navigate(generatePath(routes.COMMAND, { addr: String(addr), commandAddr: command, format }));
    },
    [format, navigate],
  );

  const goToActiveFormatQuestion = useCallback(
    (question: string) => {
      navigate(generatePath(routes.QUESTION, { question, format }));
    },
    [format, navigate],
  );

  return { goToActiveFormatCommand, goToActiveFormatQuestion, goToPrevHistoryItem };
};
