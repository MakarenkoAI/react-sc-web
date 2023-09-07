import classNames from 'classnames';
import { TLanguage, useLanguageContext } from 'ostis-ui-lib';

import styles from './language.module.scss';

export const Language = () => {
  const { lang, setLang } = useLanguageContext();

  const setLanguage = (lang: TLanguage) => () => {
    localStorage.setItem('language', lang);
    setLang(lang);
  };

  return (
    <div className={styles.languageWrap}>
      <div className={styles.languages}>
        <span
          className={classNames(styles.language, styles.engLanguage, {
            [styles.activeLanguage]: lang === 'en',
          })}
          onClick={setLanguage('en')}
        >
          En
        </span>
        <span className={styles.divider} />
        <span
          className={classNames(styles.language, styles.rusLanguage, {
            [styles.activeLanguage]: lang === 'ru',
          })}
          onClick={setLanguage('ru')}
        >
          Ru
        </span>
      </div>
    </div>
  );
};
