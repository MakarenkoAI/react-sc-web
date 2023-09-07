import classNames from 'classnames';
import { TLanguage, TTexts, useLanguage } from 'ostis-ui-lib';
import { ReactNode } from 'react';

import CloseIcon from '@assets/images/close.svg';
import ErrorIcon from '@assets/images/errorIcon.svg';
import SuccessIcon from '@assets/images/successIcon.svg';
import WarningIcon from '@assets/images/warningIcon.svg';
import styles from './Notification.module.scss';

const getTargetText = (text: TNotificationText, lang: TLanguage): string | ReactNode => {
  if (typeof text === 'function') return text(lang);
  if (typeof text === 'object' && (text as TTexts)?.ru) return (text as TTexts)[lang];
  return text as string;
};

type TRenderText = (lang: TLanguage) => ReactNode;
export type TNotificationText = ReactNode | TRenderText | TTexts;

interface IProps {
  type: 'warning' | 'success' | 'error';
  title?: TNotificationText;
  text?: TNotificationText;
  onClose?: () => void;
}

export const Notification = ({ type, title = '', text, onClose }: IProps) => {
  const lang = useLanguage();

  return (
    <div
      className={classNames(styles.notification, {
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
        [styles.warning]: type === 'warning',
      })}
    >
      <div className={styles.center}>
        <div className={styles.main}>
          {type === 'success' && <SuccessIcon className={styles.icon} />}
          {type === 'warning' && <WarningIcon className={styles.icon} />}
          {type === 'error' && <ErrorIcon className={styles.icon} />}
          <div className={styles.title}>{getTargetText(title, lang)}</div>
          {onClose && (
            <div
              className={classNames(styles.close, { [styles.closeWithText]: text })}
              onClick={onClose}
            >
              <CloseIcon />
            </div>
          )}
        </div>
        {text && <div className={styles.text}>{getTargetText(text, lang)}</div>}
      </div>
    </div>
  );
};
