import classNames from 'classnames';
import { ScLangText, ScTag } from 'ostis-ui-lib';
import { useMatch } from 'react-router';
import { routes } from '@constants';
import { useScNavigation } from '@hooks/useScNavigation';
import { IRequest } from '@store/requestHistorySlice';

import styles from './HistoryPanel.module.scss';

import { Skeleton } from './Skeleton';

interface IProps {
  isLoading: boolean;
  requests: IRequest[];
}

export const HistoryPanel = (props: IProps) => {
  const match = useMatch(routes.QUESTION);

  const { goToActiveFormatQuestion } = useScNavigation();

  const onBtnClick = (question: string) => () => {
    goToActiveFormatQuestion(question);
  };

  return (
    <>
      {!props.isLoading && (
        <div className={styles.historyPanelWrap}>
          {props.requests.map(({ question }, ind) => (
            <ScTag
              key={ind}
              as="span"
              className={classNames(styles.historyBtn, {
                [styles.historyBtnActive]: String(question) === match?.params.question,
              })}
              addr={question}
              onClick={onBtnClick(String(question))}
            >
              <ScLangText addrOrSystemId={question} defaultText={String(question)} />
            </ScTag>
          ))}
        </div>
      )}
      {props.isLoading && <Skeleton />}
    </>
  );
};
