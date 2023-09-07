import classNames from 'classnames';
import { useTranslate } from 'ostis-ui-lib';
import { useLocation } from 'react-router';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { Scg } from '@components/Scg';

import styles from './ScgPage.module.scss';

export const ScgPage = () => {
  const location = useLocation();

  const translate = useTranslate();

  const scgMatch = location.pathname.match(/^\/q\/(\d+)\/scg$/);
  const question = scgMatch ? Number(scgMatch[1]) : undefined;

  const pathArray = location.pathname.split('/');
  return (
    <ErrorBoundary
      title={translate({ ru: 'Ошибка загрузки компонента SCg-кода', en: 'Error loading SCg' })}
      paragraph={translate({
        ru: 'Похоже, произошла ошибка при получении ответа на ваш вопрос',
        en: 'Looks like an error occured',
      })}
      advice={translate({
        ru: 'Пожалуйста, перезагрузите страницу или вернитесь к предыдущему понятию',
        en: 'Please, reload the page or go back',
      })}
      className={classNames(styles.boundary, {
        [styles.none]: pathArray[pathArray.length - 1] !== 'scg',
      })}
      shouldReturn
    >
      <Scg className={styles.scg} question={question} show={!!scgMatch} />
    </ErrorBoundary>
  );
};
