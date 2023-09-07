import { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router';
import { DEFAULT_COMMAND_PATH, routes } from '@constants';
import { selectRequests } from '@store/requestHistorySlice';

import { useSelector } from './redux';

export const useBackNavigation = () => {
  const requests = useSelector(selectRequests);
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    if (requests.length < 2) navigate(DEFAULT_COMMAND_PATH);
    navigate(
      generatePath(routes.QUESTION, { question: String(requests[1].question), format: 'scn' }),
    );
  }, [navigate, requests]);

  return { goBack };
};
