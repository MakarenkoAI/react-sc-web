import { generatePath, Navigate } from 'react-router';
import { DEFAULT_COMMAND_PATH, routes } from '@constants';
import { useSelector } from '@hooks';
import { selectRequests } from '@store/requestHistorySlice';

export const RootRedirect = () => {
  const [lastRequest] = useSelector(selectRequests);

  if (lastRequest) {
    return (
      <Navigate
        to={generatePath(routes.QUESTION, {
          question: String(lastRequest.question),
          format: 'scn',
        })}
        replace
      />
    );
  }
  return <Navigate to={DEFAULT_COMMAND_PATH} replace />;
};
