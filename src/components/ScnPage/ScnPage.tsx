import { useTranslate } from 'ostis-ui-lib';
import { useMatch } from 'react-router';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { Scn } from '@components/Scn';
import { routes } from '@constants';

import styles from './ScnPage.module.scss';

export const ScnPage = () => {
  const translate = useTranslate();
  const match = useMatch(routes.QUESTION);

  const question = match?.params.question;
  if (!question) return null;

  return (
    <div className={styles.wrapper}>
      <ErrorBoundary
        title={translate({
          ru: 'Ошибка загрузки компонента SCn-кода',
          en: 'Error loading SCn code',
        })}
        paragraph={translate({
          ru: 'Ошибка загрузки компонента SCn-кода',
          en: 'Error loading SCn code',
        })}
        shouldReturn={true}
      >
        <Scn question={Number(question)} />
      </ErrorBoundary>
    </div>
  );
};
